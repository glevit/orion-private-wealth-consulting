import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/parts";
import { seo } from "@/content/site";

export const Route = createFileRoute("/who-we-are")({
  head: () => seo("Who We Are: A Private Network, Not a Firm — Orion", "Orion is a private network of relationships, expertise and discretion. Meet the founder, Giacomo Levita, and the values behind every mandate.", "/who-we-are"),
  component: WhoWeAre,
});

const values = [
  ["Discretion", "Your goals remain yours. Always."],
  ["Excellence", "We operate exclusively at the highest level of the market."],
  ["Trust", "Our network is built on relationships, not transactions."],
  ["Vision", "We see opportunities where others see obstacles."],
];

function WhoWeAre() {
  return (
    <>
      <PageHero eyebrow="Who We Are" title="We Are Orion. We Find What Others Cannot." />
      <section className="section-space">
        <div className="content-width about-grid">
          <p className="editorial-copy">Orion was born from a simple but powerful conviction: that those who dare to dream deserve a partner who dares to deliver. We are not a traditional consulting firm. We are a private network of relationships, expertise, and discretion — operating at the intersection of ambition and excellence.</p>
          <p className="editorial-copy">Like the constellation that has guided navigators for millennia, Orion exists to orient our clients toward their most ambitious goals. Every engagement begins with listening. Every solution is bespoke. Every result is achieved with integrity.</p>
        </div>
      </section>
      <section className="section-space alt-section">
        <div className="content-width">
          <p className="section-eyebrow">Our Values</p>
          <div className="value-grid">{values.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div>
      </section>
      <section className="section-space">
        <div className="content-width split">
          <div>
            <p className="section-eyebrow">Our Network</p>
            <h2>Where luxury meets opportunity.</h2>
            <p className="editorial-copy">With established connections across the UAE, Switzerland, France, and beyond, Orion operates where luxury meets opportunity. Our partners are carefully selected — developers, dealers, collectors, and advisors who share our commitment to excellence and confidentiality.</p>
          </div>
          <img src="/images/engadina-04-frozen-lake.jpg" alt="Frozen lake in the Engadina valley" width={1200} height={900} loading="lazy" />
        </div>
      </section>
      <section className="section-space paper-section">
        <div className="content-width split top">
          <img className="founder-photo" src="/images/jack-founder.jpg" alt="Giacomo Levita, founder and principal of Orion" width={760} height={950} loading="lazy" />
          <div>
            <p className="section-eyebrow">The Founder</p>
            <h2>Giacomo Levita</h2>
            <p className="editorial-copy" style={{ marginBottom: 12 }}>Founder &amp; Principal</p>
            <p className="editorial-copy">Giacomo is the founder and principal of Orion Private Wealth Consulting. With a deep network spanning three continents and decades of experience in luxury markets, he brings a rare combination of strategic vision, market knowledge, and personal relationships to every client engagement.</p>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="content-width" style={{ maxWidth: 760 }}>
          <p className="section-eyebrow">Philosophy</p>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="editorial-copy" style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "var(--paper)" }}>There is a discipline to seeing patterns before others do — long before the first mandate was ever accepted.</p>
            <p className="editorial-copy">More than twenty years in logistics, and in relationships across cultures, shaped that instinct — how capital, taste and geography move together, and how rarely they are read correctly.</p>
            <p className="editorial-copy">Three markets, one network. The deserts of Arabia. The peaks of the Engadin. The coast of the Riviera. Alongside them, the automobiles and timepieces that mark a life well curated. And the discreet network of relationships that makes every introduction possible.</p>
            <p className="editorial-copy">Every recommendation is weighed against the jurisdiction, the counterparty and the structure of the transaction — because precision requires restraint.</p>
            <p className="editorial-copy" style={{ fontSize: 20, fontFamily: "var(--font-serif)", color: "var(--gold)" }}>Orion does not chase volume. It chases alignment.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
