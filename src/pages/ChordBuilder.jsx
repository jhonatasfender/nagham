import { useState, useMemo } from "react";
import { cn } from "../utils/cn";
import { GuitarView } from "../views/Guitar/GuitarView";

const barreFieldClass = cn(
  "w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100",
  "focus:outline-none focus:ring-2 focus:ring-amber-500/50",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

const clearPositionsButtonClass = cn(
  "rounded-md px-4 py-2 font-medium text-zinc-100 transition-colors",
  "bg-zinc-700 hover:bg-zinc-600",
  "disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
);

export function ChordBuilder() {
  const [currentPositions, setCurrentPositions] = useState([]);
  const [selectedRoot] = useState("C");
  const [selectedQuality] = useState("Maj");
  const [hasBarre, setHasBarre] = useState(false);
  const [barreFret, setBarreFret] = useState(1);
  const [barreStartString, setBarreStartString] = useState(null);

  const filteredPositions = useMemo(() => {
    if (hasBarre && barreFret > 0) {
      return currentPositions.filter(([, f]) => f === 0 || f >= barreFret);
    }
    return currentPositions;
  }, [currentPositions, hasBarre, barreFret]);

  const handleAddPosition = (stringIndex, fret) => {
    const actualFret = fret;

    const key = `${stringIndex}-${actualFret}`;
    setCurrentPositions((prev) => {
      const exists = prev.some(([s, f]) => `${s}-${f}` === key);
      if (exists) {
        return prev.filter(([s, f]) => `${s}-${f}` !== key);
      }

      const isNewPositionOnBarre = hasBarre && actualFret === barreFret;

      const filteredPrev = prev.filter(([s, f]) => {
        if (s !== stringIndex) return true;
        const isExistingPositionOnBarre = hasBarre && f === barreFret;
        if (isNewPositionOnBarre) {
          return false;
        }
        if (isExistingPositionOnBarre) {
          return true;
        }
        return false;
      });

      return [...filteredPrev, [stringIndex, actualFret]].sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
      });
    });
  };

  const handleClearPositions = () => {
    setCurrentPositions([]);
  };

  const getChordNotesFromPositions = () => {
    return [];
  };

  const getBarreStrings = () => {
    if (!hasBarre) return [];

    const positionsOnBarreFret = filteredPositions.filter(
      ([, f]) => f === barreFret
    );
    const stringsOnBarre = positionsOnBarreFret.map(([s]) => s);

    if (barreStartString !== null) {
      if (stringsOnBarre.length > 0) {
        const minString = Math.min(...stringsOnBarre);
        const startFrom = barreStartString;
        const endAt = Math.min(minString, 0);
        const allStrings = [];
        for (let i = startFrom; i >= endAt; i--) {
          allStrings.push(i);
        }
        return allStrings.sort((a, b) => b - a);
      } else {
        const allStrings = [];
        for (let i = barreStartString; i >= 0; i--) {
          allStrings.push(i);
        }
        return allStrings.sort((a, b) => b - a);
      }
    }

    if (stringsOnBarre.length >= 2) {
      const minString = Math.min(...stringsOnBarre);
      const maxString = Math.max(...stringsOnBarre);
      const allStrings = [];
      for (let i = maxString; i >= minString; i--) {
        allStrings.push(i);
      }
      return allStrings.sort((a, b) => b - a);
    } else if (stringsOnBarre.length === 1) {
      return [stringsOnBarre[0]];
    } else {
      return [5, 4, 3, 2, 1, 0];
    }
  };

  const barreStrings = hasBarre ? getBarreStrings() : [];
  const customBarre =
    hasBarre && barreStrings.length > 0
      ? { fret: barreFret, strings: barreStrings }
      : null;

  const positionsWithoutBarre =
    hasBarre && customBarre
      ? filteredPositions.filter(
          ([s, f]) => !(f === barreFret && customBarre.strings.includes(s))
        )
      : filteredPositions;

  return (
    <div className="space-y-8 select-none">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-100 mb-2">
          Construtor de Acordes de Violão
        </h2>
        <p className="text-zinc-400">
          Monte arrays de posições de acordes para usar no código
        </p>
      </div>

      <div className="max-w-4xl">
        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              Braço do Violão
            </h3>
            <div className="space-y-4">
              <GuitarView
                selectedNote={null}
                onSelectNote={() => {}}
                chordNotes={getChordNotesFromPositions()}
                root={selectedRoot}
                quality={selectedQuality}
                showTable={false}
                customPositions={positionsWithoutBarre}
                customBarre={customBarre}
                onPositionClick={handleAddPosition}
                isEditor={true}
              />
              <div className="text-xs text-zinc-500">
                Clique nas posições do violão para adicionar/remover notas
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              Configuração da Pestana
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="hasBarre"
                  checked={hasBarre}
                  onChange={(e) => {
                    setHasBarre(e.target.checked);
                    if (!e.target.checked) {
                      setBarreStartString(null);
                    }
                  }}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 text-amber-500 focus:ring-2 focus:ring-amber-500/50"
                />
                <label
                  htmlFor="hasBarre"
                  className="text-sm font-medium text-zinc-300 cursor-pointer"
                >
                  Tem pestana
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Casa da pestana (traste)
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={barreFret}
                  onChange={(e) =>
                    setBarreFret(
                      Math.max(1, Math.min(12, parseInt(e.target.value) || 1))
                    )
                  }
                  disabled={!hasBarre}
                  className={cn(barreFieldClass, "select-text")}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Começar da corda
                </label>
                <select
                  value={barreStartString === null ? "" : barreStartString}
                  onChange={(e) =>
                    setBarreStartString(
                      e.target.value === "" ? null : parseInt(e.target.value)
                    )
                  }
                  disabled={!hasBarre}
                  className={cn(barreFieldClass, "select-text")}
                >
                  <option value="">Automático</option>
                  <option value="5">Mi grave (6ª corda)</option>
                  <option value="4">Lá grave (5ª corda)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-4 text-sm font-medium text-zinc-400">
              Código para Copiar
            </h3>
            <div className="space-y-4">
              <div className="bg-zinc-900/50 rounded p-3 font-mono text-xs text-zinc-300 relative">
                <button
                  type="button"
                  onClick={() => {
                    const positions =
                      positionsWithoutBarre.length > 0
                        ? positionsWithoutBarre
                        : [
                            [5, 3],
                            [4, 2],
                            [3, 0],
                            [2, 0],
                            [1, 0],
                            [0, 3],
                          ];
                    let code = `  [\n${positions
                      .map((pos) => `    [${pos[0]}, ${pos[1]}],`)
                      .join("\n")}`;
                    if (
                      customBarre &&
                      customBarre.strings &&
                      customBarre.strings.length > 0
                    ) {
                      code += `\n    { barre: ${customBarre.fret}, strings: [${customBarre.strings.join(", ")}] }`;
                    }
                    code += `\n  ],`;
                    navigator.clipboard.writeText(code);
                  }}
                  className={cn(
                    "absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium text-amber-400 transition-colors",
                    "bg-amber-500/20 hover:bg-amber-500/30"
                  )}
                >
                  Copiar
                </button>
                <pre className="select-text whitespace-pre font-mono text-xs text-zinc-300 overflow-x-auto pr-16">
                  {(() => {
                    const positions =
                      positionsWithoutBarre.length > 0
                        ? positionsWithoutBarre
                        : [
                            [5, 3],
                            [4, 2],
                            [3, 0],
                            [2, 0],
                            [1, 0],
                            [0, 3],
                          ];
                    let code = `  [
${positions.map((pos) => `    [${pos[0]}, ${pos[1]}],`).join("\n")}`;
                    if (
                      customBarre &&
                      customBarre.strings &&
                      customBarre.strings.length > 0
                    ) {
                      code += `\n    { barre: ${customBarre.fret}, strings: [${customBarre.strings.join(", ")}] }`;
                    }
                    code += `\n  ],`;
                    return code;
                  })()}
                </pre>
                {filteredPositions.length === 0 && (
                  <p className="text-xs text-zinc-500 italic mt-2">
                    * Exibindo dados mockados para visualização
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClearPositions}
              disabled={filteredPositions.length === 0}
              className={clearPositionsButtonClass}
            >
              Limpar Posições
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
