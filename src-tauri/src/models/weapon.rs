use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Weapon {
  pub id: String,
  pub name: String,
  #[serde(rename = "type")]
  pub weapon_type: String,
  pub image: String,
  pub price: String,
  pub quality: String,
  pub description: String,
}
