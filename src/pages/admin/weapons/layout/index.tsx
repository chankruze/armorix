import { Outlet } from "react-router";
import {
  HeaderContext,
  HeaderContextProps,
} from "../../../../contexts/header-context";
import Header from "./header";
import { useState } from "react";

export default function Layout() {
  const [headerProps, setHeaderPropsState] = useState<
    Omit<HeaderContextProps, "setHeaderProps">
  >({
    title: "",
    showBack: false,
    showSave: false,
    showNew: false,
    onSave: undefined,
    onNew: undefined,
  });

  const setHeaderProps = (
    props: Partial<Omit<HeaderContextProps, "setHeaderProps">>,
  ) => {
    setHeaderPropsState((prev) => ({
      ...prev,
      ...props,
    }));
  };

  return (
    <HeaderContext.Provider value={{ ...headerProps, setHeaderProps }}>
      <Header {...headerProps} />
      <div className="overflow-hidden overflow-y-auto">
        <Outlet />
      </div>
    </HeaderContext.Provider>
  );
}
