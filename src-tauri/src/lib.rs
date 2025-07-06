pub mod config;

use tauri::Emitter;

use crate::config::AppConfig;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![set_db_mode, get_db_mode,])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn set_db_mode(app_handle: tauri::AppHandle, mode: String) {
  println!("set_db_mode invoked with value: {mode:?}");

  let mut config = AppConfig::load();
  config.db_mode = Some(mode.clone());
  config.save();

  app_handle.emit("db_mode_set_success", mode).unwrap();
}

#[tauri::command]
fn get_db_mode() -> Option<String> {
  let config = AppConfig::load();
  println!("get_db_mode invoked: {:?}", config.db_mode);
  config.db_mode
}
