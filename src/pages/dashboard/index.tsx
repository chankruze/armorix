import { useEffect, useState } from "react";
import WeaponCard from "./weapon-card";
import { invoke } from "@tauri-apps/api/core";

type Weapon = {
  id: string;
  name: string;
  type: string;
  image: string;
  price: string;
  quality: string;
  description: string;
};

export default function Dashboard() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    invoke<Weapon[]>("generate_random_weapons").then((_weapons) => {
      setWeapons(_weapons);
      console.log(_weapons);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r bg-neutral-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Weapon Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {weapons.map((weapon) => (
          <WeaponCard
            key={weapon.id}
            id={weapon.id}
            name={weapon.name}
            type={weapon.type}
            quality={weapon.quality}
            price={weapon.price}
            image={
              weapon.image ||
              "https://fnamerica.com/wp-content/uploads/2016/11/FN_M4A1_Rotators_1-1200x500.png"
            }
            onViewDetails={(id) => console.log("View details of", id)}
          />
        ))}
      </div>
    </div>
  );
}
