import type { ReactNode } from "react";
import { useState } from "react";
import { css } from "../../styled-system/css";

export function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: { label: string; content: ReactNode }[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
      })}
    >
      <div
        className={css({
          display: "flex",
          gap: "4px",
          width: "100%",
          justifyContent: "space-between",
        })}
      >
        {tabs.map((t, i) => (
          <span
            key={t.label}
            onClick={() => setActive(i)}
            className={css({
              paddingX: "10px",
              paddingY: "6px",
              fontWeight: active === i ? "bold" : "normal",
              bg: "transparent",
              color: "black",
              flex: "1",
              textAlign: "center",
              cursor: "pointer",
            })}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div className={css({ width: "100%" })}>{tabs[active]?.content}</div>
    </div>
  );
}
