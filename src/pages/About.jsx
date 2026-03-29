import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-zinc-100 mb-4">
          {t("about.title")}
        </h2>
        <p className="text-lg text-zinc-300 leading-relaxed">
          {t("about.intro")}
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-100">
          {t("about.meaning.title")}
        </h3>
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
          <p className="text-4xl font-bold text-amber-400 mb-2 text-center">
            نَغَم
          </p>
          <p className="text-zinc-300 text-center mb-4">
            <strong className="text-amber-400">Nagham</strong>
          </p>
          <p className="text-zinc-400 leading-relaxed">
            {t("about.meaning.description")}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-100">
          {t("about.features.title")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <h4 className="font-medium text-zinc-200 mb-1">
                {t("about.features.staff.title")}
              </h4>
              <p className="text-zinc-400 text-sm">
                {t("about.features.staff.description")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎹</span>
            <div>
              <h4 className="font-medium text-zinc-200 mb-1">
                {t("about.features.piano.title")}
              </h4>
              <p className="text-zinc-400 text-sm">
                {t("about.features.piano.description")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎸</span>
            <div>
              <h4 className="font-medium text-zinc-200 mb-1">
                {t("about.features.guitar.title")}
              </h4>
              <p className="text-zinc-400 text-sm">
                {t("about.features.guitar.description")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎼</span>
            <div>
              <h4 className="font-medium text-zinc-200 mb-1">
                {t("about.features.chords.title")}
              </h4>
              <p className="text-zinc-400 text-sm">
                {t("about.features.chords.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-100">
          {t("about.future.title")}
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          {t("about.future.description")}
        </p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400 ml-4">
          <li>{t("about.future.items.scales")}</li>
          <li>{t("about.future.items.harmony")}</li>
          <li>{t("about.future.items.education")}</li>
          <li>{t("about.future.items.instruments")}</li>
        </ul>
      </section>

      <section className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-6 mt-8">
        <p className="text-zinc-300 italic text-center leading-relaxed">
          "{t("about.verse")}"
        </p>
        <p className="text-zinc-500 text-sm text-center mt-2">
          {t("about.verse.reference")}
        </p>
      </section>
    </div>
  );
}
