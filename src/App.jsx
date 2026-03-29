import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ChordBuilder } from "./pages/ChordBuilder";
import i18n from "./i18n/index";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app.title");
    document.documentElement.lang = i18n.language;
  }, [t]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chord-builder" element={<ChordBuilder />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
