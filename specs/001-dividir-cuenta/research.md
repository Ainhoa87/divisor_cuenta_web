# Research: Dividir cuenta

## Decisions

### React local state

- **Decision**: Keep screen state in React `useState`; `useDivisor` receives the
  validation, calculation, and strategy dependencies it needs.
- **Rationale**: The feature has one screen and does not need cross-screen state. This
  follows the user's constraint and keeps presentation dependent on domain abstractions.
- **Alternatives considered**: An external state manager was excluded by the request;
  a global store would add unnecessary shared state.

### Rounding contract and calculation boundary

- **Decision**: Define the domain contract as an object exposing `aplicar(valor)`.
  `redondeoExacto` returns the value unchanged; `redondeoHaciaArriba` applies
  `Math.ceil` to the individual share after total-with-tip division.
- **Rationale**: This matches FR-004 through FR-006 and keeps the calculation independent
  of concrete rounding classes.
- **Alternatives considered**: A mode conditional inside `calcularDivision` would make
  adding strategies require editing an existing module.

### Validation result

- **Decision**: `validarEntrada` returns either a valid `cuenta` or a validation error.
  Validate amount first, then people count, then tip, so the specified amount/person
  messages are stable; reject a non-integer or less-than-one people count.
- **Rationale**: Keeps validation separate from calculation and gives the hook enough
  information to hide the previous result whenever current input is invalid.
- **Alternatives considered**: Throwing for ordinary form errors was excluded because
  these are expected user-correctable outcomes.

### Testing approach

- **Decision**: Use Vitest for domain unit tests and screen interaction tests; run the
  acceptance scenarios as executable tests.
- **Rationale**: The user explicitly requested Vitest and the constitution requires
  critical functionality and spec acceptance criteria to have tests.
- **Alternatives considered**: The existing package scripts have no test runner, so
  Vitest must be added during implementation. No test or UI library is installed yet.

## Assumptions

- No network, database, or persisted state is needed, consistent with FR-010 and the
  assumptions in the spec.
- The monetary value remains numeric in domain; two-decimal presentation belongs to
  `formateadorMoneda` and must not affect calculation precision.
- The spec does not name a currency. The implementation should keep that choice inside
  the presentation formatter; the task phase should use the project locale/currency
  explicitly if confirmed by the user or existing product context.