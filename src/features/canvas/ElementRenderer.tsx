import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { Rnd } from 'react-rnd'
import type { Element } from '../../core/types'
import { useCanvasCommandDomain, useCanvasQueryDomain } from '../state'
import { computeSnap, type SnapRect } from './snapEngine'
import {
  canDragElement,
  canResizeElement,
  canSelectElementFromPointer,
  canShowElementSelectionChrome,
  resolveElementCursorClass,
} from './interactionMachine'
import type { CanvasInteractionEvent } from './interactionMachine'

interface DragSnapInput {
  x: number
  y: number
  width: number
  height: number
  id: string
  parentId?: string | null
}

interface ElementRendererProps {
  element: Element
  isSelected: boolean
  children?: ReactNode
  onInteractionSignal?: (event: CanvasInteractionEvent) => boolean
}

export function ElementRenderer({
  element,
  isSelected,
  children,
  onInteractionSignal,
}: ElementRendererProps) {
  const {
    activeTool,
    editingTextId,
    elements,
    viewportScale,
  } = useCanvasQueryDomain()
  const {
    selectElement,
    startTextEditing,
    stopTextEditing,
    updateElement,
    updateSnapGuides,
    clearSnapGuides,
  } = useCanvasCommandDomain()
  const textEditorRef = useRef<HTMLDivElement | null>(null)

  const elementCursorClass = resolveElementCursorClass(activeTool)
  const selectionOutlineClass = element.type === 'circle' ? 'rounded-full' : 'rounded-md'
  const textMode = String(element.styles.textMode ?? 'auto')
  const isEditingText = element.type === 'text' && editingTextId === element.id

  const left = Number(element.styles.left ?? 0)
  const top = Number(element.styles.top ?? 0)
  const width = element.styles.width ?? (element.type === 'text' ? 'auto' : 100)
  const height = element.styles.height ?? (element.type === 'text' ? 'auto' : 100)

  const canDrag = canDragElement(activeTool, isEditingText)
  const canResize = canResizeElement(activeTool, isEditingText)
  const isLocked = Boolean(element.locked)
  const guideRafRef = useRef<number | null>(null)
  const pendingDragRectRef = useRef<DragSnapInput | null>(null)
  const lastGuidesKeyRef = useRef('')

  const snapCandidates = useMemo<SnapRect[]>(() =>
    elements
      .filter((el) => el.id !== element.id && !el.hidden && !el.locked)
      .map((el) => ({
        id: el.id,
        left: Number(el.styles.left ?? 0),
        top: Number(el.styles.top ?? 0),
        width: Number(el.styles.width ?? 0),
        height: Number(el.styles.height ?? 0),
        parentId: el.parentId ?? null
      })), [elements, element.id])

  const guidesKey = (guides: Array<{ type: 'v' | 'h'; position: number }>) =>
    guides.map((guide) => `${guide.type}:${Math.round(guide.position)}`).join('|')

  const flushDragGuides = () => {
    const rect = pendingDragRectRef.current
    if (!rect) {
      return
    }

    const result = computeSnap(rect, snapCandidates)
    const key = guidesKey(result.guides)

    if (key !== lastGuidesKeyRef.current) {
      lastGuidesKeyRef.current = key
      updateSnapGuides(result.guides)
    }
  }

  const scheduleDragGuides = (rect: DragSnapInput) => {
    pendingDragRectRef.current = rect
    if (guideRafRef.current != null) {
      return
    }

    guideRafRef.current = window.requestAnimationFrame(() => {
      guideRafRef.current = null
      flushDragGuides()
    })
  }

  useEffect(() => {
    return () => {
      if (guideRafRef.current != null) {
        window.cancelAnimationFrame(guideRafRef.current)
      }
    }
  }, [])

  if (element.hidden) {
    return null
  }

  useEffect(() => {
    if (!isEditingText) {
      return
    }

    const node = textEditorRef.current
    if (!node) {
      return
    }

    node.focus()
    const selection = window.getSelection()
    if (!selection) {
      return
    }
    const range = document.createRange()
    range.selectNodeContents(node)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }, [isEditingText])

  const commitTextValue = () => {
    if (!isEditingText) {
      return
    }

    const node = textEditorRef.current
    const nextText = node?.innerText ?? ''
    updateElement(element.id, {
      styles: {
        ...element.styles,
        text: nextText.trim().length > 0 ? nextText : 'Text'
      }
    })
    stopTextEditing()
    onInteractionSignal?.({ type: 'TEXT_EDIT_END' })
  }

  return (
    <Rnd
      scale={viewportScale}
      size={{ width, height }}
      position={{ x: left, y: top }}
      disableDragging={!canDrag || isLocked}
      enableResizing={isSelected && canResize && !isLocked
        ? {
            bottomRight: true
          }
        : false}
      onMouseDown={(e) => {
        e.stopPropagation()

        const canSelect = canSelectElementFromPointer(activeTool, element.type === 'text')
        if (!canSelect) {
          return
        }

        selectElement(element.id)
      }}
      onDrag={(_, data) => {
        if (isLocked) return
        scheduleDragGuides({
          x: data.x,
          y: data.y,
          width: Number(width),
          height: Number(height),
          id: element.id,
          parentId: element.parentId ?? null
        })
      }}
      onDragStart={() => {
        if (!isLocked) {
          onInteractionSignal?.({ type: 'DRAG_START', elementId: element.id })
        }
      }}
      onDragStop={(_, data) => {
        if (isLocked) return

        if (guideRafRef.current != null) {
          window.cancelAnimationFrame(guideRafRef.current)
          guideRafRef.current = null
        }

        const result = computeSnap(
          { x: data.x, y: data.y, width: Number(width), height: Number(height), id: element.id, parentId: element.parentId ?? null },
          snapCandidates
        )
        clearSnapGuides()
        pendingDragRectRef.current = null
        lastGuidesKeyRef.current = ''
        updateElement(element.id, {
          styles: { ...element.styles, left: result.x, top: result.y }
        })
        onInteractionSignal?.({ type: 'DRAG_END' })
      }}
      onResizeStart={() => {
        if (!isLocked) {
          onInteractionSignal?.({ type: 'RESIZE_START', elementId: element.id, handle: 'bottomRight' })
        }
      }}
      onResizeStop={(_, __, ref, ___, position) => {
        if (isLocked) return
        const w = ref.offsetWidth
        const h = ref.offsetHeight
        const result = computeSnap(
          { x: position.x, y: position.y, width: w, height: h, id: element.id, parentId: element.parentId ?? null },
          snapCandidates
        )
        clearSnapGuides()
        updateElement(element.id, {
          styles: { ...element.styles, left: result.x, top: result.y, width: w, height: h }
        })
        onInteractionSignal?.({ type: 'RESIZE_END' })
      }}
      className="data-editor-element"
      style={{ zIndex: isSelected ? 3 : 1 }}
    >
      <div
        data-editor-element="true"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => {
          if (element.type !== 'text') {
            return
          }
          e.stopPropagation()
          const admitted = onInteractionSignal?.({ type: 'TEXT_EDIT_START', elementId: element.id }) ?? true
          if (!admitted) {
            return
          }
          startTextEditing(element.id)
        }}
        className={`relative h-full w-full ${elementCursorClass}`}
        style={{ ...element.styles, left: undefined, top: undefined, width: '100%', height: '100%' }}
      >
      {element.type === 'text' ? (
        <div
          ref={textEditorRef}
          contentEditable={isEditingText}
          suppressContentEditableWarning
          onMouseDown={(e) => {
            if (isEditingText) {
              e.stopPropagation()
            }
          }}
          onBlur={commitTextValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              commitTextValue()
            }
            if (e.key === 'Escape') {
              e.preventDefault()
              stopTextEditing()
              onInteractionSignal?.({ type: 'TEXT_EDIT_END' })
            }
          }}
          className={`${isEditingText ? 'pointer-events-auto select-text rounded-sm px-0.5 outline-2 outline-[var(--primary-color)] outline-offset-[-3px]' : 'pointer-events-none select-none'} whitespace-pre-wrap text-inherit ${textMode === 'fixed' ? 'h-full w-full overflow-hidden' : 'inline-block'}`}
        >
          {String(element.styles.text ?? 'Text')}
        </div>
      ) : null}

      {isSelected && canShowElementSelectionChrome(activeTool) && (
        <div
          className={`pointer-events-none absolute -inset-1 outline-2 outline-[var(--primary-color)] outline-offset-[-3px] ${selectionOutlineClass}`}
        />
      )}

      {isSelected && canShowElementSelectionChrome(activeTool) && !isEditingText && !isLocked && (
        <div
          className="absolute -bottom-2 -right-2 flex h-5 w-5 cursor-se-resize items-center justify-center rounded-full outline-2 outline-[var(--primary-color)] outline-offset-[-1px] bg-[var(--surface-0)] shadow-md"
          title="Resize"
          aria-label="Resize element"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-color)]" />
        </div>
      )}

      {children}
      </div>
    </Rnd>
  )
}