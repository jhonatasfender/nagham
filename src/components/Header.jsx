import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18n from "../i18n";
import flagPtBR from "../assets/flag-pt-BR.svg";
import flagEn from "../assets/flag-en.svg";
import flagEs from "../assets/flag-es.svg";

const LOCALES = [
  { lng: "pt-BR", flag: flagPtBR },
  { lng: "en", flag: flagEn },
  { lng: "es", flag: flagEs },
];

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-semibold text-zinc-100">
              Nagham <span className="text-zinc-500 text-lg">(نَغَم)</span>
            </h1>
            <nav className="flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`
                }
              >
                {t("header.home")}
              </NavLink>
              <NavLink
                to="/chord-builder"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`
                }
              >
                Construtor de Acordes
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`
                }
              >
                {t("header.about")}
              </NavLink>
            </nav>
          </div>
          <div className="flex gap-1 rounded-md border border-zinc-600 bg-zinc-800/80 p-0.5">
            {LOCALES.map(({ lng, flag }) => (
              <button
                key={lng}
                type="button"
                onClick={() => i18n.changeLanguage(lng)}
                className={`rounded p-1 transition-opacity hover:opacity-100 ${
                  i18n.language === lng
                    ? "ring-1 ring-amber-500/50 opacity-100"
                    : "opacity-60"
                }`}
                title={lng}
              >
                <img src={flag} alt="" className="h-5 w-7 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
