import { crearCuenta } from './cuenta.js'

/**
 * Convierte y valida los campos sin calcular ni presentarlos.
 * Recibe el objeto de cadenas del formulario y devuelve una cuenta numérica o un
 * mensaje de error en español. No lanza errores por entradas ordinarias inválidas.
 * @param {{monto: string, personas: string, propinaPorcentaje: string}} campos
 * @returns {{esValido: true, cuenta: object} | {esValido: false, mensaje: string}}
 */
export function validarEntrada(campos) {
  const montoTexto = String(campos.monto ?? '').trim()
  if (montoTexto === '') {
    return { esValido: false, mensaje: 'Monto inválido' }
  }

  const monto = Number(montoTexto)
  if (!Number.isFinite(monto)) {
    return { esValido: false, mensaje: 'Monto inválido' }
  }
  if (monto < 0) {
    return { esValido: false, mensaje: 'El monto no puede ser negativo' }
  }

  const personasTexto = String(campos.personas ?? '').trim()
  const personas = Number(personasTexto)
  if (personasTexto === '' || (Number.isFinite(personas) && personas < 1)) {
    return { esValido: false, mensaje: 'Debe haber al menos una persona' }
  }
  if (!Number.isFinite(personas)) {
    return { esValido: false, mensaje: 'Número de personas inválido' }
  }
  if (!Number.isInteger(personas)) {
    return { esValido: false, mensaje: 'El número de personas debe ser entero' }
  }

  const propinaTexto = String(campos.propinaPorcentaje ?? '').trim()
  if (propinaTexto === '') {
    return { esValido: false, mensaje: 'Porcentaje de propina inválido' }
  }

  const propinaPorcentaje = Number(propinaTexto)
  if (!Number.isFinite(propinaPorcentaje)) {
    return { esValido: false, mensaje: 'Porcentaje de propina inválido' }
  }
  if (propinaPorcentaje < 0) {
    return { esValido: false, mensaje: 'La propina no puede ser negativa' }
  }

  return {
    esValido: true,
    cuenta: crearCuenta({ monto, personas, propinaPorcentaje }),
  }
}
