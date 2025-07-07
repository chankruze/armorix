use crate::commands::db_find;
use crate::models::weapon::Weapon;
use crate::utils::qr::{generate_weapon_qr_base64, save_weapon_qr_to_file};
use dirs_next::download_dir;
use mongodb::bson::{self, doc};
use mongodb::Client;
use rand::prelude::IndexedRandom;
use rand::{distr::Alphanumeric, rng, Rng};
use tauri::{command, State};

/// Generate a random serial number (uppercase)
fn random_serial(len: usize) -> String {
  rng().sample_iter(&Alphanumeric).take(len).map(char::from).collect::<String>().to_uppercase()
}

/// Generate a custom weapon ID like DRDO-M4A1-ABC1234
fn generate_weapon_id(weapon_code: &str) -> String {
  let serial = random_serial(7);
  format!("DRDO-{weapon_code}-{serial}")
}

/// Get random weapon type
fn random_weapon_type(code: &str) -> String {
  match code {
    "M4A1" | "AK47" | "FAMAS" | "AUG" | "SCAR" => "Assault Rifle",
    "MP5" => "SMG",
    "GLOCK" => "Handgun",
    _ => "Unknown",
  }
  .to_string()
}

/// Get random weapon image URL
fn random_weapon_image(code: &str) -> String {
  match code {
    "M4A1" => "https://fnamerica.com/wp-content/uploads/2016/11/FN_M4A1_Rotators_1-1200x500.png",
    "AK47" => "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/AK-47.png/500px-AK-47.png",
    "FAMAS" => {
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/FAMAS_Assaultrifle_FRA_noBG.png"
    }
    "AUG" => "https://www.steyr-arms.com/wp-content/uploads/2019/02/AUGA3_DSC0172.png",
    "SCAR" => "https://fnamerica.com/wp-content/uploads/2024/06/SCAR-16s-Desert-Right-1200x850.png",
    "MP5" => "https://www.heckler-koch.com/_assets/thumbnail/1345/product-stage/webp",
    "GLOCK" => {
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Glock_19_Generation_4-removebg.png"
    }
    _ => "https://via.placeholder.com/500",
  }
  .to_string()
}

/// Get random price
fn random_price() -> String {
  let price = rng().random_range(20000..60000);
  format!("₹{price}")
}

/// Get random quality
fn random_quality() -> String {
  let qualities = ["Factory New", "Minimal Wear", "Field-Tested", "Battle-Scarred"];
  qualities.choose(&mut rng()).unwrap().to_string()
}

/// Generate a single random Weapon
fn random_weapon() -> Weapon {
  let codes = ["M4A1", "AK47", "FAMAS", "AUG", "SCAR", "MP5", "GLOCK"];
  let code = codes.choose(&mut rng()).unwrap();

  Weapon {
    id: None,
    serial: generate_weapon_id(code),
    name: format!("{} {}", code, "Rifle"),
    weapon_type: random_weapon_type(code),
    image: random_weapon_image(code),
    price: random_price(),
    quality: random_quality(),
    description: Some("Random generated weapon".to_string()),
  }
}

/// Generate a list of 10 random weapons
fn random_weapons_list() -> Vec<Weapon> {
  (0..20).map(|_| random_weapon()).collect()
}

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
