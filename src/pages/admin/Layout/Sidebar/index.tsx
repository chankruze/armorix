import routes from "@/routes";
import { Guitar, Settings } from "lucide-react";
import Container from "./container";
import Section from "./section";

const Sidebar = () => (
  <Container title="Armorix">
    <Section
      icon={Guitar}
      title="Weapons"
      to={routes.admin.weapons.index}
      links={[
        {
          label: "All",
          to: routes.admin.weapons.index,
          count: Math.ceil(Math.random() * (10 - 1) + 1),
        },
        {
          label: "Published",
          to: routes.admin.weaponsWithStatus("published"),
          count: Math.ceil(Math.random() * (10 - 1) + 1),
        },
        {
          label: "Draft",
          to: routes.admin.weaponsWithStatus("draft"),
          count: Math.ceil(Math.random() * (10 - 1) + 1),
        },
      ]}
    />
    <Section icon={Settings} title="Settings" to="/admin/settings" />
  </Container>
);

export default Sidebar;
