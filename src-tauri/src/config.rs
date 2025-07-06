use dirs_next::config_dir;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AppConfig {
  pub db_mode: Option<String>,
  pub mongodb_uri: Option<String>,
  pub sqlite_file: Option<String>,
}

impl AppConfig {
  pub fn load() -> Self {
    let path = Self::config_file_path();
    let config = if path.exists() {
      let content = fs::read_to_string(&path).unwrap();
      toml::from_str(&content).unwrap_or_else(|_| AppConfig::default())
    } else {
      AppConfig::default()
    };

    config.save();
    config
  }

  pub fn save(&self) {
    let path = Self::config_file_path();
    let content = toml::to_string(&self).unwrap();
    fs::write(&path, content).unwrap();
  }

  fn config_file_path() -> PathBuf {
    let mut dir = config_dir().unwrap();
    dir.push("armorix");
    fs::create_dir_all(&dir).unwrap();
    dir.push("config.toml");
    dir
  }

  fn default_mongodb_uri() -> String {
    "mongodb+srv://armorixdb_rw:xXHB7NoDzhrgccND@cluster0.cblkv.mongodb.net/armorixdb?retryWrites=true&w=majority"
      .to_string()
  }

  fn default_sqlite_file() -> String {
    "armorix.db".to_string()
  }

  fn default() -> Self {
    AppConfig {
      db_mode: None,
      mongodb_uri: Some(Self::default_mongodb_uri()),
      sqlite_file: Some(Self::default_sqlite_file()),
    }
  }
}
