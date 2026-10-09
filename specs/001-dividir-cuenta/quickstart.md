# Quickstart: Dividir cuenta

## Prerequisites

- Node.js compatible with the repository's Vite version.
- npm dependencies installed from `package-lock.json`.

## Run locally

```sh
npm install
npm run dev
```

Open the local Vite URL. The calculator works without an Internet connection after the
application assets have loaded because bill splitting is performed entirely in the
browser.

## Validate with Vitest

```sh
npm test
```

The implementation task must add the Vitest script and configure a DOM environment for
screen interaction tests. The feature tests must cover:

- 100.00 / 4 people / 10% / exact → 27.50.
- 90.00 / 3 people / 0% / exact → 30.00.
- 10.00 / 3 people / 0% / exact → 3.33.
- 10.00 / 3 people / 0% / upward → 4.00.
- 50.00 / 0 people → `Debe haber al menos una persona`, no result.
- `abc` amount → `Monto inválido`, no result.
- Negative amount or tip → rejected, no result.
- An invalid calculation after a valid one hides the old result.
- Calculating valid values remains possible offline.

Use [the UI contract](contracts/ui.md) and [the data model](data-model.md) for expected
boundaries and result behavior.