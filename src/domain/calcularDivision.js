import { crearResultado } from './resultado.js'
import { aplicarRedondeo } from './estrategiaRedondeo.js'

/**
 * Suma la propina, divide por persona y aplica la estrategia recibida.
 * Recibe una cuenta ya validada y una estrategia estructural con `aplicar(valor)`;
 * devuelve el aporte numérico individual. Lanza TypeError/RangeError si la
 * estrategia no cumple el contrato estructural.
 * @param {{monto: number, personas: number, propinaPorcentaje: number}} cuenta
 * @param {{aplicar: (valor: number) => number}} estrategia
 * @returns {{aporteIndividual: number}}
 */
export function calcularDivision(cuenta, estrategia) {
  const totalConPropina =
    cuenta.monto + (cuenta.monto * cuenta.propinaPorcentaje) / 100
  const aporteSinRedondear = totalConPropina / cuenta.personas
  const aporteIndividual = aplicarRedondeo(estrategia, aporteSinRedondear)

  return crearResultado(aporteIndividual)
}
