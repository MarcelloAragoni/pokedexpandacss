import { badgeRecipe } from "./badgeRecipe";
import type { BadgeProps } from "./badgeType";

export default function Badge({ bgColor, children }: BadgeProps) {
  return <span className={badgeRecipe({ color: bgColor })}>{children}</span>;
}
