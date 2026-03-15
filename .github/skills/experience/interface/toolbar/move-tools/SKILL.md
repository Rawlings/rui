---
name: move-tools
description: Define move-tool behaviors for object manipulation and viewport navigation with predictable selection and resize ergonomics.
user-invocable: true
metadata:
  taxonomy: experience/interface/toolbar/move-tools
---

## Objectives

- Make selection and movement fast, predictable, and reversible.
- Separate object manipulation from viewport navigation to prevent accidental edits.
- Keep primary navigation tools clear and low-friction in the toolbar.

## Tool Set

- Move:
  - Default active tool on file open.
  - Select single or multiple objects.
  - Drag selection with axis constraints and snapping support.
- Hand:
  - Pan viewport only, never mutate object state.
  - Support pointer drag panning and touch panning.

## Resize Model

- Resize happens from selection handles while Move is active.
- Selection chrome exposes directional handles based on element capability.
- Resize must not require a dedicated toolbar mode.

## Toolbar Pattern

- Move and Hand are explicit toolbar actions.
- Move remains default active tool on open.
- Hand toggles viewport pan behavior without changing geometry.
- Selected styling reflects active tool deterministically.

## UX Behavior Model

- Move defaults:
  - Click empty canvas clears selection.
  - Click object selects it.
  - Drag selected object starts move after threshold to avoid jitter.
- Cursor and affordance:
  - Move: directional move cursor on draggable objects.
  - Hand: grab and grabbing cursor states.
  - Resize: visible corner and edge handles while selected in Move mode.

## Interaction Rules

- Ignore move or resize drag starts when pointer begins in text-edit mode.
- Use one history entry per completed drag or resize gesture.
- Keep selection stable when panning.
- If touch input is detected, hand panning must remain frictionless and non-selecting.
- Hand mode must never change selection when pressing existing elements.
- Move mode may select elements; creation modes must not steal selection from existing elements.

## Accessibility

- Announce active tool changes to assistive tech.
- Maintain visible focus style on toolbar buttons.

## Acceptance Criteria

- Move is active by default on open.
- Hand never changes selection or object geometry.
- Move and Hand are reachable directly from the toolbar.
- Resize in Move mode changes object dimensions consistently and creates clean undo boundaries.
