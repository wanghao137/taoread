use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;
use tauri_plugin_updater::UpdaterExt;

/// 精确主机匹配（scheme 一并校验）：防止 read.taostudioai.com.evil.com 类前缀绕过
fn is_allowed_target(target: &tauri::Url) -> bool {
    let Some(host) = target.host_str() else { return false };
    match host {
        "read.taostudioai.com" | "media.taostudioai.com" | "audio.taostudioai.com" => target.scheme() == "https",
        "localhost" => target.scheme() == "http" && target.port() == Some(5173),
        _ => false,
    }
}

/// 行为垫片：屏蔽刷新/打印/右键（保留 F12、Ctrl+F、缩放），无 IPC 也生效
const GUARDS_JS: &str = r#"
(function () {
  window.addEventListener('keydown', function (e) {
    if (e.key === 'F5' ||
        (e.ctrlKey && !e.shiftKey && (e.key === 'r' || e.key === 'R')) ||
        (e.ctrlKey && (e.key === 'p' || e.key === 'P'))) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  window.addEventListener('contextmenu', function (e) { e.preventDefault(); }, true);
})();
"#;

fn main_window_config(handle: &tauri::AppHandle) -> tauri::utils::config::WindowConfig {
    let mut config = handle
        .config()
        .app
        .windows
        .iter()
        .find(|w| w.label == "main")
        .cloned()
        .expect("tauri.conf.json 缺少 main 窗口配置");
    config.url = WebviewUrl::External(
        "https://read.taostudioai.com/".parse().expect("prod url"),
    );
    config
}

fn spawn_update_check(app: tauri::AppHandle) {
    tauri::async_runtime::spawn(async move {
        // 避开启动期的网络竞争；失败静默（下一次启动再试）
        tokio::time::sleep(std::time::Duration::from_secs(10)).await;
        // 检查必须带超时：否则首个端点（dl 镜像）网络异常挂起时永远不会回落 GitHub 端点
        let builder = app
            .updater_builder()
            .timeout(std::time::Duration::from_secs(15));
        let Ok(Some(update)) = builder.check().await else { return };
        use tauri_plugin_dialog::{DialogExt, MessageDialogButtons, MessageDialogKind};
        let confirmed = app
            .dialog()
            .message(format!("发现新版本 v{}，现在更新吗？", update.version))
            .title("桃阅读 · 更新")
            .kind(MessageDialogKind::Info)
            .buttons(MessageDialogButtons::OkCancelCustom("更新".into(), "下次再说".into()))
            .blocking_show();
        if !confirmed {
            return;
        }
        // 下载并被动安装（NSIS passive，无需用户点下一步）；成功后重启进入新版
        let mut update = update;
        update.timeout = Some(std::time::Duration::from_secs(600));
        if let Err(err) = update.download_and_install(|_chunk, _total| {}, || {}).await {
            eprintln!("[taoread-desktop] update install failed: {err}");
            let _ = app
                .dialog()
                .message("更新没能完成，稍后会再提醒你；也可以到下载页重新安装最新版")
                .title("桃阅读 · 更新")
                .blocking_show();
            return;
        }
        app.restart();
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(w) = app.get_webview_window("main") {
                let _ = w.unminimize();
                let _ = w.set_focus();
            }
        }))
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        // UpdaterExt::updater() 依赖插件管理的状态；漏注册会在启动 10s 后的更新检查线程 panic
        .plugin(tauri_plugin_updater::Builder::new().build())
        .setup(|app| {
            let handle = app.handle().clone();
            let config = main_window_config(&handle);
            let for_nav = handle.clone();
            // from_config 才会应用 conf 里的尺寸/居中/禁拖放/backgroundThrottling/浏览器参数（D1 审查修正）
            WebviewWindowBuilder::from_config(&handle, &config)
                .expect("main 窗口配置构建失败")
                .title("桃阅读")
                .initialization_script(GUARDS_JS)
                .on_navigation(move |target| {
                    if is_allowed_target(target) {
                        return true;
                    }
                    let s = target.as_str();
                    let _ = for_nav.opener().open_url(s.to_string(), None::<&str>);
                    false
                })
                .build()?;
            spawn_update_check(handle);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("taoread desktop 启动失败");
}
