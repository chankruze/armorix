import { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router";

import NavLink from "./nav-link";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface LinkItem {
  to: string;
  label: string;
  icon?: React.ElementType;
  count?: number;
}

export interface SectionProps {
  title: string;
  links?: LinkItem[];
  icon?: React.ElementType;
  isSidebarOpen?: boolean;
  to?: string;
  target?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  links = [],
  icon: Icon,
  isSidebarOpen = false,
  to = "",
  target = "",
}) => {
  const [isNestedLinksOpen, setIsNestedLinksOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const hasLinks = Array.isArray(links) && links.length > 0;

  const isActive = (path: string) =>
    location.pathname + location.search === path;

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsNestedLinksOpen(false);
    }
  }, [isSidebarOpen]);

  if (!hasLinks) {
    return (
      <NavLink
        className="flex w-full items-center px-4 py-3 transition-all hover:bg-stone-800"
        icon={Icon}
        isActive={isActive(to)}
        isSidebarOpen={isSidebarOpen}
        label={title}
        target={target}
        to={to}
      />
    );
  }

  const handleClick = () => {
    if (!isSidebarOpen) {
      navigate(to);
    } else {
      setIsNestedLinksOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex w-full items-center px-4 py-3 transition-all hover:bg-stone-800",
          {
            "justify-center": !isSidebarOpen,
            "justify-between": isSidebarOpen && hasLinks,
          },
        )}
        onClick={handleClick}
      >
        <div
          className={clsx("flex items-center gap-2", {
            "justify-center": !isSidebarOpen,
          })}
        >
          {Icon && <Icon className="h-5 w-5" />}
          {isSidebarOpen && <span className="text-sm">{title}</span>}
        </div>
        {isSidebarOpen &&
          (isNestedLinksOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          ))}
      </div>
      {isNestedLinksOpen && (
        <div className="mx-6 my-1 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              className="rounded-md hover:bg-stone-800"
              count={link.count}
              icon={link.icon}
              isActive={isActive(link.to)}
              isSidebarOpen={isSidebarOpen}
              key={link.to}
              label={link.label}
              to={link.to}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Section;
