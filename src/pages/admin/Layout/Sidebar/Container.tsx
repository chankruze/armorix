import React, { useState, ReactNode, ReactElement } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import camouflage from "@/assets/camouflage.webp";

interface ContainerProps {
  children: ReactNode;
  title: string;
  logo?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, title, logo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      className={clsx("relative transition-all", {
        "w-64": isSidebarOpen,
        "w-16": !isSidebarOpen,
      })}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${camouflage})`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col space-y-2">
        <div
          className={clsx("flex items-center p-4", {
            "justify-between": isSidebarOpen,
            "justify-center": !isSidebarOpen,
          })}
        >
          <div className="flex items-center gap-2">
            {logo && <Button onClick={openSidebar}>{logo}</Button>}
            {isSidebarOpen && <p className="text-lg font-bold">{title}</p>}
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as ReactElement<any>, {
                  isSidebarOpen,
                })
              : child,
          )}
        </nav>
        <div
          className={clsx("flex items-center p-4", {
            "justify-end": isSidebarOpen,
            "justify-center": !isSidebarOpen,
          })}
        >
          {/* <UserProfile /> */}
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            className="flex items-center justify-center"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Container;
