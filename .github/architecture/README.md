# Architecture Program

This directory operationalizes the editor architecture target state.

## Canonical Source

- Skill blueprint: `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md`

## Execution Artifacts

- ADR index and templates: `.github/architecture/adrs/README.md`
- Current boundary map: `.github/architecture/current-boundary-map.md`
- Feature public API map: `.github/architecture/feature-public-api-map.md`

## Program Rules

- Sequence work by dependency order from ADR decisions and boundary maps.
- Keep changes incremental and reversible.
- Every architecture stream records decisions in an ADR before broad rollout.
- Every refactor PR includes rollback notes and risk checks.

## Definition Of Progress

A stream is considered progressing when it has:

1. Boundary API introduced.
2. At least one production callsite migrated.
3. Legacy path marked for removal.
4. Follow-up tasks captured.

A stream is considered complete when:

1. Legacy path removed.
2. Build and typecheck pass.
3. ADR updated to final status.
4. Boundary and API maps reflect the finalized state.
