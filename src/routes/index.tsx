import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PackageSearch, Search, HeartHandshake, Quote, Layers, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/findit/Layout";
import { ItemCard } from "@/components/findit/ItemCard";
import { getStats, useItems } from "@/lib/items";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "FindIt – Campus Lost & Found System" }, { name: "description", content: "Lost something on campus? Report, search and recover belongings with FindIt." }, { property: "og:title", content: "FindIt – Campus Lost & Found System" }, { property: "og:description", content: "Lost something on campus? Report, search and recover belongings with FindIt." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

const testimonials = [
  { name: "Riya K.", role: "B.Com, 2nd Year", text: "Lost my ID card before exams and found it on FindIt within two hours. Lifesaver!" },
  { name: "Arjun S.", role: "B.Sc. CS, 3rd Year", text: "I found a laptop charger in the lab, posted it, and the owner messaged me the same evening." },
  { name: "Neha P.", role: "BA English, 1st Year", text: "So much better than the noticeboard. Clean, quick and easy to search." },
];

function Home() {
  const items = useItems();
  const s = getStats(items);
  const recent = [...items].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
  const stats = [
    { label: "Total Listings", value: s.total, icon: Layers, tone: "text-primary-glow" },
    { label: "Lost Items", value: s.lost, icon: AlertCircle, tone: "text-lost" },
    { label: "Found Items", value: s.found, icon: PackageSearch, tone: "text-found" },
    { label: "Recovered", value: s.recovered, icon: CheckCircle2, tone: "text-claimed" },
  ];
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute inset-0 bg-hero" />
        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-20 text-center sm:pt-28 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> Your campus lost & found, reimagined
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Lost Something?<br /><span className="text-gradient">Let's Find It Together.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            FindIt connects students who lost belongings with those who found them — one searchable place for every ID card, bottle and backpack on campus.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg"><Link to="/report-lost">Report Lost Item <ArrowRight /></Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/report-found">Report Found Item</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((st) => (
            <div key={st.label} className="card-hover rounded-2xl border border-border bg-card p-6 shadow-card">
              <st.icon className={`h-6 w-6 ${st.tone}`} />
              <p className="mt-4 text-4xl font-extrabold">{st.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div><h2 className="text-3xl font-bold tracking-tight">Recently reported</h2><p className="mt-2 text-muted-foreground">The latest items posted by students.</p></div>
          <Link to="/browse" className="hidden items-center gap-1 text-sm font-semibold text-primary-glow sm:flex">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{recent.map((i) => <ItemCard key={i.id} item={i} />)}</div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: PackageSearch, t: "Report your item", d: "Post a lost or found item in under a minute with a photo and location." },
            { icon: Search, t: "Browse and discover", d: "Search and filter listings by category, status and keywords." },
            { icon: HeartHandshake, t: "Reconnect with your belongings", d: "Contact the reporter and mark the item as claimed." },
          ].map((s, i) => (
            <div key={s.t} className="card-hover relative rounded-2xl border border-border bg-card p-8 shadow-card">
              <span className="absolute right-6 top-6 text-5xl font-extrabold text-muted">0{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow"><s.icon className="h-6 w-6 text-primary-foreground" /></span>
              <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">What students say</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Demo content · fictional testimonials</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <Quote className="h-6 w-6 text-primary-glow" />
              <blockquote className="mt-4 text-foreground/90">"{t.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-semibold">{t.name[0]}</span>
                <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
