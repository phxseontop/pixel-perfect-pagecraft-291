import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Tag, User, Mail, Phone, CheckCircle2, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/findit/Layout";
import { StatusBadge } from "@/components/findit/ItemCard";
import { deleteItem, formatDate, setClaimed, useItems } from "@/lib/items";

export const Route = createFileRoute("/items/$id")({
  head: () => ({ meta: [{ title: "Item Details – FindIt" }, { name: "description", content: "View details and contact information for a lost or found campus item." }, { property: "og:title", content: "Item Details – FindIt" }, { property: "og:description", content: "View details and contact information for a lost or found campus item." }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Details,
});

function Details() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const item = useItems().find((i) => i.id === id);

  if (!item)
    return (
      <PageShell>
        <div className="mx-auto max-w-md py-32 text-center">
          <h1 className="text-2xl font-bold">Item not found</h1>
          <p className="mt-2 text-muted-foreground">This listing may have been removed.</p>
          <Button asChild variant="hero" className="mt-6"><Link to="/browse">Back to Browse</Link></Button>
        </div>
      </PageShell>
    );

  const toggleClaim = () => {
    setClaimed(item.id, !item.claimed);
    toast.success(item.claimed ? "Listing re-opened" : "Marked as claimed — great news! 🎉");
  };
  const remove = () => {
    if (!confirm("Delete this listing permanently?")) return;
    deleteItem(item.id);
    toast.success("Listing deleted");
    navigate({ to: "/browse" });
  };
  const row = "flex items-center gap-3 text-sm";

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to Browse</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 animate-in fade-in duration-500">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <StatusBadge item={item} />
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{item.name}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-5">
              <p className={row}><Tag className="h-4 w-4 text-primary-glow" />{item.category}</p>
              <p className={row}><MapPin className="h-4 w-4 text-primary-glow" />{item.status === "lost" ? "Last seen at " : "Found at "}{item.location}</p>
              <p className={row}><Calendar className="h-4 w-4 text-primary-glow" />{item.status === "lost" ? "Lost on " : "Found on "}{formatDate(item.date)}</p>
            </div>
            <div className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold">Contact {item.status === "lost" ? "owner" : "finder"}</h2>
              <p className={row}><User className="h-4 w-4 text-muted-foreground" />{item.contactName}</p>
              <a href={`mailto:${item.email}?subject=${encodeURIComponent("FindIt: " + item.name)}`} className={row + " hover:text-primary-glow"}><Mail className="h-4 w-4 text-muted-foreground" />{item.email}</a>
              <a href={`tel:${item.phone}`} className={row + " hover:text-primary-glow"}><Phone className="h-4 w-4 text-muted-foreground" />{item.phone}</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant={item.claimed ? "glass" : "hero"} size="lg" onClick={toggleClaim}>
                {item.claimed ? <><RotateCcw /> Mark as unclaimed</> : <><CheckCircle2 /> {item.status === "found" ? "Claim this item" : "Mark as recovered"}</>}
              </Button>
              <Button variant="destructive" size="lg" className="rounded-xl" onClick={remove}><Trash2 /> Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
