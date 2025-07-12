import routes from "@/routes";
import { Navigate } from "react-router";

export default function Dashboard() {
  return <Navigate to={routes.admin.weapons.index} />;
}
