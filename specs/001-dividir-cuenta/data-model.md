# Data Model: Dividir cuenta

## Cuenta

Represents the parsed inputs for one calculation.

| Field | Type | Rules | Source |
|---|---|---|---|
| `monto` | number | Finite and greater than or equal to zero | Amount input |
| `personas` | integer | Greater than or equal to one | People input |
| `propinaPorcentaje` | number | Finite and greater than or equal to zero | Tip percentage input |

The selected rounding strategy is passed as a dependency to the calculation and is not
stored in the account entity.

## Resultado

Represents the individual share before presentation formatting.

| Field | Type | Rules |
|---|---|---|
| `aporteIndividual` | number | Total with tip divided by people, then transformed by the selected rounding strategy; finite and non-negative |

## Validation outcome

`validarEntrada` receives the raw values from form state and returns a discriminated
outcome: valid with a `Cuenta`, or invalid with a user-facing message. Required exact
messages are `Monto inválido` for an empty/invalid amount and `Debe haber al menos una
persona` for a people count below one. Negative amount/tip, invalid tip, or a non-integer
people count are rejected with a clear message. Invalid submission clears the currently
visible result.

## Calculation

For a valid account:

1. `totalConPropina = monto + monto * propinaPorcentaje / 100`.
2. `aporteSinRedondear = totalConPropina / personas`.
3. `aporteIndividual = estrategia.aplicar(aporteSinRedondear)`.

Presentation formats the resulting number to two decimal places. The rounding strategy
is applied to the share, not to the full bill.