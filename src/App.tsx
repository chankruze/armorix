import { BrowserRouter, Routes, Route } from "react-router";
import SplashScreen from "./pages/splash";
import routes from "./routes";
import {
  AdminDashboard,
  AdminLayout,
  AdminWeaponsIndex,
  RequireAuth,
} from "./pages/admin";
import ErrorPage from "./pages/error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.root} element={<SplashScreen />} />
        {/* Admin routes */}
        <Route path={routes.admin.index} element={<AdminLayout />}>
          <Route element={<RequireAuth redirectTo={routes.auth.login} />}>
            <Route path={routes.admin.dashboard} element={<AdminDashboard />} />
            <Route
              path={routes.admin.weapons.index}
              element={<AdminWeaponsIndex />}
            />
          </Route>
        </Route>
        {/* <Route
          path={routes.admin.weapons.weapon.index.template}
          element={<Weapon />}
        /> */}
        <Route path="*" element={<ErrorPage homeUrl={routes.root} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
