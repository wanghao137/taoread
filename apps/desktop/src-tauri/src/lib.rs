use tauri::{WebviewUrl, WebviewWindowBuilder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let url: tauri::Url = if cfg!(debug_assertions) {
                "http://localhost:5173/".parse().expect("dev url")
            } else {
                "https://read.taostudioai.com/".parse().expect("prod url")
            };
            WebviewWindowBuilder::new(app, "main", WebviewUrl::External(url))
                .title("桃阅读")
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("taoread desktop 启动失败");
}
