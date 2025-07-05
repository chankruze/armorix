use crate::commands::{db, lan};
use crate::models::weapon::Weapon;
use mongodb::bson::doc;
use serde::Deserialize;
use tauri::command;

#[derive(Deserialize)]
pub struct WeaponDetails {
  pub name: String,
  pub serial: String,
  pub caliber: Option<String>,
  pub owner: Option<String>,
  pub description: Option<String>,
  pub mode: String,
  pub mongo_uri: Option<String>,
  pub sqlite_path: Option<String>,
  pub lan_host: Option<String>,
  pub lan_port: Option<u16>,
}

#[command]
pub async fn save_weapon(details: WeaponDetails) -> Result<String, String> {
  match details.mode.as_str() {
    "online" => {
      let uri = details.mongo_uri.clone().ok_or("Mongo URI missing")?;
      let client = db::connect_mongo(&uri).await?;
      let db = client.database("weapons_db");
      let collection = db.collection::<Weapon>("weapons");

      let weapon = Weapon {
        id: uuid::Uuid::new_v4().to_string(),
        name: details.name,
        serial: details.serial,
        caliber: details.caliber,
        owner: details.owner,
        description: details.description,
      };

      let doc = mongodb::bson::to_document(&weapon).map_err(|e| e.to_string())?;
      collection.insert_one(doc, None).await.map_err(|e| e.to_string())?;
      Ok(weapon.id)
    }

    "offline" => {
      let path = details.sqlite_path.clone().unwrap_or_else(|| "sqlite.db".to_string());
      let pool = db::connect_sqlite(&path).await?;

      sqlx::query!(
                "CREATE TABLE IF NOT EXISTS weapons (id TEXT PRIMARY KEY, name TEXT, serial TEXT, caliber TEXT, owner TEXT, description TEXT)"
            )
            .execute(&pool)
            .await
            .map_err(|e| e.to_string())?;

      let id = uuid::Uuid::new_v4().to_string();
      sqlx::query!(
                "INSERT INTO weapons (id, name, serial, caliber, owner, description) VALUES (?, ?, ?, ?, ?, ?)",
                id,
                details.name,
                details.serial,
                details.caliber,
                details.owner,
                details.description
            )
            .execute(&pool)
            .await
            .map_err(|e| e.to_string())?;

      Ok(id)
    }

    "lan" => {
      let host = details.lan_host.clone().ok_or("LAN host missing")?;
      let port = details.lan_port.ok_or(0)?;
      lan::send_to_lan(&host, port).await
    }

    _ => Err("Invalid mode".into()),
  }
}

#[command]
pub async fn get_weapon(
  id: String,
  mode: String,
  host: Option<String>,
  state: State<'_, AppState>,
) -> Option<Weapon> {
  match mode.as_str() {
    "online" => {
      if let Some(client) = &state.mongo_client {
        let db = client.database("armorix");
        let coll = db.collection::<Weapon>("weapons");
        let result = coll.find_one(doc! {"id": &id}, None).await.unwrap();
        return result;
      }
    }
    "offline" => {
      if let Some(pool) = &state.sqlite_pool {
        let row = sqlx::query_as!(
          Weapon,
          "SELECT id, name, serial_number, type as r#type, details, mode FROM weapons WHERE id = ?",
          id
        )
        .fetch_optional(pool)
        .await
        .unwrap();
        return row;
      }
    }
    "lan" => {
      if let Some(custom_uri) = host {
        let options = ClientOptions::parse(&custom_uri).await.unwrap();
        let client = Client::with_options(options).unwrap();
        let db = client.database("armorix");
        let coll = db.collection::<Weapon>("weapons");
        let result = coll.find_one(doc! {"id": &id}, None).await.unwrap();
        return result;
      }
    }
    _ => {
      let store = state.memory_store.lock().unwrap();
      return store.get(&id).cloned();
    }
  }

  None
}
