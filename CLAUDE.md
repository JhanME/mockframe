# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MockFrame is a client-side web app for wrapping screenshots in professional device mockups (Safari, MacBook, iPhone 15, Android Pixel). Everything runs in the browser — no backend, no image uploads to servers. Built for the midudev hackathon.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (also validates TypeScript + ESLint)
- `npm run lint` — ESLint only

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v3 + shadcn/ui components (manually written for v3/Radix UI — NOT auto-generated shadcn v4/@base-ui)
- `html-to-image` for PNG/SVG export at 3x resolution
- `lucide-react` for icons
- All state is client-side (`useState` in `app/page.tsx`)

## Architecture

**State model**: `app/page.tsx` owns all state via `MockupState` (defined in `types/mockup.ts`). The state uses a **layer system** — each device is a `DeviceLayer` with its own image, position (x/y), scale, 3D rotation, device type, and z-index. Multiple devices can coexist in a single scene.

**Device frames** (`components/devices/`): Pure HTML/CSS components (no SVG/foreignObject) — this is critical for `html-to-image` export compatibility. Each device component receives `DeviceFrameProps`. The barrel export in `index.ts` maps `DeviceType` → component.

**Preview** (`components/Preview.tsx`): Renders the exportable canvas with all layers. Uses `forwardRef` so `page.tsx` can pass the DOM ref to `html-to-image`. Layers are positioned with CSS `absolute` + `left/top` calc. Key constraint: layer wrappers must use `width: max-content` to prevent CSS absolute positioning from resizing content based on available space.

**Editor components** (`components/Editor/`): LayerPanel manages per-layer controls (image upload, device type, scale, 3D rotation). ScenePresetSelector applies predefined scene configurations. BackgroundPicker handles solid/gradient backgrounds with presets.

**Scene presets** (`lib/presets.ts`): Predefined configurations (canvas size, layers with positions/scales/rotations, background). Used by ScenePresetSelector.

**Export** (`lib/export.ts`): Wraps `html-to-image` `toPng`/`toSvg`. Images must be data URLs (not blob URLs) for CORS-free export.

## Key Constraints

- shadcn/ui components in `components/ui/` are manually written for Tailwind v3 + Radix UI. Do NOT regenerate with `npx shadcn` — it outputs Tailwind v4/@base-ui code incompatible with this project.
- Device frames use `<img>` tags (not `next/image`) because images are data URLs from FileReader. The ESLint `@next/next/no-img-element` warnings are expected.
- CSS variables in `globals.css` use HSL format (Tailwind v3 convention), not oklch.
