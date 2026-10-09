import { describe, expect, it, vi } from 'vitest'
import { calcularDivision } from '../src/domain/calcularDivision.js'
import { validarEntrada } from '../src/domain/validarEntrada.js'
import { crearRedondeoExacto } from '../src/data/redondeoExacto.js'
import { crearRedondeoHaciaArriba } from '../src/data/redondeoHaciaArriba.js'
import { casos } from '../src/test/casosDePrueba.js'

const estrategias = {
  exacto: crearRedondeoExacto(),
  arriba: crearRedondeoHaciaArriba(),
}

describe('división de cuenta según los casos definidos', () => {
  for (const caso of casos) {
    it(caso.nombre, () => {
      const campos = {
        monto: caso.monto,
        personas: caso.personas,
        propinaPorcentaje: caso.propina,
      }
      const validacion = validarEntrada(campos)
      const calcularEspiado = vi.fn(calcularDivision)

      if (caso.errorEsperado) {
        expect(validacion).toEqual({
          esValido: false,
          mensaje: caso.errorEsperado,
        })
        expect(calcularEspiado).not.toHaveBeenCalled()
        return
      }

      expect(validacion.esValido).toBe(true)
      const estrategia = estrategias[caso.modo]
      const resultado = calcularEspiado(validacion.cuenta, estrategia)

      expect(resultado.aporteIndividual).toBeCloseTo(caso.esperado, 2)
    })
  }
})

describe('sustitución de estrategias (LSP)', () => {
  it('usa el mismo calcularDivision con redondeoExacto y redondeoHaciaArriba', () => {
    const validacion = validarEntrada({
      monto: 10,
      personas: 3,
      propinaPorcentaje: 0,
    })

    const exacto = calcularDivision(
      validacion.cuenta,
      crearRedondeoExacto(),
    )
    const haciaArriba = calcularDivision(
      validacion.cuenta,
      crearRedondeoHaciaArriba(),
    )

    expect(exacto.aporteIndividual).toBeCloseTo(3.33, 2)
    expect(haciaArriba.aporteIndividual).toBe(4)
  })
})
