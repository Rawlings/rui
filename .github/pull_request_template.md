## Summary

- What changed and why?

## Architecture Checks

- [ ] I reviewed relevant guidance in `.github/skills/architecture/governance/target-state/editor-architecture/SKILL.md` and domain skills.
- [ ] No new deep cross-feature internal imports were introduced.
- [ ] State access remains at feature boundaries (no new multi-level prop threading for feature state/actions).
- [ ] Refactor changes removed dead paths and stale imports in the same change.
- [ ] Any temporary architecture exceptions are recorded in `.github/architecture/feature-public-api-map.md` with owner and expiry.

## Validation

- [ ] `npm run typecheck`
- [ ] `npm run build`

## ADR and Docs

- [ ] This change aligns with relevant ADRs in `.github/architecture/adrs/`.
- [ ] I updated architecture docs when boundaries or public APIs changed.
