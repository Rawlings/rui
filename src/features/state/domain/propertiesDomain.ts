import { useCallback, useMemo } from 'react'
import type { Element } from '../../../core/types'
import { useEditorCommands, useEditorData } from '../context'

export function usePropertiesQueryDomain() {
  const { selectedElement } = useEditorData()

  return useMemo(
    () => ({ selectedElement }),
    [selectedElement]
  )
}

export function usePropertiesCommandDomain() {
  const { selectedElement } = useEditorData()
  const { updateElement } = useEditorCommands()

  const updateSelectedStyleProperty = useCallback(
    (cssProperty: string, value: Element['styles'][string]) => {
      if (!selectedElement) return

      const nextStyles = { ...selectedElement.styles }
      if (value === undefined || value === null) {
        delete nextStyles[cssProperty]
      } else {
        nextStyles[cssProperty] = value
      }

      updateElement(selectedElement.id, {
        styles: nextStyles
      })
    },
    [selectedElement, updateElement]
  )

  return useMemo(
    () => ({ updateSelectedStyleProperty }),
    [updateSelectedStyleProperty]
  )
}
