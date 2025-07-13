use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Weapon {
  #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
  pub id: Option<ObjectId>,
  pub serial: String,
  pub name: String,
  #[serde(rename = "type")]
  pub weapon_type: String,
  pub image: String,
  pub price: String,
  pub qualities: Option<Vec<String>>,
  pub description: String,
  pub stats: Stats,
  pub attachments: Option<Vec<String>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Stats {
  pub damage: i32,
  pub accuracy: i32,
  pub fire_rate: i32,
  pub mobility: i32,
  pub range: i32,
}
