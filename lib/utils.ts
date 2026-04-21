import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function hexLuminance(hex: string): number {
  const clean = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function isLightColor(hex: string): boolean {
  return hexLuminance(hex) > 0.35;
}

export function isLightBackground(
  type: "solid" | "gradient",
  opts: { color?: string; from?: string; to?: string }
): boolean {
  if (type === "solid") return isLightColor(opts.color ?? "#000000");
  const l1 = hexLuminance(opts.from ?? "#000000");
  const l2 = hexLuminance(opts.to ?? "#000000");
  return (l1 + l2) / 2 > 0.35;
}
