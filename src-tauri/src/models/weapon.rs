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
  pub quality: String,
  pub description: Option<String>,
}
