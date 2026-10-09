import { describe, expect, it } from 'vitest'
import { validarEntrada } from '../validarEntrada.js'

describe('validarEntrada', () => {
  it.each(['', '   ', 'abc'])('rechaza el monto %j', (monto) => {
    const resultado = validarEntrada({
      monto,
      personas: '2',
      propinaPorcentaje: '0',
    })

    expect(resultado).toEqual({ esValido: false, mensaje: 'Monto inválido' })
  })

  it('rechaza montos negativos', () => {
    const resultado = validarEntrada({
      monto: '-1',
      personas: '2',
      propinaPorcentaje: '0',
    })

    expect(resultado.esValido).toBe(false)
    expect(resultado.mensaje).toBe('El monto no puede ser negativo')
  })

  it.each(['0', '-1'])('requiere al menos una persona cuando recibe %s', (personas) => {
    const resultado = validarEntrada({
      monto: '50',
      personas,
      propinaPorcentaje: '0',
    })

    expect(resultado).toEqual({
      esValido: false,
      mensaje: 'Debe haber al menos una persona',
    })
  })

  it('rechaza una cantidad de personas que no es entera', () => {
    const resultado = validarEntrada({
      monto: '50',
      personas: '1.5',
      propinaPorcentaje: '0',
    })

    expect(resultado.esValido).toBe(false)
    expect(resultado.mensaje).toBe('El número de personas debe ser entero')
  })

  it.each(['abc', '-1'])('rechaza propina inválida o negativa: %s', (propinaPorcentaje) => {
    const resultado = validarEntrada({
      monto: '50',
      personas: '2',
      propinaPorcentaje,
    })

    expect(resultado.esValido).toBe(false)
    expect(resultado.mensaje).toBe(
      propinaPorcentaje === '-1'
        ? 'La propina no puede ser negativa'
        : 'Porcentaje de propina inválido',
    )
  })

  it('convierte campos válidos en una cuenta numérica', () => {
    expect(
      validarEntrada({
        monto: '100.00',
        personas: '4',
        propinaPorcentaje: '10',
      }),
    ).toEqual({
      esValido: true,
      cuenta: { monto: 100, personas: 4, propinaPorcentaje: 10 },
    })
  })
})
