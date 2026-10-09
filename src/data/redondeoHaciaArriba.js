/**
 * Crea la estrategia que eleva al entero siguiente solo si hay parte fraccionaria.
 * No lanza errores para números finitos, que son el contrato de entrada.
 * @returns {{aplicar: (valor: number) => number}}
 */
export function crearRedondeoHaciaArriba() {
  return Object.freeze({ aplicar: (valor) => Math.ceil(valor) })
}
