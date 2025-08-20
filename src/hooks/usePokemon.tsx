import { useQuery } from "@tanstack/react-query";
import {
  getPokemon,
  getSpecies,
  type Pokemon,
  getEvolutionChainByUrl,
} from "../api/pokeapi";

type PokemonDetails = {
  pokemon: Pokemon;
  pokedexEntry: string;
  image: string | null;
  species: import("../api/pokeapi").Species;
  evolutionChain: import("../api/pokeapi").EvolutionChain | null;
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

      const evo = species.evolution_chain?.url
        ? await getEvolutionChainByUrl(species.evolution_chain.url)
        : null;
      return {
        pokemon,
        pokedexEntry: entry,
        image,
        species,
        evolutionChain: evo,
      };
    },
  });
}

export function useGenerationPokemons(generationId: number, enabled = true) {
  return useQuery({
    queryKey: ["generation", generationId],
    enabled: !!generationId && enabled,
    queryFn: async () => {
      const { getGeneration } = await import("../api/pokeapi");
      const gen = await getGeneration(generationId);
      // Ordena por ID real do species (url termina com /pokemon-species/:id/)
      const orderedSpecies = [...gen.pokemon_species].sort((a, b) => {
        const idA = Number(a.url.split("/").filter(Boolean).pop());
        const idB = Number(b.url.split("/").filter(Boolean).pop());
        return idA - idB;
      });
      return orderedSpecies;
    },
  });
}
