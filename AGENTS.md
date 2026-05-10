# Repository Guidelines

## Project Structure & Module Organization
This repo is a static HTML games collection. Each game lives in its own top-level folder (`brickbreaker/`, `tetris/`) with local runtime code in `src/`, page entrypoint in `index.html`, Playwright tests in `tests/`, config in `playwright.config.js`, and a Bun static server in `server.js`. Root `index.html` lists game links for GitHub Pages. Keep generated files such as `node_modules/` and `test-results/` out of git.

## Build, Test, and Development Commands
Run commands from the target game folder.
- `bun install`: install dependencies from `bun.lock`.
- `bun run dev`: serve the game on its configured local port.
- `bun run test`: run headless Chromium Playwright tests.
- `bun run test:headed`: run tests with a visible browser.
- `bun run test:ui`: inspect tests in Playwright UI mode.
- `bun run playwright:install`: install Playwright browsers if missing.

## Coding Style & Naming Conventions
Use plain HTML, CSS, and JavaScript. Match local style: two-space indentation, descriptive camelCase for JS functions and state (`makeBricksForLevel`, `activeEffects`), and kebab-case CSS classes. Keep gameplay logic deterministic; avoid randomness unless it is seeded and exposed to tests. Preserve `window.__brickbreakerTest` hook names unless intentionally updating tests.

## Testing Guidelines
Tests use `@playwright/test` and target Desktop Chrome. Name specs by observable behavior, for example `laser pickup auto-fires after collection`. Prefer state assertions through test hooks and fixed `advanceFrames()` calls over wall-clock waits. Cover physics, power-ups, level progression, HUD state, and console/page errors for gameplay changes. Run `bun run test` before opening a PR; for risky physics changes, also run `bun run test -- --repeat-each=3`.

## Commit & Pull Request Guidelines
Recent history uses short, direct subjects, with no Conventional Commits pattern. Use imperative commit messages such as `Fix paddle bounce direction` or `Add level HUD`. PRs should include a summary, test commands and results, screenshots or short clips for visual changes, linked issues when applicable, and notes about gameplay or test-hook changes.

## Agent-Specific Notes
Use Bun commands, not npm. If opening the game for review, first ensure a persistent `bun run dev` server is running and verify the URL responds. Keep delegation to at most two parallel subagents; start another batch only after the current batch completes.
