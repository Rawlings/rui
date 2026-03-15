# ADR-005: Styling Entry and UI Primitive Governance

- Status: accepted
- Date: 2026-03-15
- Owners: architecture working group
- Related skill: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`
- Related backlog stream: Stream E
- Implementation status: incrementally adopted; see `.github/architecture/current-boundary-map.md`.

## Context

Style entry ownership is duplicated and reusable UI patterns are not yet governed by a consistent primitive layer.

## Decision

Adopt one style entry owner and establish shared primitive conventions for panel/button/field interaction states.

## Alternatives Considered

1. Preserve dual style entries and rely on team discipline.
2. Consolidate style entry only, without primitive conventions.
3. Consolidate style entry and define reusable primitive conventions.

## Consequences

### Positive

- Cleaner styling ownership.
- More consistent interaction states across the shell.

### Negative

- Requires incremental migration of existing class patterns.

### Neutral

- PrimeReact variable sourcing remains the semantic color system.

## Implementation Plan

1. Select canonical style entry and mark duplicate deprecated.
2. Define primitive conventions and usage matrix.
3. Migrate high-traffic shell components first.

## Validation

1. Build/typecheck pass.
2. Visual checks for toolbar and side rails pass.
3. Rollback by preserving old class paths behind temporary toggles when needed.
