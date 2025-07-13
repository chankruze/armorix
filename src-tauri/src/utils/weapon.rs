use crate::models::weapon::{Stats, Weapon};
use rand::prelude::IndexedRandom;
use rand::{distr::Alphanumeric, rng, Rng};

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

/// Get random qualities
fn random_qualities() -> Vec<String> {
  let qualities_pool = ["Lightweight", "Durable", "High Precision", "Low Recoil"];
  qualities_pool.choose_multiple(&mut rng(), 2).map(|s| s.to_string()).collect()
}

/// Get random attachments
fn random_attachments() -> Vec<String> {
  let attachments_pool = ["Scope", "Extended Mag", "Laser Sight", "Suppressor"];
  attachments_pool.choose_multiple(&mut rng(), 3).map(|s| s.to_string()).collect()
}

/// Generate a single random Weapon
pub fn random_weapon() -> Weapon {
  let codes = ["M4A1", "AK47", "FAMAS", "AUG", "SCAR", "MP5", "GLOCK"];
  let code = codes.choose(&mut rng()).unwrap();

  Weapon {
    id: None,
    serial: generate_weapon_id(code),
    name: format!("{} {}", code, "Rifle"),
    weapon_type: random_weapon_type(code),
    image: random_weapon_image(code),
    price: random_price(),
    description: "Random generated weapon".to_string(),
    qualities: Some(random_qualities()),
    attachments: Some(random_attachments()),
    stats: Stats {
      damage: rng().random_range(10..100),
      accuracy: rng().random_range(10..100),
      fire_rate: rng().random_range(10..100),
      mobility: rng().random_range(10..100),
      range: rng().random_range(10..100),
    },
  }
}

/// Generate a list of 10 random weapons
pub fn random_weapons_list() -> Vec<Weapon> {
  (0..20).map(|_| random_weapon()).collect()
}
