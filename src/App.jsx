import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Seo } from "./components/Seo";
import { SiteFooter } from "./components/SiteFooter";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ChordBuilder } from "./pages/ChordBuilder";
import { Scales } from "./pages/Scales";

function App() {
  return (
    <div className="flex min-h-0 grow flex-col">
      <Seo />
      <Header />
      <div className="flex min-h-0 w-full grow flex-col justify-between pt-16">
        <main className="w-full">
          <div className="shell-page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/chord-builder" element={<ChordBuilder />} />
              <Route path="/scales" element={<Scales />} />
            </Routes>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export default App;
