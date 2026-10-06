import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/parts";
import { privacy } from "@/content/original";
import { seo } from "@/content/site";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy — Orion Private Wealth Consulting", "How Orion collects, uses and protects personal data.", "/privacy"),
  component: () => (<><PageHero eyebrow="Legal" title="Privacy Policy" lead={privacy.updated} /><section className="section-space"><Prose blocks={privacy.body} legal /></section></>),
});
