import { useNavigate, useOutletContext } from "react-router";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Weapon } from "@/types/weapon";
import weaponDetailsBg from "@/assets/weapon-details-bg.jpg";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { QRDialog } from "@/components/qr-dialog";
import { deleteWeapon } from "@/services/weapon-service";
import routes from "@/routes";

interface ContextType {
  weapon: Weapon;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  openQrCodeDialog: boolean;
  setOpenQrCodeDialog: (open: boolean) => void;
}

export default function WeaponDetails() {
  const {
    weapon,
    openDeleteDialog,
    setOpenDeleteDialog,
    openQrCodeDialog,
    setOpenQrCodeDialog,
  } = useOutletContext<ContextType>();

  const navigate = useNavigate();

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
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-green-500">
                {weapon.name}
              </h2>
              <p className="text-stone-400">{weapon.type}</p>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-800/60 text-green-200 border-green-600 px-3 py-1 hover:bg-green-700/70 transition-colors duration-200"
            >
              {weapon.serial}
            </Badge>
          </div>
          {weapon.qualities && weapon.qualities.length > 0 ? (
            <div className="sm:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                {weapon.qualities.map((quality) => (
                  <Badge
                    variant="secondary"
                    className="bg-green-800/60 text-green-200 border-green-600 px-3 py-1 hover:bg-green-700/70 transition-colors duration-200"
                  >
                    {quality}
                  </Badge>
                ))}
              </div>
              <p className="text-stone-300">{weapon.description}</p>
            </div>
          ) : null}
        </div>
        {weapon.stats ? (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(weapon.stats).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col items-center justify-center border border-slate-800 bg-slate-900/30 p-3 text-center transition-all duration-200"
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
        ) : null}
        {weapon.attachments && weapon.attachments.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-lg font-bold uppercase tracking-wider text-green-500 py-1 border-b border-green-700">
              Attachments
            </h4>
            <div className="flex flex-wrap gap-2">
              {weapon.attachments.map((attachment) => (
                <Badge
                  key={attachment}
                  className="bg-green-800/60 text-green-200 border-green-600 px-3 py-1 hover:bg-green-700/70 transition-colors duration-200"
                >
                  {attachment}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={`Delete ${weapon.name}?`}
        description="Are you sure you want to delete this weapon? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          console.log("Weapon deleted!");
          setOpenDeleteDialog(false);
        }}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title={`Delete ${weapon.name}?`}
        description="Are you sure you want to delete this weapon? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          deleteWeapon(weapon._id.$oid).then(() => {
            setOpenDeleteDialog(false);
            navigate(routes.admin.weapons.index);
          });
        }}
      />
      <QRDialog
        open={openQrCodeDialog}
        onOpenChange={setOpenQrCodeDialog}
        serial={weapon.serial}
      />
    </div>
  );
}
