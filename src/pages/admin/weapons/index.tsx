import { useEffect, useState } from "react";
import WeaponCard from "./card";
import { Weapon } from "@/types/weapon";
import { loadWeapons } from "@/services/weapon-service";

export default function Weapons() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    loadWeapons().then((_weapons) => setWeapons(_weapons));
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Weapon Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {weapons.map((weapon) => (
          <WeaponCard
            key={weapon._id}
            serial={weapon.serial}
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
