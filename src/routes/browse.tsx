import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/findit/Layout";
import { ItemCard } from "@/components/findit/ItemCard";
import { CATEGORIES, useItems } from "@/lib/items";

export const Route = createFileRoute("/browse")({
  head: () => ({ meta: [{ title: "Browse Lost & Found Items – FindIt" }, { name: "description", content: "Search and filter every lost and found item reported on campus." }, { property: "og:title", content: "Browse Lost & Found Items – FindIt" }, { property: "og:description", content: "Search and filter every lost and found item reported on campus." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Browse,
});

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"}`;

function Browse() {
  const items = useItems();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [status, setStatus] = useState<"all" | "lost" | "found" | "claimed">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const list = useMemo(() => {
    const term = q.toLowerCase().trim();
    return items
      .filter((i) => cat === "All" || i.category === cat)
      .filter((i) => status === "all" || (status === "claimed" ? i.claimed : i.status === status && !i.claimed))
      .filter((i) => !term || [i.name, i.description, i.location, i.category].some((f) => f.toLowerCase().includes(term)))
      .sort((a, b) => (sort === "newest" ? 1 : -1) * (b.date.localeCompare(a.date) || b.createdAt - a.createdAt));
  }, [items, q, cat, status, sort]);

  const dirty = q || cat !== "All" || status !== "all" || sort !== "newest";
  const clear = () => { setQ(""); setCat("All"); setStatus("all"); setSort("newest"); };

  return (
    <PageShell>
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Browse items</h1>
          <p className="mt-2 text-muted-foreground">{items.length} listings across campus</p>
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, description or location…"
              className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["All", ...CATEGORIES].map((c) => <button key={c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>)}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(["all", "lost", "found", "claimed"] as const).map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={chip(status === s) + " capitalize"}>{s === "all" ? "All status" : s}</button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
              className="ml-auto rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm outline-none">
              <option value="newest">Newest first</option><option value="oldest">Oldest first</option>
            </select>
            {dirty && <Button variant="ghost" size="sm" onClick={clear}><X /> Clear filters</Button>}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-5 text-sm text-muted-foreground">Showing {list.length} result{list.length === 1 ? "" : "s"}</p>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((i) => <ItemCard key={i.id} item={i} />)}</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No items match your search</h3>
            <p className="mt-1 text-muted-foreground">Try different keywords or clear the filters.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="glass" onClick={clear}>Clear filters</Button>
              <Button asChild variant="hero"><Link to="/report-lost">Report a lost item</Link></Button>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
