# Respuestas — Cuestionario final (Sección 8)

## P1. ¿Qué porcentaje de la spec se reutilizó intacto, se adaptó o no se reutilizó?

Se reutilizó intacto el **100 %** de `specs/001-dividir-cuenta/spec.md`; **0 %** necesitó
adaptación y **0 %** quedó sin reutilizar. La comparación con la copia de la spec en el
commit `5b8fea8` no muestra diferencias: `git diff 5b8fea8 HEAD --
specs/001-dividir-cuenta/spec.md` queda vacío, y `git diff --no-index` entre esa copia y
el archivo actual también terminó con código 0, que indica archivos idénticos. Además,
se ejecutó la comparación directa solicitada con la spec Flutter vecina:

```powershell
git diff --no-index -- "..\divisor_cuenta\specs\001-dividir-cuenta\spec.md" "$env:SPECIFY_FEATURE_DIRECTORY\spec.md"
```

Con `SPECIFY_FEATURE_DIRECTORY` apuntando a
`C:\Users\Eigenaar\divisor_cuenta_web\specs\001-dividir-cuenta`, la salida fue vacía
y el código de salida fue **0**. Esto confirma que la spec Flutter y la spec React son
idénticas en la comparación ejecutada. La primera invocación, antes de definir esa
variable de entorno, falló al intentar abrir `\spec.md`; se corrigió la variable y se
repitió el comando con éxito. `analisis_spec.md` aplica la separación entre el QUÉ y el
CÓMO: la adaptación tecnológica pertenece al plan, no a los requisitos de la spec.
La separación estricta entre el **QUÉ** especificado y el **CÓMO** técnico de
React/Vite permitió reutilizar intacta la versión original de Flutter. Como no se adaptó
ningún enunciado, **no fue necesario un commit separado para modificar la spec**.

El **30 %** de la guía es un umbral/criterio pedagógico propio de este deber para
reflexionar sobre la frontera entre el **QUÉ** y el **CÓMO**; **no es una regla
universal ni una métrica rígida de la industria**, ni fija un mínimo de reutilización.
La reutilización real alcanzada fue **100 % de la spec**, numéricamente muy superior
al 30 %. Son medidas distintas: el umbral orienta el análisis QUÉ/CÓMO, mientras que
el porcentaje de reuso se verifica comparando ambas versiones de la spec.

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

## Ejecución de `/speckit-analyze`

Se ejecutó el análisis de alineación y consistencia `/speckit-analyze` sobre el proyecto
React. Se compararon `spec.md`, `plan.md`, `tasks.md` y la estructura implementada bajo
`src/`. La revisión confirmó que el plan técnico React/Vite parte de la spec reutilizada,
que las 11 FR y los 4 SC que requieren trabajo construible están vinculados a tareas
(15/15, **100 % de cobertura**) y que la arquitectura en `src/` corresponde al diseño:
dominio JavaScript sin React/DOM, estrategias de redondeo en data, presentación/estado
en presentation y composición en `src/main.jsx`.

Resultado: **0 críticos y 0 duplicaciones**, con **1 inconsistencia MEDIUM de estado de
tareas**. T001 dice que la instalación está pendiente por indicación del usuario aunque
las dependencias están instaladas; T026 sigue pendiente y afirma que la ejecución de
pruebas espera la instalación, mientras la bitácora registra 38/38 pruebas aprobadas y
build exitoso. Por ello, se confirmó la coherencia funcional de los cuatro artefactos,
pero queda por reconciliar esas marcas/notas de progreso. La revisión fue de solo
lectura y no modificó `tasks.md`.

## P3. ¿Se modificó algún enunciado de la spec para React?

No. El diff de la spec original y la actual está vacío. Se pudo conservar porque la
spec define el comportamiento observable —datos, cálculo, redondeo, errores, escenarios
y funcionamiento offline—, mientras que el plan define cómo construirlo. El cambio de
Flutter/Dart a React/JavaScript, Vite, `useState` y Vitest pertenece al CÓMO y se refleja
en `plan.md`; no exige cambiar el QUÉ. Por tanto, la spec tuvo **100 % de reutilización
y 0 % de adaptación**, y no fue necesario hacer un commit separado de modificación de
la especificación. La separación estricta entre el QUÉ y el CÓMO es precisamente lo que
permitió esta reutilización directa sin cambios.

### Trazabilidad del plan y las tareas para React

El `plan.md` y el `tasks.md` de React/Vite se generaron mediante las etapas de
planificación y tareas aplicadas directamente a la spec existente
`specs/001-dividir-cuenta/spec.md`. **En ningún momento se volvió a ejecutar
`/speckit-specify`** para React; por tanto, no se regeneró la especificación ni se
reescribieron sus criterios de aceptación iniciales.

La trazabilidad de versiones queda en este orden:

1. `spec.md` reutilizada, registrada en `5b8fea8` (`spec kit + la misma spec del
   proyecto flutter`).
2. `plan.md` adaptado a React/Vite y `tasks.md` derivado de ese plan, actualizados en
   `2273d05` (`plan y tareas para react (la spec no se toco)`).

La spec permanece sin cambios entre ambos commits. El segundo commit agrupa el plan y
las tareas: respalda que ambos son posteriores a la spec y específicos de React, aunque
no registra un commit separado que establezca el orden temporal interno entre esos dos
artefactos. La secuencia del proceso fue **spec reutilizada → plan React → tareas
generadas a partir del plan**.

### Verificación técnica y convergencia

Se ejecutó `/speckit-converge` después de implementar el feature. La revisión de la
spec, el plan, las tareas y `src/` no encontró trabajo funcional pendiente. Identificó
una discrepancia de seguimiento: T001 y T026 seguían pendientes con notas antiguas,
por lo que se agregó T027 en `Phase 6: Convergence`, sin reescribir tareas existentes.

Las verificaciones registradas para el proyecto React fueron:

- `npm test`: **38/38 pruebas aprobadas en 6 archivos**, incluidos los seis casos
  funcionales, el contrato de estrategias de redondeo/sustitución y las pruebas de
  pantalla.
- `npm run build`: **éxito**, 25 módulos transformados por Vite, sin errores.
- `git grep "from 'react'" -- src/domain/`: **sin coincidencias**, como requiere el
  límite de dependencias del dominio.
- La Constitution React incluye **SRP, OCP, LSP, ISP y DIP**.
- En el código de producción, `src/main.jsx` es el único lugar que crea las
  estrategias concretas de redondeo y las inyecta en presentation. Las creaciones
  encontradas en pruebas son fixtures para probar el contrato.

Estos datos se alinean con el registro técnico de `bitacora.md`; las pruebas/build
describen la ejecución validada y T027 conserva como seguimiento la reconciliación de
los estados antiguos de T001/T026.

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
