pub mod config;

use tauri::Emitter;

use crate::config::AppConfig;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .setup(|app| {
      let app_handle = app.handle();
      let config = AppConfig::load();

      // If no mode set, prompt user via frontend
      if config.db_mode.is_none() {
        app_handle.emit("prompt_db_mode", ()).unwrap();
      }

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![set_db_mode, get_db_mode,])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn set_db_mode(mode: String) {
  let mut config = AppConfig::load();
  config.db_mode = Some(mode);
  config.save();
}

#[tauri::command]
fn get_db_mode() -> Option<String> {
  let config = AppConfig::load();
  config.db_mode
}
