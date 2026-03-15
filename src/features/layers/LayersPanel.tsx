import { useState } from 'react'
import { Tree } from 'primereact/tree'
import { useLayersCommandDomain, useLayersQueryDomain } from '../state'
import { PanelSearchInput, SideRail } from '../ui'
import { findLocation, treePt } from './layerUtils'
import { useLayerTree } from './useLayerTree'
import { LayerNode } from './LayerNode'

export function LayersPanel() {
  const { elements, selectedId } = useLayersQueryDomain()
  const { selectElement, moveLayer, reparentLayer } = useLayersCommandDomain()
  const [search, setSearch] = useState('')
  const { filteredNodes, expandedKeys, setExpandedKeys } = useLayerTree(elements, search)

  return (
    <SideRail side="left" width={340}>
      <PanelSearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search layers"
        className="mb-4 w-full"
      />

      <Tree
        value={filteredNodes}
        className="border-none"
        pt={treePt}
        selectionMode="single"
        selectionKeys={selectedId}
        metaKeySelection={false}
        onSelectionChange={(e) => selectElement(typeof e.value === 'string' ? e.value : null)}
        nodeTemplate={(node) => (
          <LayerNode node={node} selectedId={selectedId} onSelect={selectElement} onMove={moveLayer} />
        )}
        emptyMessage="No layers"
        dragdropScope={search.trim() ? undefined : 'driftless-layers'}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        onDragDrop={(event) => {
          const dragId = event.dragNode.key == null ? null : String(event.dragNode.key)
          if (!dragId) return
          const loc = findLocation(event.value, dragId)
          if (loc) reparentLayer(dragId, loc.parentId, loc.indexTopFirst)
        }}
      />
    </SideRail>
  )
}
