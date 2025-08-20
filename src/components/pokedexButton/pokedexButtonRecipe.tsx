import { cva } from "../../../styled-system/css";

/** recipe do botão do PokedexCard */
export const pokedexButtonRecipe = cva({
  base: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    cursor: "pointer",
    _hover: { boxShadow: "sm" },
  },
  variants: {
    color: {
      normal: { bg: "normal" },
      fire: { bg: "fire" },
      water: { bg: "water" },
      electric: { bg: "electric" },
      grass: { bg: "grass" },
      ice: { bg: "ice" },
      fighting: { bg: "fighting" },
      poison: { bg: "poison" },
      ground: { bg: "ground" },
      flying: { bg: "flying" },
      psychic: { bg: "psychic" },
      bug: { bg: "bug" },
      rock: { bg: "rock" },
      ghost: { bg: "ghost" },
      dragon: { bg: "dragon" },
      dark: { bg: "dark" },
      steel: { bg: "steel" },
      fairy: { bg: "fairy" },
    },
  },
});
