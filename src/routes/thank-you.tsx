import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/parts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/thank-you")({
  head: () => ({ meta: [{ title: "Thank You — Orion Private Wealth Consulting" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <PageHero eyebrow="Inquiry received" title="Thank You." lead="Your inquiry has been received in complete confidence. A member of the Orion team will be in touch shortly.">
      <div style={{ marginTop: 28 }}><Button variant="editorial" asChild><Link to="/">Return Home</Link></Button></div>
    </PageHero>
  ),
});
