import { createContext, useContext } from "react";

export interface HeaderContextProps {
  title?: string;
  showBack?: boolean;
  showSave?: boolean;
  showNew?: boolean;
  onSave?: () => void;
  onNew?: () => void;
  setHeaderProps: (
    props: Partial<Omit<HeaderContextProps, "setHeaderProps">>,
  ) => void;
}

export const HeaderContext = createContext<HeaderContextProps>({});

export const useHeader = () => useContext(HeaderContext);
