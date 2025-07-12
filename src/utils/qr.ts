import { invoke } from "@tauri-apps/api/core";

const createQr = async (serial: string) => await invoke<string>("get_weapon_qr", { serial });
const saveQr = async (serial: string) =>  await invoke<string>("save_weapon_qr", { serial });

export {createQr, saveQr};
