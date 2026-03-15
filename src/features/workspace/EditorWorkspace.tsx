import { Toolbar } from '../toolbar'
import { Canvas } from '../canvas'
import { PropertiesPanel } from '../properties'
import { LayersPanel } from '../layers'
import { EditorProvider } from '../state'
import { EditorShell } from '../ui'

export function EditorWorkspace() {
  return (
    <EditorProvider>
      <EditorShell>
        <Canvas />
        <LayersPanel />
        <PropertiesPanel />
        <Toolbar />
      </EditorShell>
    </EditorProvider>
  )
}
