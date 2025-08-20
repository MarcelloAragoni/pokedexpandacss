import { css } from "../../../styled-system/css";
import { containerRecipe } from "./containerRecipe";
import type { ContainerType } from "./containerType";

// Função auxiliar para converter bgColor para a chave correta
function getColorKey(bgColor: ContainerType["bgColor"]): any {
  if (Array.isArray(bgColor)) {
    if (bgColor.length === 1) {
      return bgColor[0];
    } else if (bgColor.length === 2) {
      return `${bgColor[0]}-${bgColor[1]}`;
    }
    return "normal"; // fallback
  }

  // Se for SingleVariant
  if ("bg" in bgColor) {
    return bgColor.bg;
  }

  // Se for DualVariant
  if ("gradientFrom" in bgColor && "gradientTo" in bgColor) {
    return `${bgColor.gradientFrom}-${bgColor.gradientTo}`;
  }

  return "normal"; // fallback
}

export default function Container({ bgColor, children }: ContainerType) {
  // Verifica se bgColor é um array
  if (Array.isArray(bgColor) && bgColor.length === 2) {
    return (
      <div
        className={css({
          position: "relative",
          borderTopRadius: "16px",
          padding: "16px",
          minH: "40vh",
          bgGradient: "to-r",
          gradientFrom: `${bgColor[0]}`,
          gradientTo: `${bgColor[1]}`,
        })}
      >
        {children}
      </div>
    );
  }

  // Para casos que não são arrays (SingleVariant ou DualVariant)
  const colorKey = getColorKey(bgColor);
  return <div className={containerRecipe({ color: colorKey })}>{children}</div>;
}
