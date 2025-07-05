use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Weapon {
  pub id: String,
  pub name: String,
  pub serial: String,
  pub caliber: Option<String>,
  pub owner: Option<String>,
  pub description: Option<String>,
}
