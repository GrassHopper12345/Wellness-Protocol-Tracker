import Link from 'next/link'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/protocols', label: 'Protocols' },
  { href: '/labs', label: 'Lab Results' },
  { href: '/notes', label: 'Notes' },
]

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-background h-screen flex flex-col">
      <div className="p-4 border-b">
        <span className="font-semibold text-sm">Protocol Tracker</span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
