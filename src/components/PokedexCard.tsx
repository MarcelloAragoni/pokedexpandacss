import { css } from "../../styled-system/css";
import Badge from "./badge/badge";
import { useTypeColor } from "../hooks/useTypeColor";

type PokedexCardProps = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  onClick?: () => void;
};

export default function PokedexCard({
  id,
  name,
  image,
  types,
  onClick,
}: PokedexCardProps) {
  const headerColor = useTypeColor(types[0]);
  return (
    <button
      onClick={onClick}
      className={css({
        textAlign: "left",
        bg: "white",
        border: "1px solid",
        borderColor: "gray.200",
        borderRadius: "8px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        cursor: "pointer",
        _hover: { boxShadow: "sm" },
      })}
    >
      <div className={css({ fontSize: "sm", color: "gray.700" })}>#{id}</div>
      <div
        className={css({
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minH: "96px",
        })}
        style={{ backgroundColor: headerColor }}
      >
        {image ? (
          <img src={image} alt={name} className={css({ maxH: "96px" })} />
        ) : (
          <span className={css({ fontSize: "xs", color: "gray.600" })}>
            Sem imagem
          </span>
        )}
      </div>
      <div className={css({ fontWeight: "bold", textTransform: "capitalize" })}>
        {name}
      </div>
      <div className={css({ display: "flex", gap: "6px", flexWrap: "wrap" })}>
        {types.map((t) => (
          <Badge key={t} bgColor={t as any}>
            {t}
          </Badge>
        ))}
      </div>
    </button>
  );
}
