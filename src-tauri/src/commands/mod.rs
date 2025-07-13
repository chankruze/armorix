pub mod db;
pub mod weapons;

pub use db::{db_find, db_find_one};
pub use weapons::{generate_random_weapons, get_weapon_qr, save_weapon_qr};
