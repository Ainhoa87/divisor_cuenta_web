# Respuestas — Cuestionario final (Sección 8)

## P1. ¿Qué porcentaje de la spec se reutilizó intacto, se adaptó o no se reutilizó?

Se reutilizó intacto el **100 %** de `specs/001-dividir-cuenta/spec.md`; **0 %** necesitó
adaptación y **0 %** quedó sin reutilizar. La comparación con la copia de la spec en el
commit `5b8fea8` no muestra diferencias: `git diff 5b8fea8 HEAD --
specs/001-dividir-cuenta/spec.md` queda vacío, y `git diff --no-index` entre esa copia y
el archivo actual también terminó con código 0, que indica archivos idénticos. El
`analisis_spec.md` aplica la separación entre el QUÉ y el CÓMO, pero sus ejemplos de
Flutter/Riverpod no están en la spec real comparada. La adaptación tecnológica se hizo
en el plan.

El tiempo de sesión informado fue **38 min 41 s**, incluyendo ejecución, lectura de
respuestas, validación de especificaciones y revisión de pruebas. El procesamiento
efectivo sumado de las nueve iteraciones fue **19 min 50 s**. Son métricas distintas:
la primera es tiempo continuo de sesión y la segunda suma las duraciones comunicadas
para las iteraciones; ninguna cambia el resultado verificable del diff.

## P2. ¿Cómo se clasifica cada regla de la Constitution?

La Constitution Flutter original no está guardada en el repositorio. Para esta
comparación uso los principios Flutter que el usuario proporcionó al inicio de la
sesión como línea base, y los confronto con `.specify/memory/constitution.md`. La
clasificación se refiere al contenido y sentido, no a una coincidencia literal de
idioma o formato:

| Regla | Clasificación | Evidencia de línea base Flutter y Constitution actual |
|---|---|---|
| SRP | Idéntica | Línea base: «una función o módulo, una razón de cambio; el cálculo no valida ni formatea». Actual, I: la misma separación de responsabilidades. |
| OCP | Idéntica | Línea base: añadir una regla de redondeo no obliga a editar módulos existentes. Actual, II: el mismo requisito. |
| LSP | Idéntica | Línea base: cualquier implementación de redondeo sustituye a otra sin consulta de tipo. Actual, III: el mismo contrato. |
| ISP | Idéntica | Línea base: interfaces pequeñas, sin depender de funciones no usadas. Actual, IV: el mismo principio. |
| DIP | Adaptada en redacción | Línea base: presentation depende de abstracciones de domain, nunca de implementaciones concretas de data. Actual, V: el mismo límite; solo se presenta como principio numerado y conserva los nombres de capa. |
| Capas y dirección | Idéntica | Línea base: `src/presentation`, `src/domain`, `src/data` y `presentation -> domain <- data`. Actual, Arquitectura: mismas capas y flechas. |
| Dominio sin UI | Adaptada en redacción | Línea base: `src/domain/` no importa React ni DOM, JavaScript puro. Actual: misma prohibición y mismo lenguaje, con «APIs del DOM» como formulación. |
| Composición concreta en `src/main.jsx` | Idéntica | Línea base y actual dicen que ese archivo es el único que instancia implementaciones concretas. |
| Secretos/API keys | Idéntica | Línea base: nunca guardarlos en el repositorio. Actual, Seguridad: nunca se guardan en el repositorio. |
| Pruebas de funcionalidad crítica y aceptación | Idéntica | Línea base exige pruebas para lo crítico y convertir criterios de aceptación en pruebas ejecutables. Actual, Calidad y pruebas, conserva ambos requisitos. |
| Funciones explicables por el estudiante | Idéntica | Línea base enumera qué hace, por qué existe, qué recibe/devuelve y errores. Actual, Regla de la materia, conserva los mismos puntos. |
| Reemplazada | Ninguna identificada | No hay evidencia de una regla de la línea base que haya sido sustituida por una regla incompatible. La Constitution actual añade secciones de gobernanza y versionado; no las cuento como reemplazo de un principio de línea base. |

La redacción del archivo actual y el formato de principios son propios de la Constitution
React. No pude comparar contra un archivo histórico Flutter independiente porque no
existe en el árbol del repositorio; la línea base explícita disponible es la lista de
principios entregada en la conversación.

## P3. ¿Se modificó algún enunciado de la spec para React?

No. El diff de la spec original y la actual está vacío. Se pudo conservar porque la
spec define el comportamiento observable —datos, cálculo, redondeo, errores, escenarios
y funcionamiento offline—, mientras que el plan define cómo construirlo. El cambio de
Flutter/Dart a React/JavaScript, Vite, `useState` y Vitest pertenece al CÓMO y se refleja
en `plan.md`; no exige cambiar el QUÉ.

## P4. ¿Se mantuvieron los seis casos de aceptación?

Los seis fixtures React y sus resultados son:

| Caso | Entrada | Resultado React |
|---|---|---|
| Reparto normal | 100, 4 personas, 10 %, exacto | 27.50 |
| Sin propina | 90, 3 personas, 0 %, exacto | 30.00 |
| Cero personas | 50, 0 personas | `Debe haber al menos una persona` |
| Monto no numérico | monto `NaN` | `Monto inválido` |
| Redondeo exacto | 10, 3 personas, 0 % | 3.33 |
| Redondeo hacia arriba | 10, 3 personas, 0 % | 4.00 |

Estos son los valores y mensajes de `src/test/casosDePrueba.js`, alineados con los
escenarios correspondientes de `spec.md`; los seis casos pasan en Vitest. No se encontró
en el repositorio el archivo de casos o una salida de pruebas Flutter. Por eso no puedo
afirmar un diff directo entre dos archivos de fixtures Flutter y React. La equivalencia
funcional comprobable es que React implementa los mismos resultados y mensajes
especificados, sin cambiar sus valores.

## P5. ¿Qué partes del plan Flutter dejaron de tener sentido y cómo se adaptaron?

- **Widgets, `setState` y controlador Flutter:** el plan Flutter describía interfaz con
  widgets y estado/controlador de Flutter. En React se usan `PantallaDivisor.jsx`, el
  hook `useDivisor.js` que recibe dependencias y estado local `useState` para una sola
  pantalla.
- **`flutter_test` y comandos Flutter:** esas herramientas no prueban una aplicación
  React. El plan los reemplaza por Vitest; las interacciones de pantalla se verifican
  con Testing Library en jsdom. La ejecución registrada terminó con 38/38 pruebas en
  seis archivos, incluidos los seis fixtures de aceptación.
- **`lib/`, `.dart` y `main.dart`:** esa estructura corresponde a Dart/Flutter. El plan
  React organiza el código bajo `src/domain`, `src/data` y `src/presentation`, con
  JavaScript/JSX, y sitúa la composición concreta en `src/main.jsx`.
- **SDK y plataforma objetivo:** el Flutter SDK y la aplicación Flutter se sustituyen
  por el proyecto React/Vite y una SPA que corre en navegador.

El diff del plan frente al original Flutter conservado en `5b8fea8` tiene 64 líneas
 añadidas y 90 eliminadas. El registro cuenta además 14 adaptaciones semánticas; ambas
cifras describen unidades distintas.

## P6. ¿Qué artefacto fue más reusable y cuál menos reusable?

El artefacto más reusable fue **`spec.md`**: su diff con la copia original está vacío,
por lo que viajó intacta en un 100 %. Sus requisitos describen el resultado que debe
observar el usuario y se validan con los seis fixtures React y la suite Vitest.

El menos reusable fue **`plan.md`**: depende del framework, lenguaje, herramientas,
plataforma y estructura de archivos. Hubo que adaptar 14 unidades técnicas y el diff
registró +64/−90 líneas para pasar de Flutter/Dart, widgets, `flutter_test`, `lib/` y
`main.dart` a React/JSX, Vitest/Testing Library, `src/` y `src/main.jsx`. Aun así, el
plan conserva los requisitos de comportamiento procedentes de la spec.