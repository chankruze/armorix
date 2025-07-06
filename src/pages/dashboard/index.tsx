import WeaponCard from "./weapon-card";
import { weapons } from "./weapons";

export default function Dashboard() {
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
            image={weapon.image}
            onViewDetails={(id) => console.log("View details of", id)}
          />
        ))}
      </div>
    </div>
  );
}
