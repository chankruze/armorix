import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import Header from "./header";
import { loadWeapon } from "@/services/weapon-service";
import type { Weapon } from "@/types/weapon";

const Layout = () => {
  const [weapon, setWeapon] = useState<Weapon>();
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function fetchWeapon() {
      try {
        const _weapon = await loadWeapon(id as string);
        setWeapon(_weapon);
      } catch (err) {
        console.error("Failed to load weapons", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeapon();
  }, [id]);

  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading layout...
      </div>
    );

  if (!weapon) return null;

  return (
    <>
      <Header
        weapon={weapon}
        setOpenDeleteDialog={setOpenDeleteDialog}
        setOpenQrCodeDialog={setOpenQrCodeDialog}
      />
      <div className="flex-1 overflow-hidden overflow-y-auto">
        <Outlet
          context={{
            weapon,
            openDeleteDialog,
            setOpenDeleteDialog,
            openQrCodeDialog,
            setOpenQrCodeDialog,
          }}
        />
      </div>
    </>
  );
};

export default Layout;
