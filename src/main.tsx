import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import ToastProviders from "./components/ui/ToastProviders.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <PrimeReactProvider>
          <ToastProviders>
            <App />
          </ToastProviders>
        </PrimeReactProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  </StrictMode>
);
