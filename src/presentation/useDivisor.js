import { useState } from 'react'

/**
 * Administra los campos y el resultado de una única pantalla.
 * Recibe validación, cálculo y estrategias por inyección; devuelve estado y acciones
 * para que el componente presente el flujo. Los errores de campos se convierten
 * en mensajes, mientras los errores inesperados de dependencias se propagan.
 * @param {{validarEntrada: Function, calcularDivision: Function, estrategias: Array}} dependencias
 */
export function useDivisor({
  validarEntrada,
  calcularDivision,
  estrategias,
}) {
  const [campos, setCampos] = useState({
    monto: '',
    personas: '1',
    propinaPorcentaje: '0',
  })
  const [estrategiaId, setEstrategiaId] = useState(estrategias[0]?.id ?? '')
  const [resultado, setResultado] = useState(null)
  const [mensaje, setMensaje] = useState('')

  function actualizarCampo(nombre, valor) {
    setCampos((actuales) => ({ ...actuales, [nombre]: valor }))
  }

  function calcular() {
    setResultado(null)
    setMensaje('')

    const validacion = validarEntrada(campos)
    if (!validacion.esValido) {
      setMensaje(validacion.mensaje)
      return
    }

    const seleccionada = estrategias.find(({ id }) => id === estrategiaId)
    if (!seleccionada) {
      setMensaje('Seleccione un modo de redondeo')
      return
    }

    setResultado(calcularDivision(validacion.cuenta, seleccionada))
  }

  return {
    campos,
    actualizarCampo,
    estrategiaId,
    seleccionarEstrategia: setEstrategiaId,
    resultado,
    mensaje,
    calcular,
  }
}
