import { css } from "../../styled-system/css";
import { useEffect, useState } from "react";
import { getPokemon, type Pokemon } from "../api/pokeapi";

type EvolutionChain = import("../api/pokeapi").EvolutionChain | null;

export function EvolutionView({
  chain,
  shiny = false,
}: {
  chain: EvolutionChain;
  shiny?: boolean;
}) {
  if (!chain) return <div>Sem dados de evolução.</div>;

  const nodes: { name: string }[] = [];
  function traverse(n: any) {
    if (!n) return;
    nodes.push({ name: n.species.name });
    for (const next of n.evolves_to ?? []) traverse(next);
  }
  traverse(chain.chain);

  return <EvoImages names={nodes.map((n) => n.name)} shiny={shiny} />;
}

function EvoImages({ names, shiny }: { names: string[]; shiny: boolean }) {
  const [list, setList] = useState<
    { name: string; id: number; image: string | null }[]
  >([]);

  useEffect(() => {
    let canceled = false;
    (async () => {
      const results: { name: string; id: number; image: string | null }[] = [];
      for (const name of names) {
        try {
          const p: Pokemon = await getPokemon(name);
          const image = shiny
            ? p.sprites?.other?.["official-artwork"]?.front_shiny ??
              p.sprites?.front_shiny ??
              p.sprites?.other?.["official-artwork"]?.front_default ??
              p.sprites?.front_default ??
              null
            : p.sprites?.other?.["official-artwork"]?.front_default ??
              p.sprites?.front_default ??
              null;
          results.push({ name: p.name, id: p.id, image });
        } catch (_) {
          results.push({ name, id: 0, image: null });
        }
      }
      if (!canceled) setList(results);
    })();
    return () => {
      canceled = true;
    };
  }, [names.join(","), shiny]);

  if (list.length === 0) return <div>Sem dados de evolução.</div>;

  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexDir: "column",
      })}
    >
      {list.map((n, i) => (
        <div
          key={`${n.name}-${i}`}
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0px",
            flexDir: "column",
          })}
        >
          <div
            className={css({
              textAlign: "center",
            })}
          >
            <div
              className={css({
                bg: "gray.50",
                borderRadius: "8px",
                minW: "96px",
                minH: "96px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              {n.image ? (
                <img
                  src={n.image}
                  alt={n.name}
                  className={css({ maxH: "90px" })}
                />
              ) : (
                <span className={css({ fontSize: "xs", color: "gray.600" })}>
                  Sem imagem
                </span>
              )}
            </div>
            <div
              className={css({
                marginTop: "4px",
                fontSize: "sm",
                textTransform: "capitalize",
              })}
            >
              #{n.id || "?"} {n.name}
            </div>
          </div>
          {i < list.length - 1 && (
            <span className={css({ color: "gray.600" })}>↓</span>
          )}
        </div>
      ))}
    </div>
  );
}
