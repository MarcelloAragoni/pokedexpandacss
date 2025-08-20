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

/** tipagem do container */
export type ContainerType = {
  bgColor: SingleVariant | DualVariant | PokemonType[];
  children: React.ReactNode;
};

/** variantes para 1 tipo */
const singleVariants: Record<PokemonType, SingleVariant> = Object.fromEntries(
  TYPES.map((t) => [t, { bg: t }])
) as Record<PokemonType, SingleVariant>;

/** variantes para 2 tipos */
const dualVariants: Record<`${PokemonType}-${PokemonType}`, DualVariant> =
  Object.fromEntries(
    TYPES.flatMap((a) =>
      TYPES.filter((b) => b !== a).map((b) => [
        `${a}-${b}`,
        { bgGradient: "to-r", gradientFrom: a, gradientTo: b },
      ])
    )
  ) as Record<`${PokemonType}-${PokemonType}`, DualVariant>;

type ColorKey = keyof typeof singleVariants | keyof typeof dualVariants;

const TYPE_TO_BACKGROUND: Record<string, ColorKey> = {
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

export function toBackgroundColor(
  typeName: string | string[] | undefined
): SingleVariant | DualVariant | PokemonType[] {
  if (!typeName) return singleVariants.normal;

  const types = Array.isArray(typeName)
    ? typeName.map((t) => t.toLowerCase())
    : typeName.toLowerCase().split(/[,-]/); // aceita vírgula ou hífen como separador

  const validTypes = types
    .map((t) => TYPE_TO_BACKGROUND[t])
    .filter((t): t is PokemonType => Boolean(t));

  if (validTypes.length === 0) return singleVariants.normal;
  if (validTypes.length === 1) return singleVariants[validTypes[0]];

  const [first, second] = validTypes;

  // cria a chave para lookup no dualVariants
  const key1 = `${first}-${second}`;
  const key2 = `${second}-${first}`; // garante ordem inversa\

  if (key1 in dualVariants) {
    return dualVariants[key1 as keyof typeof dualVariants];
  }

  if (key2 in dualVariants)
    return dualVariants[key2 as keyof typeof dualVariants];

  // fallback
  return singleVariants[first];
}
