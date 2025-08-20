import type { BadgeProps } from "../components/badge/badgeType";

const TYPE_TO_BADGE: Record<string, BadgeProps["bgColor"]> = {
  primary: "primary",
  normal: "normal",
  fire: "fire",
  water: "water",
  electric: "electric",
  grass: "grass",
  ice: "ice",
  fighting: "fighting",
  poison: "poison",
  ground: "ground",
  flying: "flying",
  psychic: "psychic",
  bug: "bug",
  rock: "rock",
  ghost: "ghost",
  dragon: "dragon",
  dark: "dark",
  steel: "steel",
  fairy: "fairy",
};

export function toBadgeColor(
  typeName: string | undefined
): BadgeProps["bgColor"] {
  return TYPE_TO_BADGE[(typeName ?? "").toLowerCase()] ?? "normal";
}
