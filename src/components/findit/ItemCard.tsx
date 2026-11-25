import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate, type Item } from "@/lib/items";

export function StatusBadge({ item }: { item: Item }) {
  if (item.claimed)
    return <span className="rounded-full border border-claimed/40 bg-claimed/15 px-2.5 py-1 text-xs font-semibold text-claimed">Claimed</span>;
  return item.status === "lost" ? (
    <span className="rounded-full border border-lost/40 bg-lost/15 px-2.5 py-1 text-xs font-semibold text-lost">Lost</span>
  ) : (
    <span className="rounded-full border border-found/40 bg-found/15 px-2.5 py-1 text-xs font-semibold text-found">Found</span>
  );
}

export function ItemCard({ item }: { item: Item }) {
  return (
    <Link to="/items/$id" params={{ id: item.id }}
      className="group card-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={item.image} alt={item.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 rounded-full bg-background/85 backdrop-blur-md"><StatusBadge item={item} /></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-primary-glow">{item.category}</span>
        <h3 className="mt-1 line-clamp-1 text-lg font-semibold">{item.name}</h3>
        <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /><span className="line-clamp-1">{item.location}</span></p>
          <p className="flex items-center gap-2"><Calendar className="h-4 w-4 shrink-0" />{formatDate(item.date)}</p>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow">
          View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
