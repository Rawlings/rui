# ADR-006: Cross-feature Dependency Guardrails

- Status: accepted
- Date: 2026-03-15
- Owners: architecture working group
- Related skill: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`
- Related backlog stream: Stream F
- Implementation status: incrementally adopted; see `.github/architecture/current-boundary-map.md`.

## Context

Feature internals are directly imported across module boundaries, creating hidden coupling and harder refactors.

## Decision

Enforce feature public API boundaries and progressively remove deep cross-feature internal imports.

## Alternatives Considered

1. Keep direct imports and document soft guidance.
2. Introduce lint-only restrictions immediately with broad exceptions.
3. Define public APIs and migrate callsites with time-boxed exceptions.

## Consequences

### Positive

- Lower coupling and clearer ownership.
- Easier parallel feature development.

### Negative

- Requires boundary map maintenance.

### Neutral

- Short-term exceptions may be required to keep delivery flow.

## Implementation Plan

1. Create feature boundary map and public exports.
2. Migrate one cross-feature dependency path.
3. Record and expire exceptions.

## Validation

1. Build/typecheck pass.
2. Review checklist confirms no new deep imports.
3. Rollback by temporarily restoring selected deep imports with explicit expiration notes.
