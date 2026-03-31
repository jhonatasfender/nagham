import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { githubRepoBaseUrl, getGithubIssuesUrl } from "../constants/repo";
import { cn } from "../utils/cn";

const linkClass = [
  "inline-flex items-center gap-2 rounded-lg border border-zinc-800/90",
  "bg-zinc-900/60 px-3.5 py-2 text-sm font-medium text-zinc-400 shadow-sm",
  "transition-all duration-200 hover:border-amber-500/35 hover:bg-zinc-800/70",
  "hover:text-amber-400/95 hover:shadow-amber-500/5",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-amber-500/50",
];

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative shrink-0 border-t border-zinc-800/70 bg-zinc-950/35">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col items-center gap-5">
          <nav
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            aria-label={t("footer.githubNav")}
          >
            <a
              href={githubRepoBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkClass)}
            >
              <FaGithub className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              {t("footer.sourceLink")}
            </a>
            <a
              href={getGithubIssuesUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkClass)}
            >
              <FaGithub className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              {t("footer.issuesLink")}
            </a>
          </nav>
          <p className="max-w-md text-center text-xs leading-relaxed text-zinc-500">
            {t("footer.reportOnGithub")}
          </p>
          <p className="text-[11px] tracking-wide text-zinc-600">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
