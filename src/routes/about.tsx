import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Lightbulb, School, Users, Bell, ShieldCheck, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/findit/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About FindIt – Campus Lost & Found" }, { name: "description", content: "Why FindIt exists, how it helps students and what's coming next." }, { property: "og:title", content: "About FindIt – Campus Lost & Found" }, { property: "og:description", content: "Why FindIt exists, how it helps students and what's coming next." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: About,
});

const block = "rounded-2xl border border-border bg-card p-7 shadow-card";

function About() {
  return (
    <PageShell>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 pb-12 pt-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About <span className="text-gradient">FindIt</span></h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">FindIt is a centralized lost-and-found platform built for college campuses, bringing every lost and found item into one searchable place.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
        <div className={block}><Target className="h-7 w-7 text-lost" /><h2 className="mt-4 text-xl font-semibold">The problem</h2><p className="mt-2 text-muted-foreground">Lost items on campus usually end up in scattered WhatsApp groups, noticeboards or a dusty office drawer — so most never return to their owners.</p></div>
        <div className={block}><Lightbulb className="h-7 w-7 text-primary-glow" /><h2 className="mt-4 text-xl font-semibold">Our solution</h2><p className="mt-2 text-muted-foreground">One simple website where anyone can report, search, filter and claim items, with photos, locations and direct contact details.</p></div>
        <div className={block}><School className="h-7 w-7 text-found" /><h2 className="mt-4 text-xl font-semibold">Campus purpose</h2><p className="mt-2 text-muted-foreground">Designed around college life: libraries, labs, hostels, canteens and lecture halls — the places things actually get lost.</p></div>
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Benefits for students</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {["Recover belongings faster", "Search by category, status and keyword", "Help peers by reporting found items", "Track recovered items with claim status"].map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4"><Users className="h-5 w-5 text-primary-glow" />{b}</li>
          ))}
        </ul>
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Future improvements</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { i: Bell, t: "Smart notifications", d: "Alert students when a matching item is reported." },
            { i: ShieldCheck, t: "Student authentication", d: "Verified college logins to keep listings trustworthy." },
            { i: Building2, t: "Multiple campus support", d: "Separate spaces for each campus in a university." },
          ].map((f) => (
            <div key={f.t} className={block}><f.i className="h-7 w-7 text-claimed" /><h3 className="mt-4 font-semibold">{f.t}</h3><p className="mt-2 text-sm text-muted-foreground">{f.d}</p></div>
          ))}
        </div>
        <div className="mt-12 text-center"><Button asChild variant="hero" size="lg"><Link to="/browse">Start browsing <ArrowRight /></Link></Button></div>
      </section>
    </PageShell>
  );
}
