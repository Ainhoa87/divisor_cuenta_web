/**
 * Tipo documental del contrato estructural de redondeo.
 * @typedef {Object} EstrategiaRedondeo
 * @property {(valor: number) => number} aplicar
 */

/**
 * Aplica una estrategia sin comprobar su clase concreta.
 * Recibe cualquier objeto que implemente `aplicar(valor)` y un valor finito;
 * devuelve el importe redondeado. Lanza TypeError si falta el método o el valor
 * no es finito, y RangeError si la estrategia devuelve un importe no válido.
 * @param {{aplicar: (valor: number) => number}} estrategia
 * @param {number} valor
 * @returns {number}
 */
export function aplicarRedondeo(estrategia, valor) {
  if (typeof estrategia?.aplicar !== 'function') {
    throw new TypeError('La estrategia debe implementar aplicar(valor)')
  }
  if (!Number.isFinite(valor)) {
    throw new TypeError('El valor que se redondea debe ser finito')
  }

  const resultado = estrategia.aplicar(valor)
  if (!Number.isFinite(resultado) || resultado < 0) {
    throw new RangeError('La estrategia debe devolver un número finito no negativo')
  }

  return resultado
}
