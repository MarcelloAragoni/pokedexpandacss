import { type Pokemon } from "../api/pokeapi";
type PokemonDetails = {
    pokemon: Pokemon;
    pokedexEntry: string;
    image: string | null;
};
export declare function usePokemonDetails(nameOrId: string | number, enabled?: boolean): import("@tanstack/react-query").UseQueryResult<PokemonDetails, Error>;
export {};
