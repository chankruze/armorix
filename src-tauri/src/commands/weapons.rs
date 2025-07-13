use crate::commands::db_find;
use crate::models::weapon::Weapon;
use crate::utils::qr::{generate_weapon_qr_base64, save_weapon_qr_to_file};
use crate::utils::weapon::random_weapons_list;
use dirs_next::download_dir;
use mongodb::bson::{self, doc};
use mongodb::Client;
use tauri::{command, State};

/// Exposed as Tauri command: Get a list of 10 random weapons
#[command]
pub async fn generate_random_weapons() -> Vec<Weapon> {
  random_weapons_list()
}

/// Helper function to fetch a weapon by ID using `db_find`
async fn get_weapon(serial: String, client: State<'_, Client>) -> Result<Weapon, String> {
  let filter = doc! { "serial": &serial };
  let collection = "weapons".to_string();
  let results = db_find(client, collection, filter).await?;
  if let Some(doc) = results.into_iter().next() {
    let weapon: Weapon = bson::from_document(doc).map_err(|e| e.to_string())?;
    Ok(weapon)
  } else {
    Err("Weapon not found".into())
  }
}

/// Exposed as Tauri command: Get QR code of weapon by id
#[command]
pub async fn get_weapon_qr(serial: String, client: State<'_, Client>) -> Result<String, String> {
  let weapon = get_weapon(serial, client).await?;
  generate_weapon_qr_base64(&weapon)
}

/// Exposed as Tauri command: Save QR code of weapon to Downloads folder
#[command]
pub async fn save_weapon_qr(serial: String, client: State<'_, Client>) -> Result<String, String> {
  let weapon = get_weapon(serial.clone(), client).await?;

  let mut path = download_dir().ok_or("Cannot find download directory")?;
  path.push(format!("weapon_{}_qr.png", weapon.serial));

  save_weapon_qr_to_file(&weapon, &path)?;

  Ok(path.to_string_lossy().to_string())
}
