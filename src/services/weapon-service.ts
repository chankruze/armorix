import { invoke } from "@tauri-apps/api/core";
import type { Weapon } from "@/types/weapon";

export async function loadWeapons(): Promise<Weapon[]> {
  const args = {
    collection: "weapons",
    filter: {},
  };

  const weapons = await invoke<Weapon[]>("db_find", args);
  return weapons;
}

export async function loadWeapon(id: string): Promise<Weapon> {
  const args = {
    collection: "weapons",
    filter: { _id: { $oid: id, } },
  };

  return await invoke<Weapon>("db_find_one", args);
}

export async function insertWeapon(weapon: Omit<Weapon, "_id">): Promise<string> {
  const collection = "weapons";

  const insertedId = await invoke<string>("db_insert_one", {
    collection,
    data: weapon,
  });

  return insertedId;
}
