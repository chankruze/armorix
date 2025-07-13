import { useNavigate, useLocation } from "react-router";
import routes from "@/routes";
import { ChevronLeft, Edit, QrCode, Trash, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Weapon } from "@/types/weapon";

interface HeaderProps {
  weapon: Weapon;
  setOpenDeleteDialog: (open: boolean) => void;
  setOpenQrCodeDialog: (open: boolean) => void;
}

const Header = ({
  weapon,
  setOpenDeleteDialog,
  setOpenQrCodeDialog,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!weapon) return null;

  const isIndexpage = location.pathname.endsWith(weapon._id.$oid);
  const isEditPage = location.pathname.endsWith("/edit");
  const back = isIndexpage
    ? routes.admin.weapons.index
    : routes.admin.weapons.weapon.index.path(weapon._id.$oid);

  return (
    <header className="grid grid-cols-2 items-center border-b border-stone-800 py-4 px-6">
      <div className="flex items-center gap-2">
        <Button onClick={() => navigate(back, { replace: true })}>
          <ChevronLeft />
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <h1 className="text-3xl font-bold truncate">{weapon.name}</h1>
          </TooltipTrigger>
          <TooltipContent>
            <p>{weapon.name}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center justify-end gap-2">
        {!isEditPage ? (
          <>
            <Button
              variant="destructive"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <Trash />
              <p className="hidden md:block">Delete</p>
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                navigate(
                  routes.admin.weapons.weapon.edit.path(weapon._id.$oid),
                  {
                    replace: true,
                  },
                )
              }
            >
              <Edit />
              <p className="hidden md:block">Edit details</p>
            </Button>
          </>
        ) : (
          <Button variant="secondary" type="submit" form="weapon-edit-form">
            <Save />
            <p className="hidden md:block">Save</p>
          </Button>
        )}
        <Button variant="secondary" onClick={() => setOpenQrCodeDialog(true)}>
          <QrCode />
          <p className="hidden md:block">Show QR</p>
        </Button>
      </div>
    </header>
  );
};

export default Header;
