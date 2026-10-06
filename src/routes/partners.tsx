import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/parts";
import { seo } from "@/content/site";

export const Route = createFileRoute("/partners")({
  head: () => seo("Become a Partner | No-Cost Referral or Asset Program — Orion", "Orion collaborates with best-in-class partners. Choose the path that reflects what you bring: Referral Partner or Asset Partner.", "/partners"),
  component: Partners,
});

function Partners() {
  return (
    <>
      <PageHero eyebrow="Partners" title="Become a Partner" lead="Orion collaborates exclusively with best-in-class partners who share our commitment to excellence, integrity, and discretion. We work with two distinct kinds of partners across every market we serve — choose the path that reflects what you bring to the relationship." />
      <section className="section-space">
        <div className="content-width">
          <div className="partner-grid">
            <article className="partner-card">
              <p className="section-eyebrow">Introduce Clients</p>
              <h3>Referral Partner</h3>
              <p className="editorial-copy">Private bankers, lawyers, tax and golden-visa advisors: if you know someone seeking a luxury property, automobile, or timepiece off-market, introduce them with discretion. We handle the rest.</p>
              <ul className="check-list">{["No cost or commission on your side", "Your client relationship stays protected and discreet", "Compensation only on completed deals", "No exclusivity commitment required"].map((l) => <li key={l}>{l}</li>)}</ul>
              <Link to="/partners-referral" className="text-link">Become a Referral Partner <ArrowRight size={16} /></Link>
            </article>
            <article className="partner-card">
              <p className="section-eyebrow">Supply Assets</p>
              <h3>Asset Partner</h3>
              <p className="editorial-copy">Real estate developers, dealers, and dealers in fine watches: we place your inventory in front of our UHNW client network on a success-fee basis.</p>
              <ul className="check-list">{["Pure success-fee — zero listing costs", "Direct access to our UHNW client network", "No exclusivity required", "Paid within 10 working days of closing"].map((l) => <li key={l}>{l}</li>)}</ul>
              <Link to="/partners-asset" className="text-link">Become an Asset Partner <ArrowRight size={16} /></Link>
            </article>
          </div>
          <p className="editorial-copy" style={{ marginTop: 32 }}>Not sure which applies? <Link to="/contact" className="text-link" style={{ marginTop: 0 }}>Contact us directly</Link>.</p>
        </div>
      </section>
    </>
  );
}
