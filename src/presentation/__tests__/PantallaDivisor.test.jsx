import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { calcularDivision } from '../../domain/calcularDivision.js'
import { validarEntrada } from '../../domain/validarEntrada.js'
import { PantallaDivisor } from '../PantallaDivisor.jsx'

const estrategias = [
  { id: 'exacto', etiqueta: 'Exacto', aplicar: (valor) => valor },
  { id: 'hacia-arriba', etiqueta: 'Hacia arriba', aplicar: Math.ceil },
]

const abrirPantalla = () =>
  render(
    <PantallaDivisor
      validarEntrada={validarEntrada}
      calcularDivision={calcularDivision}
      estrategias={estrategias}
    />,
  )

async function completarFormulario({ monto, personas, propina, modo = 'exacto' }) {
  const user = userEvent.setup()
  await user.clear(screen.getByLabelText('Monto total'))
  await user.type(screen.getByLabelText('Monto total'), monto)
  await user.clear(screen.getByLabelText('Número de personas'))
  await user.type(screen.getByLabelText('Número de personas'), personas)
  await user.clear(screen.getByLabelText('Porcentaje de propina'))
  await user.type(screen.getByLabelText('Porcentaje de propina'), propina)
  await user.selectOptions(screen.getByLabelText('Modo de redondeo'), modo)
  await user.click(screen.getByRole('button', { name: 'Calcular' }))
}

describe('PantallaDivisor: cálculos válidos', () => {
  it.each([
    [{ monto: '100.00', personas: '4', propina: '10' }, '27.50'],
    [{ monto: '90.00', personas: '3', propina: '0' }, '30.00'],
    [{ monto: '10.00', personas: '3', propina: '0' }, '3.33'],
    [
      { monto: '10.00', personas: '3', propina: '0', modo: 'hacia-arriba' },
      '4.00',
    ],
  ])('muestra $%s por persona', async (datos, esperado) => {
    abrirPantalla()

    await completarFormulario(datos)

    expect(screen.getByRole('status').textContent).toContain(esperado)
  })

  it('no calcula al editar; espera la acción explícita', async () => {
    const user = userEvent.setup()
    abrirPantalla()

    await user.type(screen.getByLabelText('Monto total'), '10')

    expect(screen.queryByRole('status')).toBeNull()
  })
})

describe('PantallaDivisor: entradas inválidas', () => {
  it('muestra el mensaje requerido para un monto no numérico y oculta el resultado', async () => {
    abrirPantalla()

    await completarFormulario({ monto: 'abc', personas: '2', propina: '0' })

    expect(screen.getByRole('alert').textContent).toBe('Monto inválido')
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('muestra el mensaje requerido cuando no hay personas', async () => {
    abrirPantalla()

    await completarFormulario({ monto: '50', personas: '0', propina: '0' })

    expect(screen.getByRole('alert').textContent).toBe(
      'Debe haber al menos una persona',
    )
    expect(screen.queryByRole('status')).toBeNull()
  })

  it.each([
    [{ monto: '-1', personas: '2', propina: '0' }, 'El monto no puede ser negativo'],
    [{ monto: '50', personas: '2', propina: '-1' }, 'La propina no puede ser negativa'],
  ])('rechaza valores negativos con un mensaje claro', async (datos, mensaje) => {
    abrirPantalla()

    await completarFormulario(datos)

    expect(screen.getByRole('alert').textContent).toBe(mensaje)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('oculta un resultado anterior cuando el nuevo cálculo es inválido', async () => {
    const user = userEvent.setup()
    abrirPantalla()

    await user.type(screen.getByLabelText('Monto total'), '90')
    await user.clear(screen.getByLabelText('Número de personas'))
    await user.type(screen.getByLabelText('Número de personas'), '3')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByRole('status').textContent).toBe('30.00')

    await user.clear(screen.getByLabelText('Número de personas'))
    await user.type(screen.getByLabelText('Número de personas'), '0')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert').textContent).toBe(
      'Debe haber al menos una persona',
    )
    expect(screen.queryByRole('status')).toBeNull()
  })
})
