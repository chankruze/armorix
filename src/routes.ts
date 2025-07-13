type ExtractRouteParams<T extends string> =
  T extends `${string}:${string}/${infer Rest}`
    ? [string, ...ExtractRouteParams<`/${Rest}`>]
    : T extends `${string}:${string}`
      ? [string]
      : [];

const defineRoute = <T extends string>(template: T) => {
  type Params = ExtractRouteParams<T>;

  return {
    template,
    path: (...args: Params) => {
      const keys = template.match(/:[^/]+/g) || [];
      if (keys.length !== args.length) {
        throw new Error(
          `Expected ${keys.length} argument(s) for route "${template}", but got ${args.length}`
        );
      }
      return keys.reduce((acc, key, i) => acc.replace(key, args[i]), template);
    },
  };
};

const routes = {
  root: "/",
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
  },
  admin: {
    index: "/admin",
    dashboard: "/admin/dashboard",
    weapons: {
      index: "/admin/weapons",
      new: "/admin/weapons/new",
      weapon: {
        index: defineRoute("/admin/weapons/:id"),
        edit: defineRoute("/admin/weapons/:id/edit"),
      }
    },
    weaponsWithStatus: (status: string) => `/admin/weapons?status=${status}`,
    settings: "/admin/settings",
  },
  public: {
    weapons: "/weapons",
    weapon: defineRoute("/weapons/:slug"),
  },
};

export default routes;
