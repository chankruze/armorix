mod app_state;
mod commands;
pub mod config;
pub mod models;
pub mod utils;

use crate::app_state::AppState;
use crate::config::AppConfig;
use commands::*;
use mongodb::{bson::doc, Client};

use tauri::Emitter;

// pub fn init_mongodb_client() -> mongodb::error::Result<Client> {
//   let config = AppConfig::load();
//   let uri = config.mongodb_uri.unwrap_or_else(|| "mongodb://localhost:27017/armorixdb".into());
//   let client = Client::with_uri_str(uri)?;
//   Ok(client)
// }

pub async fn init_mongodb_client() -> mongodb::error::Result<Client> {
  let config = AppConfig::load();
  let uri = config.mongodb_uri.unwrap_or_else(|| "mongodb://localhost:27017/armorixdb".into());
  let client = Client::with_uri_str(uri).await?;
  Ok(client)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
  let state = init_state();
  let client = init_mongodb_client().await.expect("Failed to init Mongo client");

  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .manage(client)
    .manage(std::sync::Mutex::new(state))
    .invoke_handler(tauri::generate_handler![
      db_find,
      db_find_one,
      db_insert_one,
      db_update_one,
      db_delete_one,
      set_db_mode,
      get_db_mode,
      generate_random_weapons,
      get_weapon_qr,
      save_weapon_qr,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn init_state() -> AppState {
  let config = AppConfig::load();
  let mode = config.db_mode.clone().unwrap_or_else(|| "offline".to_string());

  // let mut mongo_client = None;

  // connection mode
  if mode == "online" {
    // let uri = config.mongodb_uri.unwrap_or_else(|| "mongodb://localhost:27017/armorixdb".into());
    // let options = ClientOptions::parse(uri).expect("invalid database url");
    // let client = Client::with_options(options).unwrap();
    // mongo_client = Some(client);
  }

  AppState { db_mode: mode }
}

#[tauri::command]
fn set_db_mode(
  app_handle: tauri::AppHandle,
  state: tauri::State<std::sync::Mutex<AppState>>,
  mode: String,
) {
  {
    let mut config = AppConfig::load();
    config.db_mode = Some(mode.clone());
    config.save();
  }

  {
    let mut state = state.lock().unwrap();

    // Disconnect previous connections if needed (optional cleanup)

    state.db_mode = mode.clone();

    if mode == "online" {
      // let uri = AppConfig::load()
      //   .mongodb_uri
      //   .unwrap_or_else(|| "mongodb://localhost:27017/armorixdb".into());
      // let options = ClientOptions::parse(uri).expect("invalid database url");
      // let client = Client::with_options(options).unwrap();
      // state.mongo_client = Some(client);
    } else {
      // state.mongo_client = None;
    }
  }

  app_handle.emit("db_mode_set_success", mode).unwrap();
}

#[tauri::command]
fn get_db_mode(state: tauri::State<std::sync::Mutex<AppState>>) -> String {
  let state = state.lock().unwrap();
  state.db_mode.clone()
}
