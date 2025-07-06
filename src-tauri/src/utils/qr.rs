use base64::{engine::general_purpose, Engine as _};
use image::codecs::png::PngEncoder;
use image::{ColorType, ImageEncoder};
use image::{ImageBuffer, Luma};
use qrcode::QrCode;
use std::fs::File;
use std::io::Cursor;
use std::path::Path;

use crate::models::weapon::Weapon;

fn render_qr_image(data: &str) -> Result<ImageBuffer<Luma<u8>, Vec<u8>>, String> {
  let code = QrCode::new(data).map_err(|e| e.to_string())?;
  let image = code.render::<Luma<u8>>().build();
  Ok(image)
}

pub fn generate_weapon_qr_base64(weapon: &Weapon) -> Result<String, String> {
  let data = format!(
    "ID: {}\nName: {}\nType: {}\nPrice: {}\nQuality: {}\nDescription: {}",
    weapon.serial,
    weapon.name,
    weapon.weapon_type,
    weapon.price,
    weapon.quality,
    weapon.description.as_deref().unwrap_or("-"),
  );

  let image = render_qr_image(&data)?;

  let mut buffer = Cursor::new(Vec::new());
  let encoder = PngEncoder::new(&mut buffer);
  encoder
    .write_image(&image, image.width(), image.height(), ColorType::L8.into())
    .map_err(|e| e.to_string())?;

  let encoded = general_purpose::STANDARD.encode(buffer.get_ref());
  Ok(format!("data:image/png;base64,{}", encoded))
}

pub fn save_weapon_qr_to_file(weapon: &Weapon, path: &Path) -> Result<(), String> {
  let data = format!(
    "ID: {}\nName: {}\nType: {}\nPrice: {}\nQuality: {}\nDescription: {}",
    weapon.serial,
    weapon.name,
    weapon.weapon_type,
    weapon.price,
    weapon.quality,
    weapon.description.as_deref().unwrap_or("-"),
  );

  let image = render_qr_image(&data)?;

  let file = File::create(path).map_err(|e| e.to_string())?;
  let encoder = PngEncoder::new(file);
  encoder
    .write_image(&image, image.width(), image.height(), ColorType::L8.into())
    .map_err(|e| e.to_string())?;

  Ok(())
}
