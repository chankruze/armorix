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

export async function updateWeapon(id: string, updateData: Partial<Omit<Weapon, "_id">>): Promise<number> {
  const collection = "weapons";

  const update = {
    $set: updateData,
  };

  const modifiedCount = await invoke<number>("db_update_one", {
    collection,
    filter: { _id: { $oid: id } },
    update,
  });

  return modifiedCount;
}

export async function deleteWeapon(id: string): Promise<number> {
  const collection = "weapons";

  const deletedCount = await invoke<number>("db_delete_one", {
    collection,
    filter: { _id: { $oid: id } },
  });

  return deletedCount;
}
