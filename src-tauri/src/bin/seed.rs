// use armorix_lib::config::AppConfig;
// use armorix_lib::models::weapon::Weapon;
// use armorix_lib::utils::weapon::random_weapon;
// use mongodb::sync::Client;

// pub fn init_mongodb_client() -> mongodb::error::Result<Client> {
//   let config = AppConfig::load();
//   let uri = config.mongodb_uri.unwrap_or_else(|| "mongodb://localhost:27017/armorixdb".into());
//   let client = Client::with_uri_str(uri)?;
//   Ok(client)
// }

// fn main() -> Result<(), Box<dyn std::error::Error>> {
//   let client = init_mongodb_client()?;
//   let db = client.database("armorixdb");
//   let collection = db.collection::<Weapon>("weapons");
//   let weapons: Vec<Weapon> = (0..10).map(|_| random_weapon()).collect();
//   let _resp = collection.insert_many(weapons);
//   println!("✅ Seeded 10 weapons!");
//   Ok(())
// }

use armorix_lib::config::AppConfig;
use armorix_lib::models::weapon::Weapon;
use armorix_lib::utils::weapon::random_weapon;
use mongodb::{options::ClientOptions, Client};

pub async fn init_mongodb_client() -> mongodb::error::Result<Client> {
  let config = AppConfig::load();
  let uri = config.mongodb_uri.unwrap_or_else(|| "mongodb://localhost:27017/armorixdb".into());
  let options = ClientOptions::parse(&uri).await?;
  let client = Client::with_options(options)?;
  Ok(client)
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  let client = init_mongodb_client().await?;
  let db = client.database("armorixdb");
  let collection = db.collection::<Weapon>("weapons");

  let weapons: Vec<Weapon> = (0..10).map(|_| random_weapon()).collect();

  let resp = collection.insert_many(weapons).await?;

  println!("✅ Seeded 10 weapons!");
  println!("Inserted IDs: {:?}", resp.inserted_ids);

  Ok(())
}
