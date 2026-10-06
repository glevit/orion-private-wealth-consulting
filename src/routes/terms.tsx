import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/parts";
import { terms } from "@/content/original";
import { seo } from "@/content/site";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Service — Orion Private Wealth Consulting", "Terms governing use of the Orion Private Wealth Consulting website and services.", "/terms"),
  component: () => (<><PageHero eyebrow="Legal" title="Terms of Service" lead={terms.updated} /><section className="section-space"><Prose blocks={terms.body} legal /></section></>),
});
