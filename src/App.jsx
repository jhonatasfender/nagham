import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Seo } from "./components/Seo";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ChordBuilder } from "./pages/ChordBuilder";
import { Scales } from "./pages/Scales";

function App() {
  return (
    <div className="min-h-screen">
      <Seo />
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chord-builder" element={<ChordBuilder />} />
            <Route path="/scales" element={<Scales />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
