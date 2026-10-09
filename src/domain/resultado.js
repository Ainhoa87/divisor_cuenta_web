/**
 * Crea el resultado de un reparto antes de formatearlo para la pantalla.
 * Recibe el aporte individual calculado y devuelve un objeto de dominio; el
 * formateo queda fuera de este módulo.
 * @param {number} aporteIndividual
 * @returns {{aporteIndividual: number}}
 */
export function crearResultado(aporteIndividual) {
  return Object.freeze({ aporteIndividual })
}
