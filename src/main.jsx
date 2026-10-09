import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { calcularDivision } from './domain/calcularDivision.js'
import { validarEntrada } from './domain/validarEntrada.js'
import { crearRedondeoExacto } from './data/redondeoExacto.js'
import { crearRedondeoHaciaArriba } from './data/redondeoHaciaArriba.js'
import { PantallaDivisor } from './presentation/PantallaDivisor.jsx'

const estrategias = [
  {
    id: 'exacto',
    etiqueta: 'Exacto',
    ...crearRedondeoExacto(),
  },
  {
    id: 'hacia-arriba',
    etiqueta: 'Hacia arriba al entero siguiente',
    ...crearRedondeoHaciaArriba(),
  },
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantallaDivisor
      validarEntrada={validarEntrada}
      calcularDivision={calcularDivision}
      estrategias={estrategias}
    />
  </StrictMode>,
)
