<!--
Sync Impact Report
Version change: unversioned template → 1.0.0
Modified principles: template placeholders → SOLID (SRP, OCP, LSP, ISP, DIP)
Added sections: Architecture, Security, Quality and Testing, Rule of the Subject
Removed sections: none
Follow-up TODOs: original ratification date is unknown
-->
# Constitución del proyecto Divisor de Cuenta

## Core Principles

### I. Single Responsibility Principle (SRP)
Cada función o módulo tiene una sola razón de cambio. El cálculo no valida datos ni
formatea resultados; esas responsabilidades se mantienen separadas.

### II. Open/Closed Principle (OCP)
Agregar una regla de redondeo no obliga a editar los módulos existentes.

### III. Liskov Substitution Principle (LSP)
Cualquier implementación de la interfaz de redondeo puede sustituir a otra sin que
quien la usa tenga que preguntar de qué tipo es.

### IV. Interface Segregation Principle (ISP)
Las interfaces son pequeñas; ningún consumidor depende de funciones que no usa.

### V. Dependency Inversion Principle (DIP)
Presentation depende de abstracciones de domain y nunca de implementaciones concretas
de data.

## Arquitectura

- Las capas son `src/presentation`, `src/domain` y `src/data`.
- La regla de dependencia es `presentation → domain ← data`.
- `src/domain/` no importa React ni APIs del DOM; contiene JavaScript puro.
- `src/main.jsx` es el único lugar donde se instancian implementaciones concretas.

## Seguridad

Nunca se guardan secretos ni API keys en el repositorio.

## Calidad y pruebas

- Toda funcionalidad crítica tiene pruebas.
- Los criterios de aceptación de la spec se convierten en pruebas ejecutables.

## Regla de la materia

Toda función generada por el agente debe poder explicarla el estudiante: qué hace,
por qué existe, qué recibe, qué devuelve y qué errores produce.

## Governance

Las enmiendas a esta constitución se reflejan en este archivo. Al cambiarla, se
actualizan la versión y la fecha de última enmienda: cambios incompatibles a los
principios incrementan MAJOR; principios o secciones nuevos, o guía materialmente
ampliada, incrementan MINOR; aclaraciones sin cambio de significado incrementan
PATCH. Las revisiones del trabajo comprueban el cumplimiento de los principios,
las reglas de arquitectura, seguridad, pruebas y la regla de la materia aquí
establecidos.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): fecha original desconocida | **Last Amended**: 2026-10-09
