import routes from "@/routes";

export const routeMeta = {
  [routes.admin.weapons.index]: {
    title: "Weapon Inventory",
    showAdd: true,
    showBack: false,
  },
  [routes.admin.weapons.new]: {
    title: "Add New Weapon",
    showSave: true,
    showBack: true,
  },
  [routes.admin.weapons.weapon.edit.template]: {
    title: "Edit Weapon",
    showSave: true,
    showBack: true,
  },
};
