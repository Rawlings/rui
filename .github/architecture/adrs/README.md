# Architecture Decision Records

This directory contains architecture decisions for the editor target-state migration.

## Status Vocabulary

- `proposed`: drafted and awaiting approval
- `accepted`: approved for implementation
- `superseded`: replaced by a newer ADR
- `rejected`: explored but not adopted

## ADR Template

Use `ADR-TEMPLATE.md` for every architecture stream.

## Index

- ADR-001 Runtime Shell Consolidation (accepted)
- ADR-002 State and Command Boundary Narrowing (accepted)
- ADR-003 Viewport and Interaction Unification (accepted)
- ADR-004 Property Metadata Pipeline Decomposition (accepted)
- ADR-005 Styling Entry and UI Primitive Governance (accepted)
- ADR-006 Cross-feature Dependency Guardrails (accepted)

## Implementation Evidence

- Current architecture realization is tracked in `.github/architecture/current-boundary-map.md`.
- Feature boundary contracts and temporary exceptions are tracked in `.github/architecture/feature-public-api-map.md`.
