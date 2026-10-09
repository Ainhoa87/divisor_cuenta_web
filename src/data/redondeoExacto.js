/**
 * Crea la estrategia exacta, que conserva la parte individual sin alterarla.
 * No lanza errores para números finitos, que son el contrato de entrada.
 * @returns {{aplicar: (valor: number) => number}}
 */
export function crearRedondeoExacto() {
  return Object.freeze({ aplicar: (valor) => valor })
}
