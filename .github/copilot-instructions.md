# Copilot Instructions for electron-todo

## Project Overview
- **Type:** Electron desktop app using React (Vite) for the renderer.
- **Main files:**
  - Electron main process: `src/main.ts`
  - Preload script: `src/preload.ts`
  - Renderer (React): `src/renderer.tsx`, `src/App.tsx`, `src/components/ToDoMain.tsx`
  - Styles: `src/todo.module.css`, `src/index.css`
- **Build system:** Vite (see `vite.*.config.ts`), orchestrated by Electron Forge (`forge.config.ts`).

## Architecture & Data Flow
- **Electron main process** (`src/main.ts`):
  - Launches the app window, loads the renderer via Vite dev server or built HTML.
  - Uses a preload script (`src/preload.ts`) for secure context bridging (currently empty).
- **Renderer**: Pure React app, entry at `src/renderer.tsx` → `App.tsx` → `components/ToDoMain.tsx`.
  - State and logic are managed in React components. Example: `ToDoMain.tsx` manages a list of tasks.
  - CSS Modules are used for component-scoped styles.
- **No explicit IPC or backend**: All logic is currently in the renderer; preload is a placeholder for future secure API exposure.

## Developer Workflows
- **Start (dev):** `npm start` (runs Electron Forge with Vite dev server)
- **Build/package:** `npm run make` (creates distributables via Electron Forge)
- **Lint:** `npm run lint`
- **No test scripts** are defined; add tests as needed.

## Project Conventions
- **React with TypeScript**: All components use `.tsx` and are typed.
- **CSS Modules**: Import styles as `import styles from '../todo.module.css'` and use as `className={styles.className}`.
- **Component structure**: Main UI logic in `ToDoMain.tsx`, which is rendered by `App.tsx`.
- **Sample data**: `ToDoMain.tsx` uses a hardcoded sample array for tasks.
- **Electron Forge + Vite**: See `forge.config.ts` for build orchestration; Vite configs are split for main, preload, and renderer.

## Integration Points
- **Electron Forge plugins**: Vite, Fuses, and various makers for packaging (see `forge.config.ts`).
- **Vite plugins**: React plugin enabled in `vite.main.config.ts`.
- **No external API or database**: All data is local and in-memory.

## Examples
- **Adding a new React component**: Place in `src/components/`, import and use in `App.tsx`.
- **Adding styles**: Add to `src/todo.module.css` and import as a module in your component.
- **Modifying Electron behavior**: Update `src/main.ts` and adjust Vite/Electron Forge configs as needed.

---

If you add new workflows, conventions, or integration points, update this file to keep AI agents productive.
