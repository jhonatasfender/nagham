import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import "./index.css";
import App from "./App.jsx";
import { SelectedNoteProvider } from "./context/SelectedNoteContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SelectedNoteProvider>
          <App />
        </SelectedNoteProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
