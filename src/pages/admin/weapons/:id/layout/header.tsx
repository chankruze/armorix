import { useNavigate } from "react-router";
import routes from "@/routes";
import { ChevronLeft, Edit, MoreHorizontal, QrCode, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Weapon } from "@/types/weapon";

interface HeaderProps {
  weapon?: Weapon;
}

const Header = ({ weapon }: HeaderProps) => {
  const navigate = useNavigate();

  if (!weapon) return null;

  return (
    <header className="grid grid-cols-2 items-center border-b border-stone-800 py-4 px-6">
      <div className="flex items-center gap-2">
        <Button
          onClick={() =>
            navigate(routes.admin.weapons.index, { replace: true })
          }
        >
          <ChevronLeft />
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="truncate">{weapon.name}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{weapon.name}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
        <Button>
          <Edit />
        </Button>
        <Button>
          <QrCode />
        </Button>
      </div>
    </header>
  );
};

export default Header;
