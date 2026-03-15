import type { ReactNode } from 'react'

interface SideRailProps {
  side: 'left' | 'right'
  width: number
  children: ReactNode
  contentClassName?: string
}

export function SideRail({ side, width, children, contentClassName }: SideRailProps) {
  const sideClass = side === 'left' ? 'left-0' : 'right-0'

  return (
    <aside className={`fixed ${sideClass} top-0 bottom-0 z-30`} style={{ width }}>
      <div className="flex h-full flex-col rounded-none border-0 bg-[var(--surface-card)] shadow-xl">
        <div className={`min-h-0 flex-1 overflow-y-auto bg-[var(--surface-card)] ${contentClassName ?? 'px-4 pt-4 pb-4'}`}>
          {children}
        </div>
      </div>
    </aside>
  )
}
