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

El cronómetro continuo de 38:41 abarca la ejecución, la lectura de respuestas, la
validación de especificaciones y la revisión de pruebas. El tiempo efectivo de IA es la
suma de las nueve duraciones de iteración proporcionadas, no una lectura inferida del
cronómetro continuo.

### Ejecución técnica

- **Procesamiento efectivo de IA (suma exacta):** 1:05 + 1:12 + 0:55 + 0:59 + 10:04
  + 0:44 + 0:50 + 0:28 + 3:33 = **19:50 (1.190 segundos)**.
- **Última ejecución completa de Vitest:** 7,33 s; 38 pruebas aprobadas en 6 archivos.
- **Aceptación:** los seis casos de `src/test/casosDePrueba.js` pasan en Vitest.

## Reutilización de la spec y adaptación del plan

La `spec.md` actual coincide con la copia original del commit `5b8fea8`. Tanto
`git diff 5b8fea8 HEAD -- specs/001-dividir-cuenta/spec.md` como la comparación
`git diff --no-index` de esa copia con el archivo actual quedan vacíos (la comparación
no-index terminó con código 0). Por tanto, el contenido reutilizado es **100 %**, el
adaptado es **0 %** y el no reutilizado es **0 %**. `analisis_spec.md` separa el QUÉ del
CÓMO, aunque sus ejemplos de Flutter/Riverpod no aparecen en la spec que se compara;
la evidencia determinante aquí es el diff vacío de los archivos reales.

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