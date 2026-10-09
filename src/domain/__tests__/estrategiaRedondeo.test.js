import { describe, expect, it } from 'vitest'
import { aplicarRedondeo } from '../estrategiaRedondeo.js'
import { crearRedondeoExacto } from '../../data/redondeoExacto.js'
import { crearRedondeoHaciaArriba } from '../../data/redondeoHaciaArriba.js'

describe('contrato de estrategia de redondeo', () => {
  it('el redondeo exacto conserva el valor recibido', () => {
    const estrategia = crearRedondeoExacto()

    expect(estrategia.aplicar(3.333)).toBe(3.333)
  })

  it('el redondeo hacia arriba llega al entero siguiente si hay fracción', () => {
    const estrategia = crearRedondeoHaciaArriba()

    expect(estrategia.aplicar(3.333)).toBe(4)
  })

  it('el redondeo hacia arriba conserva un valor ya entero', () => {
    const estrategia = crearRedondeoHaciaArriba()

    expect(estrategia.aplicar(4)).toBe(4)
  })

  it('rechaza una dependencia que no cumple el contrato', () => {
    expect(() => aplicarRedondeo({}, 2)).toThrow(TypeError)
  })
})
