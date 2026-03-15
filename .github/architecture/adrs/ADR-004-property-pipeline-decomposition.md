# ADR-004: Property Metadata Pipeline Decomposition

- Status: proposed
- Date: 2026-03-15
- Owners: architecture working group
- Related skill: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`
- Related backlog stream: Stream D

## Context

Property metadata, control mapping, and hint generation are tightly coupled, making extension and testing costly.

## Decision

Split the property pipeline into explicit interfaces: metadata provider, control mapper, and hint provider.

## Alternatives Considered

1. Keep a single coordinator module with more comments/tests.
2. Move all logic into one large registry abstraction.
3. Decompose into contract-based pipeline layers.

## Consequences

### Positive

- Independent testability of pipeline stages.
- Lower risk when extending metadata/control families.

### Negative

- Additional interface and adapter code during transition.

### Neutral

- Existing mdn-data source remains unchanged.

## Implementation Plan

1. Define interfaces and adapters.
2. Route one property family through decomposed contracts.
3. Expand migration by family and delete legacy wiring.

## Validation

1. Build/typecheck pass.
2. Contract tests for mapping and hints pass.
3. Rollback by temporarily switching to legacy coordinator adapter.
