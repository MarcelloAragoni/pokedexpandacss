import { useQuery } from "@tanstack/react-query";
import { getPokemon, getSpecies, type Pokemon } from "../api/pokeapi";

type PokemonDetails = {
  pokemon: Pokemon;
  pokedexEntry: string;
  image: string | null;
};

export function usePokemonDetails(nameOrId: string | number, enabled = true) {
  return useQuery<PokemonDetails>({
    queryKey: ["pokemon-details", nameOrId],
    enabled: !!nameOrId && enabled,
    queryFn: async () => {
      const [pokemon, species] = await Promise.all([
        getPokemon(nameOrId),
        getSpecies(nameOrId),
      ]);

      const entry =
        species.flavor_text_entries
          .find((e) => e.language.name === "en")
          ?.flavor_text?.replace(/\f/g, " ")
          ?.replace(/\n/g, " ") ?? "";

      const image =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ??
        pokemon.sprites?.front_default ??
        null;

      return { pokemon, pokedexEntry: entry, image };
    },
  });
}
