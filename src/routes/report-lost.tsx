import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/findit/Layout";
import { ReportForm } from "@/components/findit/ReportForm";

export const Route = createFileRoute("/report-lost")({
  head: () => ({ meta: [{ title: "Report a Lost Item – FindIt" }, { name: "description", content: "Tell the campus what you lost so others can help you find it." }, { property: "og:title", content: "Report a Lost Item – FindIt" }, { property: "og:description", content: "Tell the campus what you lost so others can help you find it." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ReportLost,
});

function ReportLost() {
  return (
    <PageShell>
      <section className="bg-hero">
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-14 sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Report a lost item</h1>
          <p className="mt-2 text-muted-foreground">Describe what you lost and where you last saw it. The more detail, the better.</p>
          <div className="mt-8"><ReportForm status="lost" /></div>
        </div>
      </section>
    </PageShell>
  );
}
