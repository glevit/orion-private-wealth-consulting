import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/parts";
import { seo } from "@/content/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => seo("How Orion’s Success-Fee Model Works, Step by Step", "Simple, private, effective. Orion is compensated by the seller upon successful completion; nothing is added to your price.", "/how-it-works"),
  component: HowItWorks,
});

const steps = [
  ["01", "Tell Us What You Are Looking For", "Every engagement begins with a private conversation. You tell us what you are looking for — a residence, an automobile, a timepiece, or a wider objective. No detail is too specific."],
  ["02", "We Go to Work", "Orion activates its global network on your behalf. We identify the right opportunities, negotiate the best conditions, and conduct thorough due diligence — so you don’t have to. We work quietly, efficiently, and always in your best interest."],
  ["03", "Complete the Transaction", "When we find the right match, we connect you directly with the provider under the most advantageous conditions available. Orion is compensated by the seller upon successful completion; nothing is added to your price."],
];

function HowItWorks() {
  return (
    <>
      <PageHero eyebrow="How It Works" title="Simple. Private. Effective." lead="Our process is designed to be as effortless as possible for our clients, while delivering exceptional results." />
      <section className="section-space">
        <div className="content-width step-list">
          {steps.map(([n, t, d]) => <article key={n}><span className="process-number">{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}
        </div>
      </section>
      <section className="section-space paper-section">
        <div className="content-width" style={{ maxWidth: 760 }}>
          <p className="section-eyebrow">A Note on Transparency</p>
          <p className="editorial-copy" style={{ fontFamily: "var(--font-serif)", fontSize: 28, lineHeight: 1.35, color: "var(--ink)" }}>Orion operates on a success-fee model. The fee is paid by the seller and included in the sale price, only when a transaction completes. You pay nothing extra. No retainers, no hidden costs. Our success is measured by yours.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
