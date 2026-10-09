# UI Contract: Dividir cuenta

## Screen

`PantallaDivisor` is the sole screen. It renders the amount, people count and tip inputs,
a choice between the exact and upward rounding strategies, a `Calcular` action, and the
current validation message or calculation result.

## User-visible behavior

- Editing fields does not calculate automatically; calculation occurs on `Calcular`.
- A valid submission displays one individual contribution with two decimal places.
- Exact rounding leaves the individual share unchanged before formatting.
- Upward rounding raises a fractional individual share to the next integer; an already
  whole value remains unchanged.
- An invalid submission displays its validation message and hides any result from the
  preceding successful submission.
- The screen and calculation require no network or database.

## Composition and dependency contract

`src/main.jsx` instantiates `redondeoExacto` and `redondeoHaciaArriba`, along with any
other concrete domain services, and provides a labeled strategy list to presentation.
`PantallaDivisor` renders the injected list and does not name concrete strategies.
`useDivisor` receives its dependencies; it does not import or instantiate concrete data
implementations.
`estrategiaRedondeo` defines `aplicar(valor)`; any implementation satisfying that
contract can be supplied without type checks.

## Accessibility and formatting

Each input has a visible, programmatically associated label. Validation feedback is
associated with the form and exposed as an alert/status message. `formateadorMoneda`
formats the numeric domain result to two decimals without a currency symbol because the
spec does not identify a currency or locale. It does not change domain values.
