import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Items" },
  { to: "/report-lost", label: "Report Lost" },
  { to: "/report-found", label: "Report Found" },
  { to: "/about", label: "About" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <Search className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
      </span>
      Find<span className="text-gradient">It</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">Lost Something? Let's Find It Together. A centralized lost-and-found platform for your campus.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/browse" className="hover:text-foreground">Browse Items</Link></li>
            <li><Link to="/report-lost" className="hover:text-foreground">Report Lost</Link></li>
            <li><Link to="/report-found" className="hover:text-foreground">Report Found</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Project</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About FindIt</Link></li>
            <li>SEC Project · 2026</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© 2026 FindIt – Campus Lost & Found System</div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
