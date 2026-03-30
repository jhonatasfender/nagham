import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18n from "../i18n";
import { cn } from "../utils/cn";
import flagPtBR from "../assets/flag-pt-BR.svg";
import flagEn from "../assets/flag-en.svg";
import flagEs from "../assets/flag-es.svg";

const LOCALES = [
  { lng: "pt-BR", flag: flagPtBR },
  { lng: "en", flag: flagEn },
  { lng: "es", flag: flagEs },
];

const NAV_LINK_BASE =
  "rounded-md px-4 py-2 text-sm font-medium transition-colors";

function navLinkClassName({ isActive }) {
  return cn(
    NAV_LINK_BASE,
    isActive
      ? "bg-amber-500/20 text-amber-400"
      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
  );
}

function localeButtonClassName(isCurrent) {
  return cn(
    "rounded p-1 transition-opacity hover:opacity-100",
    isCurrent ? "opacity-100 ring-1 ring-amber-500/50" : "opacity-60"
  );
}

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
              <NavLink to="/" className={navLinkClassName}>
                {t("header.home")}
              </NavLink>
              <NavLink to="/chord-builder" className={navLinkClassName}>
                Construtor de Acordes
              </NavLink>
              <NavLink to="/scales" className={navLinkClassName}>
                {t("header.scales")}
              </NavLink>
              <NavLink to="/about" className={navLinkClassName}>
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
                className={localeButtonClassName(i18n.language === lng)}
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
