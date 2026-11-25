import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/findit/Layout";
import { ReportForm } from "@/components/findit/ReportForm";

export const Route = createFileRoute("/report-found")({
  head: () => ({ meta: [{ title: "Report a Found Item – FindIt" }, { name: "description", content: "Found something on campus? Post it so the owner can get it back." }, { property: "og:title", content: "Report a Found Item – FindIt" }, { property: "og:description", content: "Found something on campus? Post it so the owner can get it back." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ReportFound,
});

function ReportFound() {
  return (
    <PageShell>
      <section className="bg-hero">
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-14 sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Report a found item</h1>
          <p className="mt-2 text-muted-foreground">Thanks for being a good citizen! Share where you found it so the owner can reach you.</p>
          <div className="mt-8"><ReportForm status="found" /></div>
        </div>
      </section>
    </PageShell>
  );
}
