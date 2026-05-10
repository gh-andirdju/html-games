# Repository Guidelines

## Project Structure & Module Organization
`brickbreaker/` is a standalone static game package. Main runtime logic is in `src/game.js`, styles in `src/styles.css`, and page markup in `index.html`. Local static serving is handled by `server.js`. Playwright tests live in `tests/` with config in `playwright.config.js`.

## Build, Test, and Development Commands
- `bun install`: install dependencies.
- `bun run dev`: run local static server.
- `bun run dev:pages`: run server with GitHub Pages base path.
- `bun run test`: run full Playwright test suite.
- `bun run test:pages`: run tests with Pages-style base path.
- `bun run test:external`: run tests against `PLAYWRIGHT_BASE_URL`.

## Coding Style & Naming Conventions
Use plain JavaScript with two-space indentation and camelCase naming. Keep gameplay deterministic and expose test-visible state through `window.__brickbreakerTest`. Reuse existing power-up and physics patterns instead of introducing parallel abstractions.

## Testing Guidelines
Tests use `@playwright/test` (Chromium). Prefer deterministic state mutation + `advanceFrames()` over timing sleeps. Validate controls, collisions, power-ups, level progression, HUD, and error-free console/runtime behavior.

## Commit & Pull Request Guidelines
Use short imperative commit messages like `Fix paddle bounce direction` or `Add mobile touch controls`. Include test command(s) and results in PR notes, plus screenshots/video for UI/gameplay-visible changes.
