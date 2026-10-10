# Bitácora de trabajo SDD — Deber 2 (React)

## Métricas del tiempo y validación

| Métrica | Flutter (laboratorio) | React (este deber) |
|---|---:|---:|
| Tiempo total de sesión, cronómetro continuo | No registrado | **38 min 41 s (00:38:41)** |
| Tiempo de procesamiento efectivo de la IA | No registrado | **19 min 50 s (00:19:50)** |
| Tiempo hasta primera versión que compila / pruebas | No registrado | No registrado por separado |
| Casos de aceptación de `casosDePrueba.js` aprobados | 6/6 (dato previo, sin fixtures Flutter conservados) | **6/6** |
| Suite Vitest completa | No registrado | **38/38 pruebas en 6 archivos** |
| Spec reutilizada sin cambios | — | **100 %; diff vacío** |
| Enunciados técnicos del plan adaptados | Flutter/Dart | **14 unidades semánticas** |
| Diff del plan frente al plan Flutter guardado | — | **64 líneas añadidas, 90 eliminadas** |

## Análisis de consistencia `/speckit-analyze`

Se ejecutó el análisis `/speckit-analyze` sobre el proyecto React, usando como
artefactos la `spec.md`, el `plan.md` y el `tasks.md` de
`specs/001-dividir-cuenta/`, además de la arquitectura implementada en `src/`.
La revisión confirmó que las decisiones React/Vite del plan derivan de la spec
reutilizada, que las 11 FR y los 4 SC con trabajo construible tienen cobertura en
tareas (15/15, **100 %**) y que los módulos implementados corresponden al diseño:
dominio JavaScript sin imports React/DOM, redondeos en `src/data/`, UI/estado en
`src/presentation/` y composición en `src/main.jsx`. Así se validó la coherencia
funcional entre spec, plan, tareas y arquitectura implementada, sin afirmar que los
artefactos estén libres de toda observación.

El análisis encontró **0 problemas críticos, 0 duplicaciones y 1 inconsistencia
MEDIUM de seguimiento**: T001 permanece pendiente con instalación «pending by user
direction», aunque las dependencias Vitest/Testing Library están instaladas; T026
también permanece pendiente y dice que la ejecución de pruebas espera instalación,
pero el registro de validación de esta bitácora consigna 38/38 pruebas y build exitoso.
Conviene reconciliar el estado/notas de esas dos tareas con la evidencia vigente. El
análisis fue de solo lectura; no se modificó `tasks.md`.

El cronómetro continuo de 38:41 abarca la ejecución, la lectura de respuestas, la
validación de especificaciones y la revisión de pruebas. El tiempo efectivo de IA es la
suma de las nueve duraciones de iteración proporcionadas, no una lectura inferida del
cronómetro continuo.

### Ejecución técnica

- **Procesamiento efectivo de IA (suma exacta):** 1:05 + 1:12 + 0:55 + 0:59 + 10:04
  + 0:44 + 0:50 + 0:28 + 3:33 = **19:50 (1.190 segundos)**.
- **Última ejecución completa de Vitest:** 7,33 s; 38 pruebas aprobadas en 6 archivos.
- **Aceptación:** los seis casos de `src/test/casosDePrueba.js` pasan en Vitest.

### Verificación técnica y convergencia (2026-10-09)

- **`/speckit-converge`:** ejecutado para el feature actual, después de la
  implementación. Se contrastaron los requisitos/criterios de `spec.md`, las
  decisiones técnicas de `plan.md`, las 26 tareas y la implementación de `src/`.
  No se encontró trabajo funcional pendiente: los flujos de cálculo, validación,
  redondeo, modo offline, separación de capas y composición están implementados.
- **Hallazgo de convergencia:** T001 y T026 seguían sin marcar y conservaban notas
  antiguas de instalación/pruebas pendientes, aunque esas acciones ya están
  verificadas. Por el contrato append-only de converge, no se editaron ni renumeraron
  tareas existentes; se añadió T027 en `Phase 6: Convergence` para reconciliar sus
  marcas/notas con la evidencia. Resultado: `tasks_appended`, **1 tarea
  documental/de seguimiento**, sin tareas nuevas de implementación funcional.
- **`npm test`:** éxito; Vitest informa **6 archivos y 38/38 pruebas aprobadas**.
  Pasan los seis fixtures de aceptación, las pruebas de contrato de redondeo
  (incluida la comprobación de compatibilidad/sustitución de estrategias) y las
  pruebas de pantalla para cálculo, acción explícita y validaciones.
- **`npm run build`:** éxito; Vite transformó 25 módulos y completó el build de
  producción sin errores (478 ms).
- **Import React en dominio:** `git grep "from 'react'" -- src/domain/` no devolvió
  coincidencias (código 1 de grep, interpretado como resultado limpio).
- **SOLID:** la Constitution React enumera explícitamente SRP, OCP, LSP, ISP y DIP
  en `Core Principles`.
- **Composición de estrategias:** en el código de producción, solo `src/main.jsx`
  invoca `crearRedondeoExacto()` y `crearRedondeoHaciaArriba()` y pasa las
  estrategias a presentation. Las instancias en `src/domain/__tests__/` son
  fixtures de pruebas para verificar el contrato, no composición de la aplicación.

## Reutilización de la spec y adaptación del plan

La `spec.md` actual coincide con la copia original del commit `5b8fea8`. Tanto
`git diff 5b8fea8 HEAD -- specs/001-dividir-cuenta/spec.md` como la comparación
`git diff --no-index` de esa copia con el archivo actual quedan vacíos (la comparación
no-index terminó con código 0). Por tanto, el contenido reutilizado es **100 %**, el
adaptado es **0 %** y el no reutilizado es **0 %**. `analisis_spec.md` separa el QUÉ del
CÓMO y clasifica los enunciados lógicos de la spec; la evidencia determinante del
reuso es el diff vacío de los archivos reales.

La comparación confirma que la `spec.md` React se mantuvo idéntica a la versión original
de Flutter: tuvo **100 % de reutilización y 0 % de adaptación**. Como no se modificó
ningún enunciado de la especificación, **no fue necesario realizar un commit separado
de cambios a la spec**. La separación estricta entre el **QUÉ** (comportamiento y
requisitos especificados) y el **CÓMO** (decisiones técnicas de React/Vite, registradas
en el plan) permitió reutilizarla directamente sin modificaciones.

### Trazabilidad del plan y las tareas React (sin volver a ejecutar specify)

Para el proyecto React/Vite, las etapas de planificación y generación de tareas se
aplicaron directamente sobre la especificación existente
`specs/001-dividir-cuenta/spec.md`. **No se volvió a ejecutar `/speckit-specify`**:
no se regeneró la spec ni se reescribieron sus criterios de aceptación. El plan refleja
las decisiones técnicas React/Vite; `tasks.md` desglosa ese plan en trabajo ejecutable.

La secuencia de artefactos es:

1. **Spec reutilizada:** `5b8fea8` (`spec kit + la misma spec del proyecto flutter`).
2. **Plan React adaptado:** `2273d05` (`plan y tareas para react (la spec no se toco)`),
   donde `plan.md` se actualiza para React/Vite.
3. **Tareas React:** `2273d05`, en el mismo commit de planificación, donde
   `tasks.md` se adapta al plan React.

El historial acredita el orden de versiones: la spec está en el commit anterior y
permanece intacta en el commit posterior, mientras `plan.md` y `tasks.md` se modifican
para React. El commit agrupa plan y tareas, por lo que no demuestra un orden de commit
separado entre esos dos archivos; el orden lógico del flujo es
**spec reutilizada → plan React → tareas derivadas del plan**.

### Umbral pedagógico del 30 %

El **30 %** mencionado en la guía es un umbral/criterio pedagógico específico de este
deber para reflexionar sobre la proporción de decisiones CÓMO frente al QUÉ. No es
una regla universal ni una métrica rígida de la industria, y tampoco define un mínimo
de reutilización. La reusabilidad observada aquí fue **100 % de la spec**, numéricamente
muy superior al 30 %; son medidas distintas, pues el 30 % se refiere a la clasificación
QUÉ/CÓMO y la reutilización se confirma con el diff idéntico.

### Evidencia directa del diff inicial Flutter → React

Se ejecutó el comando solicitado desde `divisor_cuenta_web`, con
`SPECIFY_FEATURE_DIRECTORY` establecido a `C:\Users\Eigenaar\divisor_cuenta_web\specs\001-dividir-cuenta`:

```powershell
git diff --no-index -- "..\divisor_cuenta\specs\001-dividir-cuenta\spec.md" "$env:SPECIFY_FEATURE_DIRECTORY\spec.md"
```

La salida no mostró diferencias y el código de salida fue **0**, que confirma que los
dos archivos son idénticos según Git. La primera ejecución literal no pudo resolver el
segundo operando porque la variable de entorno estaba vacía (`\spec.md`); al asignarla
a la carpeta del feature React y repetir el mismo comando, la comparación directa con
la spec Flutter vecina quedó vacía. Esta es evidencia del estado comparado ahora; el
comando por sí solo no fecha cuándo se hizo la copia inicial.

Para el conteo de **14 enunciados adaptados** se contaron unidades semánticas técnicas
que cambiaron de stack, no líneas refluídas por Markdown:

1. Resumen: Flutter/Dart se sustituyó por React/JavaScript.
2. Resumen: `setState` se sustituyó por `useState` y un hook con dependencias inyectadas.
3. Resumen: dominio Dart puro se sustituyó por JavaScript puro.
4. Resumen: `main.dart` se sustituyó por `src/main.jsx` como raíz de composición.
5. Contexto técnico: lenguaje y versión.
6. Dependencias: Flutter SDK/`flutter_test` se sustituyeron por React/Vite/Vitest.
7. Comandos y enfoque de pruebas se adaptaron a Vitest.
8. Plataforma Flutter se sustituyó por navegador y aplicación SPA.
9. Restricciones de capas, estado y dependencias se expresaron para React/JavaScript.
10. Revisión de arquitectura: dominio sin React ni APIs del DOM.
11. Revisión de composición: `src/main.jsx` instancia las estrategias concretas.
12. Revisión de pruebas: criterios de aceptación vinculados a pruebas ejecutables.
13. Árbol: `lib/*.dart` se sustituyó por las capas `src/` y módulos `.js`/`.jsx`.
14. Decisión estructural: controlador/widgets se sustituyeron por `useDivisor` y
    `PantallaDivisor` con estado local.

El diff del plan frente al plan Flutter guardado en `5b8fea8` registra **64 inserciones
 y 90 eliminaciones**. Es un conteo de líneas de Git; las 14 unidades anteriores son un
conteo semántico del registro y no equivalen entre sí.

## Registro de iteraciones y tiempos informados

| Iteración | Duración | Instrucción / resultado registrado |
|:--:|:--:|---|
| 1 | 1:05 | Crear la Constitution del proyecto |
| 2 | 1:12 | Planificar el feature activo |
| 3 | 0:55 | Generar tareas |
| 4 | 0:59 | Analizar coherencia |
| 5 | 10:04 | Implementar el feature |
| 6 | 0:44 | Corregir prueba de resultado anterior |
| 7 | 0:50 | Crear pruebas de dominio |
| 8 | 0:28 | Crear pruebas de pantalla |
| 9 | 3:33 | Consolidar bitácora y respuestas |
| **Total** | **19:50** | **Procesamiento efectivo de IA** |

## Tabla comparativa: Flutter vs. React

| Métrica | Flutter (laboratorio) | React (este deber) |
|---|---:|---:|
| Tiempo total de sesión | No registrado | 38:41 |
| Procesamiento efectivo de IA | No registrado | 19:50 (suma de duraciones informadas) |
| Iteraciones con tiempo informado | No registrado | 9 |
| Líneas de código escritas a mano | No registrado | No medido |
| Spec modificada | — | 0 %; diff vacío |
| Unidades semánticas adaptadas en el plan | Flutter/Dart | 14 |
| Diff del plan | — | +64 / −90 líneas |
| Casos de aceptación de React aprobados | No hay fixtures Flutter para comparación directa | **6/6** |
| Suite Vitest | No registrado | **38/38 en 6 archivos** |

## Evidencia y límites de comparación

El repositorio contiene la spec, el plan original Flutter en el commit `5b8fea8`, el
plan React actual, la Constitution React y los seis fixtures React. No contiene un
archivo de Constitution Flutter ni los fixtures de pruebas Flutter. Por eso se puede
verificar directamente la identidad de la spec y la adaptación del plan, pero la
comparación caso por caso de los resultados Flutter solo puede afirmarse respecto de
los escenarios de la spec, no de una ejecución Flutter archivada.
