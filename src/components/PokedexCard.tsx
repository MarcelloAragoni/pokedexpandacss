import { css } from "../../styled-system/css";
import Badge from "./badge/badge";
import { PokedexButton } from "./pokedexButton";

type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

type PokedexCardProps = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  onClick?: () => void;
};

export default function PokedexCard({
  name,
  image,
  types,
  onClick,
}: PokedexCardProps) {
  console.log(types[0]);
  return (
    <PokedexButton bgColor={types[0] as PokemonType} onClick={onClick}>
      <div
        className={css({
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minH: "96px",
        })}
      >
        {image ? (
          <img src={image} alt={name} className={css({ maxH: "96px" })} />
        ) : (
          <span className={css({ fontSize: "xs", color: "gray.600" })}>
            Sem imagem
          </span>
        )}
      </div>
      <div className={css({ fontWeight: "bold", textTransform: "capitalize" })}>
        {name}
      </div>
      <div className={css({ display: "flex", gap: "6px", flexWrap: "wrap" })}>
        {types.map((t) => (
          <Badge key={t} bgColor={t as any}>
            {t}
          </Badge>
        ))}
      </div>
    </PokedexButton>
  );
}
