use once_cell::sync::OnceCell;
use rusqlite::Connection;
use std::sync::Mutex;

static SQLITE_CONN: OnceCell<Mutex<Connection>> = OnceCell::new();

pub fn get_sqlite_conn() -> &'static Mutex<Connection> {
  SQLITE_CONN.get_or_init(|| {
    let conn = Connection::open("weapons.db").unwrap();
    conn
      .execute(
        "CREATE TABLE IF NOT EXISTS weapons (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                weapon_type TEXT NOT NULL,
                serial_number TEXT NOT NULL,
                description TEXT
            )",
        [],
      )
      .unwrap();
    Mutex::new(conn)
  })
}
