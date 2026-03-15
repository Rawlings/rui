# ADR-002: State and Command Boundary Narrowing

- Status: proposed
- Date: 2026-03-15
- Owners: architecture working group
- Related skill: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`
- Related backlog stream: Stream B

## Context

State query and mutation surfaces are broad, and features depend on oversized shared context contracts.

## Decision

Introduce domain-focused APIs for selection, elements, layers, and tool state, and migrate consumers incrementally.

## Alternatives Considered

1. Keep broad contexts and add conventions only.
2. Switch directly to a new store implementation in one migration.
3. Introduce narrow APIs with adapters and migrate feature by feature.

## Consequences

### Positive

- Reduced coupling across features.
- Better test seams for domain behavior.

### Negative

- Temporary adapter layer during migration.

### Neutral

- Existing context internals may remain initially behind adapters.

## Implementation Plan

1. Define domain API contracts.
2. Create adapters over existing context.
3. Migrate features incrementally and remove legacy command bag.

## Validation

1. Build/typecheck pass.
2. Selection/layering/property edit regressions covered.
3. Rollback by switching consumers back to adapter-backed legacy calls.
