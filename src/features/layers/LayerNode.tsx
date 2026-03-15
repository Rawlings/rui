import { useMemo, useRef } from 'react'
import { ContextMenu } from 'primereact/contextmenu'
import type { MenuItem } from 'primereact/menuitem'
import type { TreeNode } from 'primereact/treenode'
import type { Element } from '../../core/types'
import { LAYER_ICON } from './layerUtils'

interface Props {
  node: TreeNode
  selectedId: string | null | undefined
  onSelect: (id: string | null) => void
  onMove: (id: string, dir: 'front' | 'back') => void
}

export function LayerNode({ node, selectedId, onSelect, onMove }: Props) {
  const { element, label } = node.data as { element: Element; label: string }
  const isSelected = element.id === selectedId
  const menuRef = useRef<ContextMenu>(null)
  const menuModel = useMemo<MenuItem[]>(() => ([
    {
      label: 'Bring to front',
      icon: 'pi pi-angle-double-up',
      command: () => onMove(element.id, 'front')
    },
    {
      label: 'Send to back',
      icon: 'pi pi-angle-double-down',
      command: () => onMove(element.id, 'back')
    }
  ]), [element.id, onMove])

  return (
    <>
      <ContextMenu model={menuModel} ref={menuRef} />
      <div
        className="flex w-full items-center gap-2"
        onContextMenu={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onSelect(element.id)
          menuRef.current?.show(event)
        }}
      >
        <span className={`inline-flex h-5 w-5 items-center justify-center ${isSelected ? 'text-[var(--primary-color-text)]' : 'text-[var(--text-color-secondary)]'}`}>
          <i className={`${LAYER_ICON[element.type] ?? 'pi pi-pencil'} text-xs`} aria-hidden="true" />
        </span>
        <span className={`truncate text-sm ${isSelected ? 'font-semibold text-[var(--primary-color-text)]' : 'text-[var(--text-color)]'}`}>
          {label}
        </span>
        {element.locked && <i className={`pi pi-lock text-xs ${isSelected ? 'text-[var(--primary-color-text)]' : 'text-[var(--text-color-secondary)]'}`} aria-hidden="true" />}
        {element.hidden && <i className={`pi pi-eye-slash text-xs ${isSelected ? 'text-[var(--primary-color-text)]' : 'text-[var(--text-color-secondary)]'}`} aria-hidden="true" />}
      </div>
    </>
  )
}
