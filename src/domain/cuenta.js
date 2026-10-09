/**
 * Crea la cuenta inmutable que consume el cálculo.
 * Recibe valores numéricos que ya fueron validados y devuelve su representación
 * de dominio; no valida ni formatea esos valores.
 * @param {{monto: number, personas: number, propinaPorcentaje: number}} valores
 * @returns {{monto: number, personas: number, propinaPorcentaje: number}}
 */
export function crearCuenta({ monto, personas, propinaPorcentaje }) {
  return Object.freeze({ monto, personas, propinaPorcentaje })
}
