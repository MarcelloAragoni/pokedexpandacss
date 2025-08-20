import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: "#C22E20" },
          secondary: { value: "#000000" },
          text: {
            value: "#FFFFFF",
            description: "Cor para grande parte dos textos em fundos coloridos",
          },
          typeNormal: {
            value: "#A8A77A",
            description: "Cor para badges dos pokemons de tipo normal",
          },
          typeFire: {
            value: "#EE8130",
            description: "Cor para badges dos pokemons de tipo fogo",
          },
          typeWater: {
            value: "#6390F0",
            description: "Cor para badges dos pokemons de tipo agua",
          },
          typeElectric: {
            value: "#F7D02C",
            description: "Cor para badges dos pokemons de tipo eletrico",
          },
          typeGrass: {
            value: "#7AC74C",
            description: "Cor para badges dos pokemons de tipo grama",
          },
          typeIce: {
            value: "#96D9D6",
            description: "Cor para badges dos pokemons de tipo gelo",
          },
          typeFighting: {
            value: "#C22E28",
            description: "Cor para badges dos pokemons de tipo lutador",
          },
          typePoison: {
            value: "#A33EA1",
            description: "Cor para badges dos pokemons de tipo veneno",
          },
          typeGround: {
            value: "#E2BF65",
            description: "Cor para badges dos pokemons de tipo terra",
          },
          typeFlying: {
            value: "#A98FF3",
            description: "Cor para badges dos pokemons de tipo voador",
          },
          typePsychic: {
            value: "#F95587",
            description: "Cor para badges dos pokemons de tipo psiquico",
          },
          typeBug: {
            value: "#A6B91A",
            description: "Cor para badges dos pokemons de tipo inseto",
          },
          typeRock: {
            value: "#B6A136",
            description: "Cor para badges dos pokemons de tipo pedra",
          },
          typeGhost: {
            value: "#735797",
            description: "Cor para badges dos pokemons de tipo fantasma",
          },
          typeDragon: {
            value: "#6F35FC",
            description: "Cor para badges dos pokemons de tipo dragão",
          },
          typeDark: {
            value: "#705746",
            description: "Cor para badges dos pokemons de tipo dark",
          },
          typeSteel: {
            value: "#B7B7CE",
            description: "Cor para badges dos pokemons de tipo aço",
          },
          typeFairy: {
            value: "#D685AD",
            description: "Cor para badges dos pokemons de tipo fada",
          },
        },
        fonts: {
          body: { value: "sans-serif" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
