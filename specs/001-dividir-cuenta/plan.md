# Implementation Plan: Dividir cuenta

**Branch**: `001-dividir-cuenta` | **Date**: 2026-10-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-dividir-cuenta/spec.md` and the requested React/Vite architecture.

## Summary

Build the offline, single-screen bill splitter in React and JavaScript. The screen uses
local `useState` through an injected `useDivisor` hook. Pure JavaScript domain modules
validate the entered values and calculate the individual share; data modules implement
the `aplicar(valor)` rounding contract. `src/main.jsx` creates concrete rounding
strategies and composes the screen. Vitest tests cover domain behavior and acceptance
flows.

## Technical Context

**Language/Version**: JavaScript ES modules as configured in the existing Vite project.

**Primary Dependencies**: Existing React 19 and Vite 8 setup; Vitest for tests. No external state-management library.

**Storage**: None. Form input and calculation outcome remain in component-local state.

**Testing**: Vitest. Unit tests for validation, calculation, and rounding; UI tests for
acceptance behavior, including stale-result clearing on invalid submission.

**Target Platform**: Browser, as a locally loaded single-page web app; calculation does not require network access.

**Project Type**: Single-page React web application.

**Performance Goals**: A calculation completes synchronously on the user's explicit
Calculate action.

**Constraints**: One screen; React with Vite and JavaScript; no external state library;
`useState` local state; the requested `src/presentation`, `src/domain`, and `src/data`
layout; pure JavaScript domain; only `src/main.jsx` instantiates concrete strategies;
rounding contract is `aplicar(valor)`; no network or database; generated functions
must be explainable by the student.

**Scale/Scope**: One account calculation at a time, two rounding strategies, the
acceptance scenarios and validation cases in the active spec.

## Constitution Check

### Before design

- **SOLID**: Pass. Validation, calculation, rounding, formatting, and screen state have
  separate responsibilities. New rounding rules can implement `aplicar(valor)` without
  changing domain or consumers; consumers use the small abstraction.
- **Architecture**: Pass. Dependencies follow `presentation -> domain <- data`.
  `src/domain/` is plain JavaScript and imports neither React nor DOM APIs.
- **Composition**: Pass. `src/main.jsx` is the only module that instantiates concrete
  rounding implementations. `useDivisor` receives its dependencies.
- **Security/offline**: Pass. No secrets, network calls, or database are part of the design.
- **Quality and testing**: Pass as a plan. Vitest coverage is mapped to critical
  calculation and validation behavior and the acceptance criteria; planning does not
  claim those tests are implemented or run.
- **Course rule**: Pass. Contracts document each module's inputs, outputs, and errors
  so the student can explain generated functions.

### Post-design gate

**PASS**. The module map and contracts retain the required dependency direction,
composition point, pure domain, injectable hook, and one-method rounding abstraction.

## Project Structure

### Documentation (this feature)

```text
specs/001-dividir-cuenta/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── ui.md
```

### Source Code (repository root)

```text
src/
├── main.jsx
├── domain/
│   ├── cuenta.js
│   ├── resultado.js
│   ├── calcularDivision.js
│   ├── validarEntrada.js
│   └── estrategiaRedondeo.js
├── data/
│   ├── redondeoExacto.js
│   └── redondeoHaciaArriba.js
└── presentation/
    ├── useDivisor.js
    ├── formateadorMoneda.js
    └── PantallaDivisor.jsx
```

Vitest test files are colocated with the modules they cover or placed under a
`src/**/__tests__/` directory; the task phase will specify the final test paths and
required Vitest environment dependencies. Existing Vite starter files are replaced or
removed during implementation as needed.

**Structure Decision**: Use exactly the three requested source layers. `cuenta.js`
and `resultado.js` define domain data, `validarEntrada.js` validates raw fields,
`calcularDivision.js` calculates the share using the `estrategiaRedondeo.js` contract.
Data supplies exact and ceiling implementations. The presentation hook receives
validation, calculation, and strategy dependencies; the single screen owns input and
outcome state with `useState`; formatting remains in presentation. `main.jsx` composes
all concrete strategies and passes dependencies to the screen/hook.

## Complexity Tracking

No constitution violations. No extra source layer, persistence, or external service is needed.