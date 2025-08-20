import { css } from "../styled-system/css";
import Badge from "./components/badge/badge";
import { useState } from "react";
import { usePokemonDetails } from "./hooks/usePokemon";

function App() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<string | null>(null);

  const { data, isLoading, isError } = usePokemonDetails(
    search ?? "",
    !!search
  );

  return (
    <div
      className={css({
        color: "text",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        maxW: "720px",
      })}
    >
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

      {!search && (
        <div className={css({ fontWeight: "bold" })}>
          Digite um nome ou ID para buscar.
        </div>
      )}
      {isLoading && <div>Carregando...</div>}
      {isError && search && <div>Não encontrado ou erro na busca.</div>}

      {data && (
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: "16px",
            alignItems: "start",
          })}
        >
          <div
            className={css({
              bg: "gray.100",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minH: "160px",
            })}
          >
            {data.image ? (
              <img
                src={data.image}
                alt={data.pokemon.name}
                className={css({ maxH: "160px" })}
              />
            ) : (
              <span>Sem imagem</span>
            )}
          </div>

          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            })}
          >
            <div
              className={css({
                fontSize: "2xl",
                fontWeight: "bold",
                textTransform: "capitalize",
              })}
            >
              #{data.pokemon.id} {data.pokemon.name}
            </div>

            <div
              className={css({ display: "flex", gap: "8px", flexWrap: "wrap" })}
            >
              {data.pokemon.types.map((t) => (
                <Badge key={t.type.name} bgColor={t.type.name as any}>
                  {t.type.name}
                </Badge>
              ))}
            </div>

            <div
              className={css({
                fontSize: "sm",
                color: "gray.700",
                whiteSpace: "pre-wrap",
              })}
            >
              {data.pokedexEntry || "Sem entrada da Pokédex disponível."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
