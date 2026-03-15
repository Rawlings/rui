import { Link } from 'react-router-dom'
import { BookOpen, Globe, PenSquare } from 'lucide-react'

const resources = [
  {
    href: 'https://rawlings.github.io/rui/',
    text: 'RUI Live Site',
    icon: Globe,
  },
  {
    href: 'https://www.w3.org/TR/CSS/',
    text: 'CSS Specification',
    icon: BookOpen,
  },
]

export function WelcomePage() {
  return (
    <main className="min-h-screen bg-[var(--surface-ground)] text-[var(--text-color)]">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 px-4 py-10">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">RUI</h1>
          <p className="max-w-2xl text-[var(--text-color-secondary)]">
            Visual interface authoring with live canvas editing, metadata-driven CSS properties,
            and implementation-ready outcomes.
          </p>
        </header>

        <Link
          to="/editor"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary-color)] px-4 py-2 font-medium text-[var(--primary-color-text)] outline-offset-2 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-[var(--primary-color)]"
        >
          <PenSquare className="h-4 w-4" aria-hidden="true" />
          Open Editor
        </Link>

        <section className="w-full max-w-md rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 shadow-md">
          <p className="mb-3 text-sm text-[var(--text-color-secondary)]">Resources</p>
          <ul className="space-y-2">
            {resources.map(({ href, text, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[var(--primary-color)] hover:underline"
                >
                  <Icon
                    className="h-4 w-4 text-[var(--text-color-secondary)] group-hover:text-[var(--primary-color)]"
                    aria-hidden="true"
                  />
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
