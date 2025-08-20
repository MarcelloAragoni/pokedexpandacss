import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export type Pokemon = {
  id: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  height: number;
  weight: number;
  abilities: { is_hidden: boolean; ability: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string; url: string } }[];
  moves: { move: { name: string; url: string } }[];
  sprites?: {
    front_default?: string | null;
    front_shiny?: string | null;
    other?: {
      ["official-artwork"]?: {
        front_default?: string | null;
        front_shiny?: string | null;
      };
    };
  };
};

export type Species = {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera?: { genus: string; language: { name: string } }[];
  egg_groups?: { name: string; url: string }[];
  gender_rate?: number;
  capture_rate?: number;
  hatch_counter?: number;
  growth_rate?: { name: string; url: string } | null;
  evolution_chain?: { url: string } | null;
};

export type Generation = {
  id: number;
  name: string;
  pokemon_species: { name: string; url: string }[];
};

export type EvolutionChainNode = {
  species: { name: string; url: string };
  evolves_to: EvolutionChainNode[];
};

export type EvolutionChain = {
  id: number;
  chain: EvolutionChainNode;
};

export async function getPokemon(nameOrId: string | number) {
  const { data } = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
  return data;
}

export async function getSpecies(nameOrId: string | number) {
  const { data } = await api.get<Species>(`/pokemon-species/${nameOrId}`);
  return data;
}

export async function listPokemons(page = 0, limit = 20) {
  const offset = page * limit;
  const { data } = await api.get<{
    count: number;
    results: { name: string; url: string }[];
  }>(`/pokemon?offset=${offset}&limit=${limit}`);
  return data;
}

export async function getGeneration(nameOrId: string | number) {
  const { data } = await api.get<Generation>(`/generation/${nameOrId}`);
  return data;
}

export async function getEvolutionChainByUrl(url: string) {
  const { data } = await api.get<EvolutionChain>(url);
  return data;
}
