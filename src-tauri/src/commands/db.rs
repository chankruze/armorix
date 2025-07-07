use futures::TryStreamExt;
use mongodb::{bson::Document, options::FindOptions, Client};
use tauri::State;

#[tauri::command]
pub async fn db_find(
  client: State<'_, Client>,
  collection: String,
  filter: Document,
) -> Result<Vec<Document>, String> {
  let db = client.default_database().ok_or("Default database not set")?;
  let target_collection = db.collection::<Document>(&collection);

  let mut cursor = target_collection
    .find(filter, FindOptions::default())
    .await
    .map_err(|e| format!("Find error: {e}"))?;

  let mut results = Vec::new();
  while let Some(result) = cursor.try_next().await.map_err(|e| format!("Cursor error: {e}"))? {
    results.push(result);
  }

  Ok(results)
}
