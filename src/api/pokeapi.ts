import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export type Pokemon = {
  id: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites?: {
    front_default?: string | null;
    other?: {
      ["official-artwork"]?: { front_default?: string | null };
    };
  };
};

export type Species = {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera?: { genus: string; language: { name: string } }[];
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
