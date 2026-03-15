# ADR-001: Runtime Shell Consolidation

- Status: accepted
- Date: 2026-03-15
- Owners: architecture working group
- Related skill: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`
- Related backlog stream: Stream A
- Implementation status: incrementally adopted; see `.github/architecture/current-boundary-map.md`.

## Context

The runtime shell and entry ownership are split across two application paths, increasing bootstrap duplication and routing ambiguity.

## Decision

Adopt one runtime shell ownership path and retire parallel shell bootstrap logic.

## Alternatives Considered

1. Keep dual shell paths and document ownership boundaries.
2. Consolidate only theming providers while preserving route split.
3. Fully consolidate shell and route composition into one runtime stack.

## Consequences

### Positive

- Clear bootstrap ownership.
- Simpler route composition and debugging.

### Negative

- Requires coordinated migration of route composition and shell wrappers.

### Neutral

- Existing UI behavior can remain unchanged during migration.

## Implementation Plan

1. Approve canonical shell owner.
2. Migrate one route path to canonical stack.
3. Remove obsolete shell artifacts after parity checks.

## Validation

1. Build/typecheck pass.
2. Route entry smoke tests succeed.
3. Rollback is possible by preserving interim adapter branch.
