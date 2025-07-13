pub mod db;
pub mod weapons;

pub use db::{db_delete_one, db_find, db_find_one, db_insert_one, db_update_one};
pub use weapons::{generate_random_weapons, get_weapon_qr, save_weapon_qr};
