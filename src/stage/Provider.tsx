import React, { useMemo, ReactNode, useEffect } from "react";
import { AppProvider, useApp } from "@pixi/react";

interface ProviderProps {
  children: ReactNode;
}

const SlotAppProvider: React.FC<ProviderProps> = ({ children }) => {
  const app = useMemo(() => {
    const application = useApp();

    return application;
  }, []);

  useEffect(() => {
    return () => {
      app.destroy(true, { children: true });
    };
  }, [app]);

  return <AppProvider value={app}>{children}</AppProvider>;
};

export default SlotAppProvider;
