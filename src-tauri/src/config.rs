use dirs_next::config_dir;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AppConfig {
  pub db_mode: Option<String>,
}

impl AppConfig {
  pub fn load() -> Self {
    let path = Self::config_file_path();
    if path.exists() {
      let content = fs::read_to_string(&path).unwrap();
      toml::from_str(&content).unwrap()
    } else {
      Self { db_mode: None }
    }
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
}
