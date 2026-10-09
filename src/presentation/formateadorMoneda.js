/**
 * Presenta el importe con exactamente dos decimales, sin alterar el valor de dominio.
 * La spec no determina una moneda ni un símbolo, así que devuelve solo el número
 * formateado. Lanza TypeError si recibe un valor no finito.
 * @param {number} valor
 * @returns {string}
 */
export function formatearMoneda(valor) {
  if (!Number.isFinite(valor)) {
    throw new TypeError('El importe debe ser un número finito')
  }

  return valor.toFixed(2)
}
