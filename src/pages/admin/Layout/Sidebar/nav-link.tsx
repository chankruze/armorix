import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { Link } from "react-router";
import React from "react";

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ElementType;
  isActive: boolean;
  isSidebarOpen: boolean;
  count?: number;
  className?: string;
  activeClassName?: string;
  target?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  label,
  icon: Icon,
  isActive,
  isSidebarOpen,
  count,
  className = "",
  activeClassName = "bg-stone-800 text-white",
  target = "",
}) => (
  <Link
    target={target}
    to={to}
    className={clsx(
      "flex items-center gap-2 py-2 px-3 text-sm transition-colors",
      {
        "justify-center": !isSidebarOpen,
        "justify-between": isSidebarOpen,
      },
      isActive && activeClassName,
      className,
    )}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon className="size-5" />}
      {isSidebarOpen && <span>{label}</span>}
    </div>
    {isSidebarOpen && count !== undefined && <Badge>{count}</Badge>}
  </Link>
);

export default NavLink;
