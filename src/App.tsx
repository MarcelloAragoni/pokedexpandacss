import { css } from "../styled-system/css";
import PokedexCard from "./components/PokedexCard";
import PokemonDetailCard from "./components/PokemonDetailCard";
import { useState, useMemo } from "react";
import { usePokemonDetails, useGenerationPokemons } from "./hooks/usePokemon";
import { getPokemon } from "./api/pokeapi";

function App() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<number>(1);
  // shiny agora é controlado dentro do PokemonDetailCard

  const { data, isLoading, isError } = usePokemonDetails(
    search ?? "",
    !!search
  );

  const genQuery = useGenerationPokemons(generationId, !search);
  const speciesList = genQuery.data ?? [];

  return (
    <div
      className={css({
        color: "text",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        w: "100%",
        minH: "100vh",
      })}
    >
      {!search && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim().toLowerCase();
            setSearch(q || null);
          }}
          className={css({ display: "flex", gap: "8px" })}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por nome ou ID (ex: pikachu ou 25)"
            className={css({
              border: "1px solid",
              borderColor: "gray.300",
              borderRadius: "6px",
              padding: "8px",
              flex: "1",
              bg: "white",
              color: "black",
            })}
          />
          <button
            type="submit"
            className={css({
              bg: "typeElectric",
              color: "white",
              borderRadius: "6px",
              paddingX: "12px",
              paddingY: "8px",
              fontWeight: "bold",
            })}
          >
            Buscar
          </button>
        </form>
      )}

      {!search && (
        <div
          className={css({ display: "flex", gap: "8px", alignItems: "center" })}
        >
          <label className={css({ fontWeight: "bold" })}>Geração:</label>
          <select
            value={generationId}
            onChange={(e) => setGenerationId(Number(e.target.value))}
            className={css({
              border: "1px solid",
              borderColor: "gray.300",
              borderRadius: "6px",
              padding: "6px",
              bg: "white",
              color: "black",
            })}
          >
            <option value={1}>I</option>
            <option value={2}>II</option>
            <option value={3}>III</option>
            <option value={4}>IV</option>
            <option value={5}>V</option>
            <option value={6}>VI</option>
            <option value={7}>VII</option>
            <option value={8}>VIII</option>
            <option value={9}>IX</option>
          </select>
        </div>
      )}

      {!search && genQuery.isLoading && <div>Carregando geração...</div>}
      {!search && !genQuery.isLoading && speciesList.length > 0 && (
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "12px",
          })}
        >
          {speciesList.map((s) => {
            const id = Number(s.url.split("/").filter(Boolean).pop());
            return (
              <PokedexCardLoader
                key={s.name}
                id={id}
                name={s.name}
                onOpen={(n) => setSearch(String(n))}
              />
            );
          })}
        </div>
      )}

      {isLoading && search && <div>Carregando...</div>}
      {isError && search && <div>Não encontrado ou erro na busca.</div>}

      {data && (
        <PokemonDetailCard
          pokemon={data.pokemon}
          image={data.image}
          pokedexEntry={data.pokedexEntry}
          species={data.species}
          evolutionChain={data.evolutionChain}
          onBack={() => setSearch(null)}
        />
      )}
    </div>
  );
}

export default App;

function PokedexCardLoader({
  id,
  name,
  onOpen,
}: {
  id: number;
  name: string;
  onOpen: (id: number) => void;
}) {
  const [details, setDetails] = useState<{
    image: string | null;
    types: string[];
  } | null>(null);
  const [, setLoading] = useState(false);

  useMemo(() => {
    let isMounted = true;
    setLoading(true);
    getPokemon(id)
      .then((p) => {
        if (!isMounted) return;
        const image =
          p.sprites?.other?.["official-artwork"]?.front_default ??
          p.sprites?.front_default ??
          null;
        const types = p.types.map((t) => t.type.name);
        setDetails({ image, types });
      })
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <PokedexCard
      id={id}
      name={name}
      image={details?.image ?? null}
      types={details?.types ?? []}
      onClick={() => onOpen(id)}
    />
  );
}
