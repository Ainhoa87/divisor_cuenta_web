# Tasks: Dividir cuenta

**Input**: Design documents from `specs/001-dividir-cuenta/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`

**Tests**: Required by the constitution and the feature request. Use Vitest; acceptance criteria become executable tests.

## Phase 1: Setup

**Purpose**: Add the requested test runner to the existing Vite project.

- [ ] T001 Install the declared Vitest and React Testing Library dependencies, update `package-lock.json`, and verify the `test` scripts in `package.json` (installation pending by user direction)`
- [X] T002 Configure Vitest and React plugin reuse in `vite.config.js`

## Phase 2: Foundational

**Purpose**: Establish the shared UI-test setup required by both user stories.

- [X] T003 Create reusable React Testing Library setup and cleanup in `src/test/setup.js`

**Checkpoint**: Vitest can run JavaScript unit and React DOM tests before story implementation begins.

## Phase 3: User Story 1 - Calcular el aporte individual (Priority: P1) 🎯 MVP

**Goal**: Calculate and display the per-person contribution from a one-screen form, with exact or upward rounding.

**Independent Test**: Enter valid amount, people, and tip values; choose each rounding mode; submit; confirm the expected two-decimal contribution and that changing fields alone does not calculate.

### Tests for User Story 1

- [X] T004 [P] [US1] Add Vitest contract tests for `aplicar(valor)` exact and upward rounding, including an already-whole input, in `src/domain/__tests__/estrategiaRedondeo.test.js`
- [X] T005 [P] [US1] Add unit tests for total-with-tip division and injected rounding in `src/domain/__tests__/calcularDivision.test.js`
- [X] T006 [P] [US1] Add screen interaction tests for 27.50, 30.00, 3.33, and 4.00 after clicking `Calcular` in `src/presentation/__tests__/PantallaDivisor.test.jsx`

### Implementation for User Story 1

- [X] T007 [P] [US1] Define the account value shape and valid input fields in `src/domain/cuenta.js`
- [X] T008 [P] [US1] Define the individual contribution result shape in `src/domain/resultado.js`
- [X] T009 [P] [US1] Define the one-method `aplicar(valor)` rounding abstraction in `src/domain/estrategiaRedondeo.js`
- [X] T010 [P] [US1] Implement unchanged-value rounding in `src/data/redondeoExacto.js`
- [X] T011 [P] [US1] Implement `Math.ceil` rounding in `src/data/redondeoHaciaArriba.js`
- [X] T012 [US1] Implement validation for valid amount, positive integer people count, and non-negative tip in `src/domain/validarEntrada.js`
- [X] T013 [US1] Implement total-with-tip division and injected rounding in `src/domain/calcularDivision.js`
- [X] T014 [US1] Implement two-decimal amount formatting without changing domain values in `src/presentation/formateadorMoneda.js`
- [X] T015 [US1] Implement local form and outcome state with injected validation, calculation, and strategy dependencies in `src/presentation/useDivisor.js`
- [X] T016 [US1] Implement labeled inputs, rounding selection, explicit `Calcular` action, and result rendering in `src/presentation/PantallaDivisor.jsx`
- [X] T017 [US1] Instantiate concrete rounding strategies and compose the labeled strategy list and screen dependencies only in `src/main.jsx`

**Checkpoint**: All four numeric acceptance scenarios work from the single screen; no calculation occurs before explicit submission.

## Phase 4: User Story 2 - Corregir datos inválidos (Priority: P1)

**Goal**: Explain invalid values clearly and never leave a previous result visible for invalid current input.

**Independent Test**: Submit zero people, a non-numeric amount, and negative amount/tip values; confirm the appropriate validation message and no result, including after first calculating valid input.

**Dependency**: Requires the form and submission flow from US1; its invalid-input behavior is separately covered by unit and UI tests.

### Tests for User Story 2

- [X] T018 [P] [US2] Add validation tests for empty/non-numeric/negative amount, people below one, non-integer people, and invalid/negative tip in `src/domain/__tests__/validarEntrada.test.js`
- [X] T019 [P] [US2] Add UI tests for exact messages, rejected negative values, and hiding a previous result after invalid submission in `src/presentation/__tests__/PantallaDivisor.test.jsx`

### Implementation for User Story 2

- [X] T020 [US2] Return `Monto inválido` for empty or non-numeric amount and reject negative amount in `src/domain/validarEntrada.js`
- [X] T021 [US2] Return `Debe haber al menos una persona` for people below one and reject non-integer people in `src/domain/validarEntrada.js`
- [X] T022 [US2] Reject non-numeric or negative tip with a clear Spanish validation message in `src/domain/validarEntrada.js`
- [X] T023 [US2] Ensure invalid submission clears the prior result and renders validation feedback in `src/presentation/useDivisor.js` and `src/presentation/PantallaDivisor.jsx`

**Checkpoint**: Invalid input never calculates or displays a stale result, and required messages match the spec exactly.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verify that the assembled feature respects the offline requirement and project architecture.

- [X] T024 [P] Add a regression test confirming calculation works without network or persistence dependencies in `src/domain/__tests__/calcularDivision.test.js`
- [X] T025 Review imports and composition to confirm domain has no React/DOM dependencies and only `src/main.jsx` instantiates concrete strategies in `src/domain/`, `src/data/`, `src/presentation/`, and `src/main.jsx`
- [ ] T026 Run `npm test` and `npm run build` and resolve any feature-related failures in `package.json` and `src/` (build passed; test execution awaits the pending install)

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; establishes Vitest and its DOM test environment.
- **Foundational (Phase 2)**: Depends on Setup; blocks story tests that render React.
- **US1 (Phase 3)**: Depends on Foundational; delivers the numeric MVP.
- **US2 (Phase 4)**: Depends on US1's form/submission flow; adds separately tested invalid-input behavior.
- **Polish (Phase 5)**: Depends on both stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependency on another story.
- **US2 (P1)**: Starts after US1 because it extends the same form submission flow; validation logic and its outcomes receive isolated tests.

### Parallel Opportunities

- T004, T005, and T006 use different test files and can be authored in parallel after T001–T003.
- T007, T008, T009, T010, and T011 touch separate files and can be implemented in parallel after their tests are written.
- T018 and T019 touch separate test files and can be authored in parallel after US1.
- T025 can be reviewed independently of T024; T026 follows the feature changes.

## Parallel Example: User Story 1

```text
Task: T004 exact/upward strategy contract tests in src/domain/__tests__/estrategiaRedondeo.test.js
Task: T005 division unit tests in src/domain/__tests__/calcularDivision.test.js
Task: T006 accepted calculation screen tests in src/presentation/__tests__/PantallaDivisor.test.jsx
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundational phases.
2. Write US1 tests, then implement its domain, data, and presentation modules.
3. Validate all four numeric scenarios and explicit-submit behavior.
4. Add US2 invalid-input handling and tests.
5. Complete offline/architecture checks and run the test and build commands.

### Incremental Delivery

Deliver the valid calculation flow first as US1, then add US2 error handling and stale-result clearing. Both increments use the same screen and injected dependencies.
