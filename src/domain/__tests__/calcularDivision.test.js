import { describe, expect, it, vi } from 'vitest'
import { calcularDivision } from '../calcularDivision.js'
import { crearCuenta } from '../cuenta.js'
import { crearRedondeoExacto } from '../../data/redondeoExacto.js'
import { crearRedondeoHaciaArriba } from '../../data/redondeoHaciaArriba.js'

const cuenta = (monto, personas, propinaPorcentaje = 0) =>
  crearCuenta({ monto, personas, propinaPorcentaje })

describe('calcularDivision', () => {
  it('suma la propina porcentual antes de dividir', () => {
    const resultado = calcularDivision(
      cuenta(100, 4, 10),
      crearRedondeoExacto(),
    )

    expect(resultado.aporteIndividual).toBe(27.5)
  })

  it('entrega la parte individual sin redondear a la estrategia inyectada', () => {
    const estrategia = { aplicar: vi.fn((valor) => valor) }

    calcularDivision(cuenta(10, 3), estrategia)

    expect(estrategia.aplicar).toHaveBeenCalledWith(10 / 3)
  })

  it('redondea el aporte individual hacia arriba después de dividir', () => {
    const resultado = calcularDivision(
      cuenta(10, 3),
      crearRedondeoHaciaArriba(),
    )

    expect(resultado.aporteIndividual).toBe(4)
  })

  it('calcula sin consultar servicios de red ni almacenamiento', () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)

    const resultado = calcularDivision(cuenta(90, 3), crearRedondeoExacto())

    expect(resultado.aporteIndividual).toBe(30)
    expect(fetch).not.toHaveBeenCalled()
  })
})
