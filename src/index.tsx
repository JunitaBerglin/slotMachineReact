import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { AppProvider, useApp } from "@pixi/react";
import App from "./components/App";

export const AppContainer: React.FC = () => {
  const app = useApp();

  React.useEffect(() => {
    return () => {
      app.destroy(true, { children: true });
    };
  }, [app]);

  return (
    <AppProvider value={app}>
      <App />
    </AppProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<AppContainer />);
