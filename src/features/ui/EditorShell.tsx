import type { ReactNode } from 'react'

interface EditorShellProps {
  children: ReactNode
}

export function EditorShell({ children }: EditorShellProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {children}
    </div>
  )
}
