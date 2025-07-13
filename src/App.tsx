import { BrowserRouter, Routes, Route } from "react-router";
import SplashScreen from "./pages/splash";
import routes from "./routes";
import {
  Dashboard,
  Layout,
  WeaponLayout,
  WeaponsIndex,
  RequireAuth,
  WeaponDetails,
  WeaponsLayout,
  NewWeapon,
  EditWeaponDetails,
} from "./pages/admin";
import ErrorPage from "./pages/error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.root} element={<SplashScreen />} />
        {/* Admin routes */}
        <Route path={routes.admin.index} element={<Layout />}>
          <Route element={<RequireAuth redirectTo={routes.auth.login} />}>
            <Route path={routes.admin.dashboard} element={<Dashboard />} />
            <Route
              path={routes.admin.weapons.index}
              element={<WeaponsLayout />}
            >
              <Route
                path={routes.admin.weapons.index}
                element={<WeaponsIndex />}
              />
              <Route path={routes.admin.weapons.new} element={<NewWeapon />} />
            </Route>
            <Route
              path={routes.admin.weapons.weapon.index.template}
              element={<WeaponLayout />}
            >
              <Route
                path={routes.admin.weapons.weapon.index.template}
                element={<WeaponDetails />}
              />
              <Route
                path={routes.admin.weapons.weapon.edit.template}
                element={<EditWeaponDetails />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage homeUrl={routes.root} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
