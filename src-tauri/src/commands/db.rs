use mongodb::{options::ClientOptions, Client};
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool};

pub async fn connect_mongo(uri: &str) -> Result<Client, String> {
  let options = ClientOptions::parse(uri).await.map_err(|e| e.to_string())?;
  let client = Client::with_options(options).map_err(|e| e.to_string())?;
  Ok(client)
}

pub async fn connect_sqlite(path: &str) -> Result<SqlitePool, String> {
  SqlitePoolOptions::new().max_connections(5).connect(path).await.map_err(|e| e.to_string())
}
