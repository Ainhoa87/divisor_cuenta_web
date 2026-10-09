import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { calcularDivision } from '../src/domain/calcularDivision.js'
import { validarEntrada } from '../src/domain/validarEntrada.js'
import { PantallaDivisor } from '../src/presentation/PantallaDivisor.jsx'

const estrategias = [
  { id: 'exacto', etiqueta: 'Exacto', aplicar: (valor) => valor },
  { id: 'hacia-arriba', etiqueta: 'Hacia arriba', aplicar: Math.ceil },
]

function renderizarPantalla() {
  return render(
    <PantallaDivisor
      validarEntrada={validarEntrada}
      calcularDivision={calcularDivision}
      estrategias={estrategias}
    />,
  )
}

async function ingresarDatos({ monto, personas, propina }) {
  const usuario = userEvent.setup()
  await usuario.type(screen.getByLabelText('Monto total'), monto)
  await usuario.clear(screen.getByLabelText('Número de personas'))
  await usuario.type(screen.getByLabelText('Número de personas'), personas)
  await usuario.clear(screen.getByLabelText('Porcentaje de propina'))
  await usuario.type(screen.getByLabelText('Porcentaje de propina'), propina)
  await usuario.click(screen.getByRole('button', { name: 'Calcular' }))
}

describe('PantallaDivisor', () => {
  it('calcula 27.50 para 100, 4 personas y 10% de propina', async () => {
    renderizarPantalla()

    await ingresarDatos({ monto: '100', personas: '4', propina: '10' })

    expect(screen.getByRole('status').textContent).toBe('27.50')
  })

  it('muestra el error de cero personas y no presenta resultado numérico', async () => {
    renderizarPantalla()

    await ingresarDatos({ monto: '50', personas: '0', propina: '0' })

    expect(screen.getByRole('alert').textContent).toBe(
      'Debe haber al menos una persona',
    )
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('muestra el error para un monto no numérico', async () => {
    renderizarPantalla()

    await ingresarDatos({ monto: 'abc', personas: '4', propina: '0' })

    expect(screen.getByRole('alert').textContent).toBe('Monto inválido')
  })
})
