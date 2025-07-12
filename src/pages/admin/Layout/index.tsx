import React from "react";
import clsx from "clsx";
import Sidebar from "./sidebar";
import { Outlet } from "react-router";

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  className = "",
}) => (
  <div className="flex h-screen overflow-hidden bg-neutral-950 text-white">
    <Sidebar />
    <div className={clsx("flex flex-1 flex-col overflow-y-auto", className)}>
      <Outlet />
    </div>
  </div>
);

export default Layout;
