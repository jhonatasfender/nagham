import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "./locales/pt-BR.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

const STORAGE_KEY = "i18nextLng";

i18n.use(initReactI18next).init({
  lng:
    typeof localStorage !== "undefined"
      ? localStorage.getItem(STORAGE_KEY) || "pt-BR"
      : "pt-BR",
  fallbackLng: "pt-BR",
  resources: {
    "pt-BR": { translation: ptBR },
    en: { translation: en },
    es: { translation: es },
  },
});

i18n.on("languageChanged", (lng) => {
  if (typeof localStorage !== "undefined")
    localStorage.setItem(STORAGE_KEY, lng);
});

export default i18n;
