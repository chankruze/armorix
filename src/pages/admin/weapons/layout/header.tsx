import { Button } from "@/components/ui/button";
import routes from "@/routes";
import { ChevronLeft, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function Header({
  title,
  showBack,
  showSave,
  showNew,
  onSave,
  onNew,
}: any) {
  const navigate = useNavigate();

  return (
    <header className="grid grid-cols-3 items-center justify-center border-b border-stone-800 py-4 px-6">
      <div className="flex items-center gap-2">
        {showBack && (
          <Button
            onClick={() =>
              navigate(routes.admin.weapons.index, { replace: true })
            }
          >
            <ChevronLeft />
          </Button>
        )}
        <h1 className="text-3xl font-bold">{title || "Weapons"}</h1>
      </div>
      <div></div>
      <div className="flex items-center justify-end gap-2">
        {showSave && onSave && (
          <Button onClick={onSave} variant="secondary">
            <Save />
            <span>Save</span>
          </Button>
        )}
        {showNew && onNew && (
          <Button onClick={onNew} variant="secondary">
            <Plus />
            <span>Add weapon</span>
          </Button>
        )}
      </div>
    </header>
  );
}
