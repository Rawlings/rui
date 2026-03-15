import type { ReactNode } from 'react'

interface PanelEmptyStateProps {
  children: ReactNode
  className?: string
}

export function PanelEmptyState({ children, className }: PanelEmptyStateProps) {
  return (
    <p className={className ?? 'text-sm text-[var(--text-color-secondary)]'}>
      {children}
    </p>
  )
}
