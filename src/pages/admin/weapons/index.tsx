import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import routes from "@/routes";
import { Weapon } from "@/types/weapon";
import { loadWeapons } from "@/services/weapon-service";

import WeaponCard from "./card";

export default function Weapons() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadWeapons().then((_weapons) => setWeapons(_weapons));
  }, []);

  console.log(weapons);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Weapon Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {weapons.map((weapon) => (
          <WeaponCard
            key={weapon._id.$oid}
            serial={weapon.serial}
            name={weapon.name}
            type={weapon.type}
            quality={weapon.quality}
            price={weapon.price}
            image={
              weapon.image ||
              "https://fnamerica.com/wp-content/uploads/2016/11/FN_M4A1_Rotators_1-1200x500.png"
            }
            onViewDetails={() =>
              navigate(routes.admin.weapons.weapon.index.path(weapon._id.$oid))
            }
          />
        ))}
      </div>
    </div>
  );
}
