import { useOutletContext } from "react-router";

import clsx from "clsx";

import { Badge } from "@/components/ui/badge";
import { Weapon } from "@/types/weapon";
import weaponDetailsBg from "@/assets/weapon-details-bg.jpg";

interface ContextType {
  weapon: Weapon;
}

export default function WeaponDetails() {
  const { weapon } = useOutletContext<ContextType>();

  return (
    <div className="relative p-6 h-full">
      {/* background image layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${weaponDetailsBg})`,
        }}
      />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-72 overflow-hidden border border-slate-800 bg-slate-900/40">
          <img
            src={weapon.image}
            alt={weapon.name}
            className="h-72 w-full object-contain md:h-80"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">
                {weapon.name}
              </h2>
              <p className="text-stone-400">{weapon.type}</p>
            </div>
            <Badge variant="secondary">{weapon.serial}</Badge>
          </div>
          {weapon.qualities && weapon.qualities.length > 0 ? (
            <div className="sm:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {weapon.qualities.map((quality) => (
                  <Badge variant="secondary">{quality}</Badge>
                ))}
              </div>
              <p className="text-stone-300">{weapon.description}</p>
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(weapon.stats).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center border border-slate-800 bg-slate-900/30 p-3 text-center shadow-sm hover:shadow-yellow-500/10 transition-all duration-200"
            >
              <span className="text-xs uppercase text-neutral-500 tracking-wide">
                {key}
              </span>
              <span
                className={clsx("text-2xl font-bold", {
                  "text-green-400": value > 50,
                  "text-red-400": value < 30,
                })}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-yellow-400 py-1 border-b border-neutral-800">
            Attachments
          </h4>
          <div className="flex flex-wrap gap-2">
            {weapon.attachments.map((attachment) => (
              <Badge
                key={attachment}
                className="bg-stone-800 text-stone-300 border-stone-600"
              >
                {attachment}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
