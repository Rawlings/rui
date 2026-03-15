import { useCallback, useMemo } from 'react'
import { useEditorCommands, useEditorData } from '../context'
import { usePropertiesCommandDomain } from './propertiesDomain'

export function useSelectionQueryDomain() {
  const { selectedId, selectedElement } = useEditorData()

  const hasSelection = Boolean(selectedId)
  const isLocked = Boolean(selectedElement?.locked)
  const isHidden = selectedElement?.styles?.display === 'none'

  return useMemo(
    () => ({
      selectedId,
      selectedElement,
      hasSelection,
      isLocked,
      isHidden,
    }),
    [
      selectedId,
      selectedElement,
      hasSelection,
      isLocked,
      isHidden,
    ]
  )
}

export function useSelectionCommandDomain() {
  const { selectedId, selectedElement } = useEditorData()
  const {
    duplicateSelectedElement,
    deleteSelectedElement,
    moveElementLayer,
    toggleSelectedLock,
  } = useEditorCommands()
  const { updateSelectedStyleProperty } = usePropertiesCommandDomain()

  const moveSelectionLayer = useCallback(
    (direction: 'front' | 'back') => {
      if (!selectedId) return
      moveElementLayer(selectedId, direction)
    },
    [moveElementLayer, selectedId]
  )

  const toggleSelectedVisibility = useCallback(() => {
    if (!selectedElement) {
      return
    }

    const currentlyHidden = selectedElement.styles?.display === 'none'
    updateSelectedStyleProperty('display', currentlyHidden ? undefined : 'none')
  }, [selectedElement, updateSelectedStyleProperty])

  return useMemo(
    () => ({
      duplicateSelectedElement,
      deleteSelectedElement,
      moveSelectionLayer,
      toggleSelectedLock,
      toggleSelectedVisibility,
    }),
    [
      duplicateSelectedElement,
      deleteSelectedElement,
      moveSelectionLayer,
      toggleSelectedLock,
      toggleSelectedVisibility,
    ]
  )
}
