import { formatearMoneda } from './formateadorMoneda.js'
import { useDivisor } from './useDivisor.js'

/**
 * Renderiza la pantalla única para capturar datos y mostrar validación o resultado.
 * Recibe dependencias abstractas, deja el estado local en `useDivisor` y no conoce
 * implementaciones concretas de `data`.
 * @param {{validarEntrada: Function, calcularDivision: Function, estrategias: Array}} props
 */
export function PantallaDivisor(props) {
  const {
    campos,
    actualizarCampo,
    estrategiaId,
    seleccionarEstrategia,
    resultado,
    mensaje,
    calcular,
  } = useDivisor(props)

  return (
    <main className="pagina">
      <section className="tarjeta" aria-labelledby="titulo">
        <p className="eyebrow">CUENTA COMPARTIDA</p>
        <h1 id="titulo">Divide la cuenta</h1>
        <p className="intro">Calcula cuánto aporta cada persona.</p>

        <form
          className="formulario"
          onSubmit={(evento) => {
            evento.preventDefault()
            calcular()
          }}
          aria-describedby={mensaje ? 'mensaje-error' : undefined}
          noValidate
        >
          <label htmlFor="monto">Monto total</label>
          <div className="campo-con-prefijo">
            <input
              id="monto"
              name="monto"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={campos.monto}
              onChange={(evento) => actualizarCampo('monto', evento.target.value)}
            />
          </div>

          <div className="fila-campos">
            <div className="grupo-campo">
              <label htmlFor="personas">Número de personas</label>
              <input
                id="personas"
                name="personas"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={campos.personas}
                onChange={(evento) =>
                  actualizarCampo('personas', evento.target.value)
                }
              />
            </div>

            <div className="grupo-campo">
              <label htmlFor="propina">Porcentaje de propina</label>
              <div className="campo-con-sufijo">
                <input
                  id="propina"
                  name="propinaPorcentaje"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={campos.propinaPorcentaje}
                  onChange={(evento) =>
                    actualizarCampo('propinaPorcentaje', evento.target.value)
                  }
                />
                <span aria-hidden="true">%</span>
              </div>
            </div>
          </div>

          <label htmlFor="redondeo">Modo de redondeo</label>
          <select
            id="redondeo"
            value={estrategiaId}
            onChange={(evento) => seleccionarEstrategia(evento.target.value)}
          >
            {props.estrategias.map(({ id, etiqueta }) => (
              <option key={id} value={id}>
                {etiqueta}
              </option>
            ))}
          </select>

          <button type="submit">Calcular</button>
        </form>

        {mensaje && (
          <p className="mensaje-error" id="mensaje-error" role="alert">
            {mensaje}
          </p>
        )}

        {resultado && (
          <section className="resultado" aria-label="Resultado del reparto">
            <p>Cada persona paga</p>
            <output role="status">{formatearMoneda(resultado.aporteIndividual)}</output>
          </section>
        )}
      </section>
    </main>
  )
}
