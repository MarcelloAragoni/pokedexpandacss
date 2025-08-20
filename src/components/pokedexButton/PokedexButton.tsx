import { pokedexButtonRecipe } from "./pokedexButtonRecipe";
import type { PokedexButtonType } from "./pokedexButtonType";

export default function PokedexButton({
  bgColor,
  children,
  onClick,
}: PokedexButtonType) {
  return (
    <button
      onClick={onClick}
      className={pokedexButtonRecipe({ color: bgColor })}
    >
      {children}
    </button>
  );
}
