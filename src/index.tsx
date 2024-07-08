import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";
import SlotAppProvider from "./stage/Provider";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <SlotAppProvider>
    <App />
  </SlotAppProvider>
);
