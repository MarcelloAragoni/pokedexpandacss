import { useState } from "react";
import { css } from "../../styled-system/css";
import Badge from "./badge/badge";
import { Tabs } from "./Tabs";
import { EvolutionView } from "./EvolutionView";
import type { Pokemon, Species, EvolutionChain } from "../api/pokeapi";
import Container from "./container/Container";
import { toBadgeColor } from "../utils/typesToStrings";
import { toBackgroundColor } from "./container/containerType";

type Props = {
  pokemon: Pokemon;
  image: string | null;
  pokedexEntry: string;
  species: Species;
  evolutionChain: EvolutionChain | null;
  onBack: () => void;
};

export default function PokemonDetailCard({
  pokemon,
  image,
  pokedexEntry,
  species,
  evolutionChain,
  onBack,
}: Props) {
  const [showShiny, setShowShiny] = useState(false);

  const typeColor =
    pokemon.types.length > 1
      ? `${pokemon.types[0]?.type.name}-${pokemon.types[1]?.type.name}`
      : pokemon.types[0]?.type.name;

  return (
    <div
      className={css({
        w: "100%",
        minH: "100vh",
        display: "flex",
        flexDirection: "column",
        marginX: "auto",
      })}
    >
      <Container bgColor={toBackgroundColor(typeColor)}>
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <button
            type="button"
            onClick={onBack}
            className={css({
              bg: "whiteAlpha.300",
              color: "white",
              borderRadius: "999px",
              paddingX: "8px",
              paddingY: "4px",
            })}
          >
            ←
          </button>
          <div className={css({ display: "flex", gap: "8px" })}>
            <button
              type="button"
              onClick={() => setShowShiny((v) => !v)}
              className={css({
                bg: "whiteAlpha.300",
                color: "white",
                borderRadius: "999px",
                paddingX: "8px",
                paddingY: "4px",
                fontWeight: "bold",
              })}
            >
              {showShiny ? "Shiny ON" : "Shiny OFF"}
            </button>
            <button
              type="button"
              className={css({
                bg: "whiteAlpha.300",
                color: "white",
                borderRadius: "999px",
                paddingX: "8px",
                paddingY: "4px",
              })}
            >
              ♡
            </button>
          </div>
        </div>

        <div
          className={css({
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          })}
        >
          <div>
            <div
              className={css({
                fontSize: "2xl",
                fontWeight: "bold",
                textTransform: "capitalize",
              })}
            >
              {pokemon.name}
            </div>
            <div
              className={css({
                display: "flex",
                gap: "6px",
                marginTop: "6px",
              })}
            >
              {pokemon.types.map((t) => (
                <Badge key={t.type.name} bgColor={toBadgeColor(t.type.name)}>
                  {t.type.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className={css({ fontWeight: "bold" })}>
            #{String(pokemon.id).padStart(3, "0")}
          </div>
        </div>

        {(() => {
          const official = showShiny
            ? pokemon.sprites?.other?.["official-artwork"]?.front_shiny
            : pokemon.sprites?.other?.["official-artwork"]?.front_default;
          const fallback = showShiny
            ? pokemon.sprites?.front_shiny
            : pokemon.sprites?.front_default;
          const img = official ?? fallback ?? image;
          return img ? (
            <img
              src={img}
              alt={pokemon.name}
              className={css({
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "-14px",
                maxH: "70%",
                zIndex: "999",
              })}
            />
          ) : null;
        })()}
      </Container>

      <div
        className={css({
          bg: "white",
          borderRadius: "16px",
          marginTop: "-12px",
          padding: "16px",
          boxShadow: "md",
          flex: "1",
          overflowY: "auto",
          zIndex: "99",
        })}
      >
        <Tabs
          tabs={[
            {
              label: "Dados",
              content: (
                <div className={css({ display: "grid", gap: "8px" })}>
                  <div className={css({ fontSize: "sm", color: "gray.700" })}>
                    {pokedexEntry || "Sem entrada da Pokédex disponível."}
                  </div>
                  <div
                    className={css({
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: "6px",
                    })}
                  >
                    <div>Espécie</div>
                    <div>
                      {species.genera?.find((g) => g.language.name === "en")
                        ?.genus ?? "-"}
                    </div>
                    <div>Altura</div>
                    <div>{pokemon.height / 10} m</div>
                    <div>Peso</div>
                    <div>{pokemon.weight / 10} kg</div>
                    <div>Habilidades</div>
                    <div>
                      {pokemon.abilities
                        .map((a) => a.ability.name)
                        .join(", ") || "-"}
                    </div>
                  </div>
                  <div>
                    <div
                      className={css({
                        fontWeight: "bold",
                        marginBottom: "4px",
                      })}
                    >
                      Breeding
                    </div>
                    <div
                      className={css({
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: "6px",
                      })}
                    >
                      <div>Gender</div>
                      <div>
                        {typeof species.gender_rate === "number"
                          ? `${((1 - species.gender_rate / 8) * 100).toFixed(1)}% ♂ / ${(
                              (species.gender_rate / 8) *
                              100
                            ).toFixed(1)}% ♀`
                          : "-"}
                      </div>
                      <div>Egg Groups</div>
                      <div>
                        {species.egg_groups?.map((g) => g.name).join(", ") ||
                          "-"}
                      </div>
                      <div>Egg Cycle</div>
                      <div>{species.growth_rate?.name ?? "-"}</div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: "S.Base",
              content: (
                <div className={css({ display: "grid", gap: "8px" })}>
                  {pokemon.stats.map((s) => {
                    const pct = Math.min(100, (s.base_stat / 255) * 100);
                    return (
                      <div
                        key={s.stat.name}
                        className={css({
                          display: "grid",
                          gridTemplateColumns: "140px 1fr 48px",
                          alignItems: "center",
                          gap: "8px",
                          color: "black",
                        })}
                      >
                        <div className={css({ textTransform: "capitalize" })}>
                          {s.stat.name}
                        </div>
                        <div
                          className={css({
                            bg: "gray.100",
                            borderRadius: "999px",
                            overflow: "hidden",
                          })}
                        >
                          <div
                            className={css({
                              bg: "whiteAlpha.500",
                              height: "8px",
                            })}
                          />
                          <div
                            className={css({
                              bg: "typeGrass",
                              height: "8px",
                              width: `${pct}%`,
                              marginTop: "-8px",
                            })}
                          />
                        </div>
                        <div
                          className={css({
                            textAlign: "right",
                            fontVariantNumeric: "tabular-nums",
                          })}
                        >
                          {s.base_stat}
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className={css({
                      marginTop: "8px",
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "black",
                    })}
                  >
                    Total:{" "}
                    {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                  </div>
                </div>
              ),
            },
            {
              label: "Evolução",
              content: (
                <EvolutionView chain={evolutionChain} shiny={showShiny} />
              ),
            },
            {
              label: "Movimentos",
              content: (
                <div
                  className={css({
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  })}
                >
                  {pokemon.moves.map((m) => (
                    <Badge
                      key={m.move.name}
                      bgColor={toBadgeColor(pokemon.types[0]?.type.name)}
                    >
                      {m.move.name}
                    </Badge>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
