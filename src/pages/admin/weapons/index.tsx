import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import routes from "@/routes";
import { Weapon } from "@/types/weapon";
import { loadWeapons } from "@/services/weapon-service";

import WeaponCard from "./card";
import { useHeader } from "@/contexts/header-context";

export default function Weapons() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const navigate = useNavigate();
  const { setHeaderProps } = useHeader();

  useEffect(() => {
    setHeaderProps({
      title: "Inventory",
      showNew: true,
      showSave: false,
      onNew: () => navigate(routes.admin.weapons.new),
    });

    loadWeapons().then((_weapons) => setWeapons(_weapons));

    return () => {
      setHeaderProps({});
    };
  }, []);

  console.log(weapons);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {weapons.map((weapon) => (
        <WeaponCard
          key={weapon._id.$oid}
          serial={weapon.serial}
          name={weapon.name}
          type={weapon.type}
          qualities={weapon.qualities}
          price={weapon.price}
          image={weapon.image}
          onViewDetails={() =>
            navigate(routes.admin.weapons.weapon.index.path(weapon._id.$oid))
          }
        />
      ))}
    </div>
  );
}
