use futures::TryStreamExt;
use mongodb::{bson::Document, Client};
use tauri::State;

#[tauri::command]
pub async fn db_find(
  client: State<'_, Client>,
  collection: String,
  filter: Document,
) -> Result<Vec<Document>, String> {
  let db = client.default_database().ok_or("Default database not set")?;
  let target_collection = db.collection::<Document>(&collection);

  let mut cursor = target_collection.find(filter).await.map_err(|e| format!("Find error: {e}"))?;

  let mut results = Vec::new();
  while let Some(result) = cursor.try_next().await.map_err(|e| format!("Cursor error: {e}"))? {
    results.push(result);
  }

  Ok(results)
}

#[tauri::command]
pub async fn db_find_one(
  client: State<'_, Client>,
  collection: String,
  filter: Document,
) -> Result<Option<Document>, String> {
  let db = client.default_database().ok_or("Default database not set")?;
  let target_collection = db.collection::<Document>(&collection);

  let result =
    target_collection.find_one(filter).await.map_err(|e| format!("FindOne error: {e}"))?;

  Ok(result)
}

#[tauri::command]
pub async fn db_insert_one(
  client: State<'_, Client>,
  collection: String,
  data: Document,
) -> Result<String, String> {
  let db = client.default_database().ok_or("Default database not set")?;
  let target_collection = db.collection::<Document>(&collection);

  let result =
    target_collection.insert_one(data).await.map_err(|e| format!("Insert error: {e}"))?;

  let inserted_id = result
    .inserted_id
    .as_object_id()
    .map(|oid| oid.to_hex())
    .unwrap_or_else(|| result.inserted_id.to_string());

  Ok(inserted_id)
}

#[tauri::command]
pub async fn db_update_one(
  client: State<'_, Client>,
  collection: String,
  filter: Document,
  update: Document,
) -> Result<u64, String> {
  let db = client.default_database().ok_or("Default database not set")?;
  let target_collection = db.collection::<Document>(&collection);

  let result =
    target_collection.update_one(filter, update).await.map_err(|e| format!("Update error: {e}"))?;

  Ok(result.modified_count)
}

#[tauri::command]
pub async fn db_delete_one(
  client: State<'_, Client>,
  collection: String,
  filter: Document,
) -> Result<u64, String> {
  let db = client.default_database().ok_or("Default database not set")?;
  let target_collection = db.collection::<Document>(&collection);

  let result =
    target_collection.delete_one(filter).await.map_err(|e| format!("Delete error: {e}"))?;

  Ok(result.deleted_count)
}
