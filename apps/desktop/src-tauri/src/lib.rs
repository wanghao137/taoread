use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;
use tauri_plugin_updater::UpdaterExt;

/// 站内域前缀：导航放行；其余一律转系统浏览器（docs/67 §3.2-2，Rust 侧拦截防绕过）
const ALLOWED_PREFIXES: [&str; 4] = [
    "https://read.taostudioai.com",
    "https://media.taostudioai.com",
    "https://audio.taostudioai.com",
    "http://localhost:5173",
];

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
        let Ok(updater) = app.updater() else { return };
        let Ok(Some(update)) = updater.check().await else { return };
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
            let _ = app
                .dialog()
                .message(format!("更新失败，请稍后到下载页重试：{err}"))
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
                    let s = target.as_str();
                    if ALLOWED_PREFIXES.iter().any(|p| s.starts_with(p)) {
                        return true;
                    }
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
