use mongodb::{options::ClientOptions, Client};
use once_cell::sync::OnceCell;

static MONGO_CLIENT: OnceCell<Client> = OnceCell::new();

pub async fn get_mongo_client() -> &'static Client {
  MONGO_CLIENT.get_or_init(|| {
    let uri = "YOUR_MONGODB_ATLAS_URI_HERE";
    let options = futures::executor::block_on(ClientOptions::parse(uri)).unwrap();
    Client::with_options(options).unwrap()
  })
}
