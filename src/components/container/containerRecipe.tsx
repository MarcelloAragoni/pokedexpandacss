import { cva } from "../../../styled-system/css";

const TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

type PokemonType = (typeof TYPES)[number];

type SingleVariant = { bg: PokemonType };
type DualVariant = {
  bgGradient: "to-r";
  gradientFrom: PokemonType;
  gradientTo: PokemonType;
};

/** variantes para 1 tipo */
const singleVariants = TYPES.reduce(
  (acc, t) => {
    acc[t] = { bg: t };
    return acc;
  },
  {} as Record<PokemonType, SingleVariant>
);

/** variantes para 2 tipos */
const dualVariants = TYPES.flatMap((a) =>
  TYPES.filter((b) => b !== a).map((b) => [
    `${a}-${b}`,
    { bgGradient: "to-r", gradientFrom: a, gradientTo: b },
  ])
).reduce(
  (acc, [key, value]) => {
    acc[key as `${PokemonType}-${PokemonType}`] = value as DualVariant;
    return acc;
  },
  {} as Record<`${PokemonType}-${PokemonType}`, DualVariant>
);

/** recipe do container */
export const containerRecipe = cva({
  base: {
    position: "relative",
    borderTopRadius: "16px",
    padding: "16px",
    minH: "40vh",
  },
  variants: {
    color: {
      ...singleVariants,
      ...dualVariants,
    },
  },
});
