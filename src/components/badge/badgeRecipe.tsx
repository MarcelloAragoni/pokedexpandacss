import { cva } from "../../../styled-system/css";

export const badgeRecipe = cva({
  base: {
    borderRadius: "5px",
    padding: "4px",
    color: "white",
    fontSize: "10px",
    minW: "50px",
    display: "flex",
    justifyContent: "center",
  },
  variants: {
    color: {
      normal: { bg: "typeNormal" },
      fire: { bg: "typeFire" },
      water: { bg: "typeWater" },
      electric: { bg: "typeElectric" },
      grass: { bg: "typeGrass" },
      ice: { bg: "typeIce" },
      fighting: { bg: "typeFighting" },
      poison: { bg: "typePoison" },
      ground: { bg: "typeGround" },
      flying: { bg: "typeFlying" },
      psychic: { bg: "typePsychic" },
      bug: { bg: "typeBug" },
      rock: { bg: "typeRock" },
      ghost: { bg: "typeGhost" },
      dragon: { bg: "typeDragon" },
      dark: { bg: "typeDark" },
      steel: { bg: "typeSteel" },
      fairy: { bg: "typeFairy" },
    },
  },
});
