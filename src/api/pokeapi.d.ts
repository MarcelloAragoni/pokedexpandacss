export declare const api: import("axios").AxiosInstance;
export type Pokemon = {
    id: number;
    name: string;
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites?: {
        front_default?: string | null;
        other?: {
            ["official-artwork"]?: {
                front_default?: string | null;
            };
        };
    };
};
export type Species = {
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
    genera?: {
        genus: string;
        language: {
            name: string;
        };
    }[];
};
export declare function getPokemon(nameOrId: string | number): Promise<Pokemon>;
export declare function getSpecies(nameOrId: string | number): Promise<Species>;
export declare function listPokemons(page?: number, limit?: number): Promise<{
    count: number;
    results: {
        name: string;
        url: string;
    }[];
}>;
