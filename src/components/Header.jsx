import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";
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

const NAV_LINK_MOBILE = "block w-full text-left";

function navLinkClassName({ isActive }) {
  return cn(
    NAV_LINK_BASE,
    isActive
      ? "bg-amber-500/20 text-amber-400"
      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
  );
}

function navLinkClassNameMobile(props) {
  return cn(navLinkClassName(props), NAV_LINK_MOBILE);
}

function localeButtonClassName(isCurrent) {
  return cn(
    "rounded p-1 transition-opacity hover:opacity-100",
    isCurrent ? "opacity-100 ring-1 ring-amber-500/50" : "opacity-60"
  );
}

const NAV_ROUTES = [
  { to: "/", labelKey: "header.home" },
  { to: "/chord-builder", labelKey: "header.chordBuilder" },
  { to: "/scales", labelKey: "header.scales" },
  { to: "/about", labelKey: "header.about" },
];

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
  }, [location.pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeIfDesktop = () => {
      if (mq.matches) setMenuOpen(false);
    };
    closeIfDesktop();
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
            <h1 className="truncate text-xl font-semibold text-zinc-100 sm:text-2xl">
              Nagham{" "}
              <span className="text-zinc-500 text-base sm:text-lg">
                (نَغَم)
              </span>
            </h1>
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label={t("header.navLabel")}
            >
              {NAV_ROUTES.map(({ to, labelKey }) => (
                <NavLink key={to} to={to} className={navLinkClassName}>
                  {t(labelKey)}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-zinc-800 lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="header-mobile-nav"
              aria-label={
                menuOpen ? t("header.menuClose") : t("header.menuOpen")
              }
            >
              {menuOpen ? (
                <HiX className="h-6 w-6" aria-hidden />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" aria-hidden />
              )}
            </button>
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
        {menuOpen ? (
          <nav
            id="header-mobile-nav"
            className="border-t border-zinc-800 py-3 lg:hidden"
            aria-label={t("header.navLabel")}
          >
            <div className="flex flex-col gap-1">
              {NAV_ROUTES.map(({ to, labelKey }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={navLinkClassNameMobile}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(labelKey)}
                </NavLink>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
