---
name: react-patterns
description: Define React and TypeScript implementation patterns that preserve feature boundaries, reduce rerenders, and prevent architectural drift.
user-invocable: true
metadata:
  taxonomy: architecture/governance/implementation/react-patterns
---

## Objectives

- Keep React implementation aligned with feature boundaries and domain hook contracts.
- Reduce drift caused by ad hoc component composition and state flow shortcuts.
- Maintain predictable render behavior in interaction-heavy editor surfaces.

## Scope

Use this skill for React and TypeScript implementation decisions in:

- feature components
- custom hooks
- context or store adapters
- high-frequency interaction paths

## Boundary-First React Rules

- Consume shared editor state through feature domain hooks before touching raw context consumers.
- Keep feature internals private by default; consume sibling features through public feature entry files.
- Avoid passing feature state/actions through 3+ component levels; move access to boundary hooks.
- Keep presentational components focused on rendering and event forwarding, not orchestration.

## Component Patterns

- Keep component props domain-intent based (`selectedIds`, `onLayerMove`) instead of low-level plumbing props.
- Prefer small composition boundaries over one large component with mixed responsibilities.
- Keep one component responsible for one gesture ownership chain in pointer-heavy flows.
- For PrimeReact-based surfaces, use component props and PrimeReact CSS variables rather than custom CSS wrappers.

## Hook Patterns

- Encapsulate behavior in feature-local hooks (`useMarqueeSelection`, `useCanvasPanZoom`) instead of inline orchestration blocks.
- Use `useMemo` for derived collections and maps when they are reused by children or handlers.
- Use `useCallback` for command handlers passed to child components or event systems.
- Avoid premature memoization; add it when values are used in dependency-sensitive paths or measured hot paths.
- Keep hook outputs minimal and stable: expose only what callers need.

## Effects and Event Ownership

- Keep side effects explicit and reversible: add/remove listeners in one effect scope.
- Avoid duplicate global listeners for the same pointer lifecycle in multiple components.
- Keep coordinate transforms centralized and reused across handlers.
- Do not split one gesture intent across competing `mousedown`/`click` paths.

## TypeScript Contracts

- Prefer explicit event and command types over loose object shapes.
- Keep command APIs narrow and semantic at feature boundaries.
- Avoid `any` and unchecked type casts in interaction code; use typed adapters when required.
- Update types and callsites atomically during refactors.

## Anti-Patterns To Avoid

- Direct sibling feature deep imports.
- Ad hoc local state that duplicates boundary state.
- Render components mutating domain styles or data structures inline.
- Optional prop pyramids caused by feature state threading.
- Event-shape hacks for popup or overlay control when component APIs can be used directly.

## Acceptance Checklist

- React changes route through feature boundary hooks or feature public APIs.
- New components keep orchestration separate from presentational rendering.
- No new multi-level prop threading for feature state/actions.
- Interaction paths avoid duplicated global listeners and conflicting handlers.
- Typecheck and build pass after structural changes.

## When To Invoke This Skill

- Implementing or refactoring React components across features.
- Extracting or redesigning custom hooks.
- Reviewing rerender hotspots or event ownership drift.
- Updating context/store usage patterns in editor flows.
