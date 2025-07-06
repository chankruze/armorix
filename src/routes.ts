import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "./pages/splash/index.tsx"),
  route("/dashboard", "./pages/dashboard/index.tsx"),
  // * matches all URLs, the ? makes it optional so it will match / as well
  // route("*?", "catchall.tsx"),
] satisfies RouteConfig;
