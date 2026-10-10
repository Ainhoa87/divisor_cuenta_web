# Análisis de la spec y de la Constitution (Flutter → React)

## 1. Clasificación por enunciados lógicos de la spec

La unidad de análisis es cada requisito funcional (`FR`) y cada escenario de
aceptación (`AC`) que se puede verificar por separado, más el caso límite de
eliminación de un resultado anterior. No se cuentan líneas físicas, títulos,
resúmenes ni criterios de éxito que agregan resultados ya cubiertos por los
requisitos y escenarios. Las situaciones de `Edge Cases` que repiten esos requisitos
no se cuentan una segunda vez.

- **QUÉ**: comportamiento o resultado observable del producto.
- **CÓMO**: tecnología, biblioteca o mecanismo concreto de implementación.
- **MIXTO**: combina un resultado del producto con una restricción de implementación.

| ID / enunciado lógico | Tipo | Justificación |
|---|---|---|
| FR-001 — Permitir ingresar monto, personas y porcentaje de propina | QUÉ | Define los datos que el usuario puede proporcionar, no el mecanismo de interfaz. |
| FR-002 — Permitir elegir redondeo exacto o hacia arriba | QUÉ | Define una opción de comportamiento observable sin imponer cómo implementarla. |
| FR-003 — Calcular solamente al tocar «Calcular» | QUÉ | Especifica cuándo ocurre la acción visible para el usuario. |
| FR-004 — Sumar la propina porcentual y dividir el total entre las personas | QUÉ | Expresa la regla de negocio del cálculo. |
| FR-005 — Mostrar dos decimales en modo exacto | QUÉ | Establece el resultado y formato observable. |
| FR-006 — Elevar al entero siguiente si hay fracción y mostrar dos decimales | QUÉ | Establece el comportamiento del redondeo y su presentación. |
| FR-007 — Rechazar menos de una persona con el mensaje indicado y sin resultado | QUÉ | Especifica validación, mensaje y estado visible. |
| FR-008 — Rechazar un monto vacío o no numérico con «Monto inválido» | QUÉ | Especifica validación y respuesta visible. |
| FR-009 — Rechazar monto o propina negativos | QUÉ | Especifica una regla de entrada de negocio. |
| FR-010 — Funcionar sin conexión y no depender de red ni base de datos | MIXTO | Combina el resultado offline deseado con una restricción sobre dependencias/arquitectura. |
| FR-011 — Presentar cálculo y validaciones en una sola pantalla | QUÉ | Es una condición de experiencia de usuario, independiente del framework. |
| AC-1.1 — 100.00, 4 personas, 10 %, exacto → 27.50 por persona | QUÉ | Comprueba un resultado concreto de la regla de negocio. |
| AC-1.2 — 90.00, 3 personas, 0 %, exacto → 30.00 por persona | QUÉ | Comprueba un resultado concreto de la regla de negocio. |
| AC-1.3 — 10.00, 3 personas, 0 %, exacto → 3.33 por persona | QUÉ | Comprueba la presentación del reparto fraccionario. |
| AC-1.4 — 10.00, 3 personas, 0 %, hacia arriba → 4.00 por persona | QUÉ | Comprueba el resultado observable del modo de redondeo. |
| AC-1.5 — Con valores válidos y sin Internet, obtener el mismo resultado | MIXTO | Define el resultado offline y restringe a la vez la dependencia de red. |
| AC-2.1 — Con monto 50.00 y 0 personas, mostrar el mensaje especificado y ningún resultado | QUÉ | Comprueba una respuesta visible ante entrada inválida. |
| AC-2.2 — Con monto «abc», mostrar «Monto inválido» y ningún resultado | QUÉ | Comprueba validación y mensaje. |
| AC-2.3 — Con monto o propina negativos, rechazar y no mostrar resultado | QUÉ | Comprueba el comportamiento ante valores fuera de rango. |
| Edge case — Tras un cálculo válido, una entrada inválida no debe dejar visible el resultado anterior | QUÉ | Es un comportamiento observable de estado, no una decisión de framework. |

### Conteo, distribución y umbral pedagógico

Cada fila FR, AC y Edge case de la tabla anterior cuenta como un enunciado lógico
individual; no se cuentan líneas físicas. El denominador es **20 enunciados**:
11 requisitos funcionales, 8 escenarios de aceptación y 1 caso límite no duplicado.

| Clasificación | Cantidad | Porcentaje |
|---|---:|---:|
| QUÉ | 18 | 90 % |
| CÓMO | 0 | 0 % |
| MIXTO | 2 | 10 % |
| **Total** | **20** | **100 %** |

El porcentaje de decisiones **CÓMO es 0 %**, por debajo del **umbral pedagógico del
30 %** indicado en la guía de este deber. Ese 30 % es un criterio específico para
reflexionar académicamente sobre la frontera QUÉ/CÓMO: **no es una regla universal,
una métrica rígida de la industria ni un mínimo de reutilización exigible**. La
reutilización se mide por separado: en esta migración fue **100 % de la spec**, un
resultado numéricamente muy superior al 30 %, aunque son métricas distintas y el 30 %
no es un umbral de reutilización. Los dos enunciados MIXTOS (10 %) incluyen
restricciones observables de operación offline, pero no especifican tecnología; por
eso no se cuentan como decisiones CÓMO.

La spec se reutilizó **100 % intacta**, con **0 % de adaptación** y **0 % sin
reutilizar**. La comparación directa de
`../divisor_cuenta/specs/001-dividir-cuenta/spec.md` y
`specs/001-dividir-cuenta/spec.md` produjo un diff vacío; además, la copia React
está en el commit `5b8fea8` y no se modificó después. Los elementos MIXTOS no
impidieron la reutilización: expresan la condición de operación offline y no
nombran Flutter, Dart, React, Vite ni una biblioteca. Las decisiones específicas del
stack React/Vite pertenecen al CÓMO y quedaron en el plan, no en la spec.

## 2. Evaluación independiente de la Constitution

Esta sección compara cada principio, regla de arquitectura, seguridad, pruebas,
regla de la materia, alcance, estándar y gobernanza de
`../divisor_cuenta/.specify/memory/constitution.md` (Flutter) con
`.specify/memory/constitution.md` (React). La clasificación se basa en el texto de
ambos archivos, no en la spec:

- **Idéntica**: conserva el mismo significado y alcance.
- **Adaptada en redacción**: conserva la intención, pero cambia la formulación o el
  nombre/ruta específico de la plataforma.
- **Reemplazada**: una regla de Flutter se cambió por una distinta para React o se
  retiró por ser específica de Flutter. Cuando React no declara una regla equivalente,
  se indica expresamente; la etiqueta no implica que exista una sustitución equivalente.

| Principio o regla | Clasificación | Evidencia Flutter → React y justificación |
|---|---|---|
| SRP — responsabilidad única | Adaptada en redacción | Flutter, **Principios fundamentales I**: «cada clase tendrá una sola razón de cambio» y el cálculo no validará ni formateará. React, **Core Principles I (SRP)**: «cada función o módulo» y el mismo deslinde de cálculo, validación y formato. Cambia clase por función/módulo, no la intención. |
| OCP — extender redondeo sin editar existentes | Adaptada en redacción | Flutter, **Principios fundamentales I (OCP)**: agregar redondeo no requiere editar «clases existentes». React, **Core Principles II (OCP)**: no obliga a editar «módulos existentes». El principio se conserva y se ajusta el elemento técnico nombrado. |
| LSP — sustituibilidad | Adaptada en redacción | Flutter, **Principios fundamentales I (LSP)**: una implementación sustituye a otra sin identificar el tipo. React, **Core Principles III (LSP)**: sustituye una implementación de la interfaz de redondeo sin preguntar el tipo. Se concreta la interfaz en el dominio React. |
| ISP — interfaces pequeñas | Adaptada en redacción | Flutter, **Principios fundamentales I (ISP)**: interfaces pequeñas y no depender de «métodos» no usados. React, **Core Principles IV (ISP)**: mismo límite, formulado como «funciones» no usadas. |
| DIP — dependencias de abstracciones | Idéntica | Flutter, **Principios fundamentales I (DIP)** y React, **Core Principles V (DIP)**: presentation depende de abstracciones de domain y no de implementaciones concretas de data. |
| Capas y dirección de dependencias | Adaptada en redacción | Flutter, **Principios fundamentales II (Arquitectura)**: `presentation`, `domain`, `data` y `presentation -> domain <- data`. React, **Architecture**: mismas capas y dirección con rutas `src/`. Se conserva la topología y cambia la raíz de archivos. |
| Dominio independiente de UI/framework | Adaptada en redacción | Flutter, **Principios fundamentales II**: `lib/domain/` es Dart puro y no importa `package:flutter`. React, **Architecture**: `src/domain/` es JavaScript puro y no importa React ni APIs del DOM. La frontera del dominio se conserva, adaptada al stack. |
| Raíz única de composición | Adaptada en redacción | Flutter, **Principios fundamentales II**: `main.dart` instancia concretos. React, **Architecture**: `src/main.jsx` es el único que instancia concretos. Mismo rol con archivo de entrada distinto. |
| Seguridad: no guardar secretos ni API keys | Idéntica | Flutter, **Principios fundamentales III (Seguridad)**: no guardarlos en el repositorio. React, **Seguridad**: la misma prohibición. |
| Pruebas para funcionalidad crítica | Idéntica | Flutter, **Principios fundamentales IV (Calidad y pruebas)**, primera oración; React, **Calidad y pruebas**, primer punto: toda funcionalidad crítica tiene pruebas. |
| Criterios de aceptación como pruebas ejecutables | Idéntica | Flutter, **Principios fundamentales IV**, segunda oración; React, **Calidad y pruebas**, segundo punto: los criterios de aceptación de la spec se convierten en pruebas ejecutables. |
| Explicabilidad de funciones para el estudiante | Idéntica | Flutter, **Principios fundamentales V (Regla de la materia)** y React, **Regla de la materia**: explicar qué hace la función, por qué existe, entradas, salidas y errores. |
| Alcance de aplicación Flutter de una pantalla | Reemplazada | Flutter, **Alcance del proyecto**: app Flutter de una pantalla. React no tiene sección de alcance equivalente en su Constitution; declara el nombre del proyecto, pero no vuelve a enunciar allí «una pantalla». El producto web de React se define en la spec, no se atribuye a la Constitution. |
| Null safety y tipo de lenguaje | Reemplazada | Flutter, **Estándares del proyecto**: null safety. React no declara regla equivalente en su Constitution; el requisito específico de Dart no se trasladó a JavaScript. |
| Nombres en español | Reemplazada | Flutter, **Estándares del proyecto**: nombres en español. React no formula una regla equivalente en su Constitution; no se infiere por los nombres que casualmente usa el código. |
| Restricción de paquetes externos | Reemplazada | Flutter, **Estándares del proyecto**: no agregar paquetes externos. React no conserva esa prohibición en su Constitution y su plan técnico contempla el stack React/Vite. La Constitution React no establece en su lugar una política general de dependencias. |
| Gobernanza de enmiendas y revisiones | Adaptada en redacción | Flutter, **Gobernanza**: registrar enmiendas y actualizar versión; MAJOR/MINOR/PATCH y revisión de conformidad/pruebas. React, **Governance**: mantiene versionado semántico y revisión, con redacción más explícita sobre fecha y alcance de cambios. |

**Resultado:** los cinco principios SOLID se conservan, cuatro con ajuste de
formulación/plataforma y DIP con el mismo significado. Seguridad, pruebas y
explicabilidad son idénticas. Arquitectura y gobernanza se adaptan; las reglas
específicas de Flutter que React no conserva quedan identificadas como reemplazadas
(retiradas/no trasladadas), no como equivalencias implícitas.
