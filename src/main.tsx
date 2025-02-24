import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </HeroUIProvider>
  </StrictMode>
);
