# ADR-003: Viewport and Interaction Unification

- Status: proposed
- Date: 2026-03-15
- Owners: architecture working group
- Related skill: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`
- Related backlog stream: Stream C

## Context

Viewport transforms and interaction state are distributed across hooks and components, increasing drift risk for drag/resize/text behavior.

## Decision

Create one transform boundary and one interaction state model that all pointer workflows consume.

## Alternatives Considered

1. Keep distributed logic and add utility helpers.
2. Consolidate transforms only and leave interaction state distributed.
3. Consolidate both transforms and interaction model.

## Consequences

### Positive

- Predictable gesture lifecycle.
- Lower risk of transform math divergence.

### Negative

- Requires coordinated updates across canvas interaction paths.

### Neutral

- Snapping internals can be migrated in phases.

## Implementation Plan

1. Define shared transform interface.
2. Define interaction state machine and handlers.
3. Migrate drag flow first, then resize/text flows.

## Validation

1. Build/typecheck pass.
2. Regression checklist for create/select/drag/resize/pan passes.
3. Rollback by preserving legacy handlers behind a feature flag during migration.
