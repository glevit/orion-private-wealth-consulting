import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/parts";
import { NetlifyForm } from "@/components/site/NetlifyForm";
import { seo } from "@/content/site";

export const Route = createFileRoute("/markets/dubai")({
  head: () => seo("Dubai Real Estate 2026 — Private, Aligned Access | Orion", "Orion introduces select clients to Dubai’s finest residences and investment properties, many before they reach the open market.", "/markets/dubai"),
  component: Dubai,
});

const points = [
  ["Curated, not listed.", "Orion does not operate a marketplace. Every introduction is considered individually, for the client it is made for."],
  ["Aligned by design.", "Orion’s role is structured so our success depends entirely on yours — there is no incentive to rush, oversell, or steer you toward the wrong property."],
  ["Discreet by default.", "We do not publicize client relationships, transaction details, or volumes."],
  ["Grounded in Dubai, not remote.", "Orion’s network spans developers, legal counsel, and residency specialists on the ground in the UAE."],
];

function Dubai() {
  return (
    <>
      <PageHero eyebrow="Dubai & the UAE" title="Private access, aligned interests" image="/images/dubai-01-burj-al-arab.jpg"
        lead="Orion introduces select clients to Dubai’s finest residences and investment properties — many before they ever reach the open market. We succeed only when you do.">
        <p className="breadcrumb" style={{ marginTop: 24, marginBottom: 0 }}><Link to="/markets">← All markets</Link></p>
      </PageHero>
      <section className="section-space">
        <div className="content-width" style={{ maxWidth: 760 }}>
          <p className="section-eyebrow">Dubai &amp; UAE</p>
          <h2 className="section-heading">Why Clients Choose Orion in Dubai</h2>
          <p className="editorial-copy">Dubai has redefined what is possible in luxury real estate — zero property tax, world-class infrastructure, and a market that continues to attract the world’s most discerning investors. But the properties worth having are rarely the ones publicly listed.</p>
          <p className="editorial-copy" style={{ marginTop: 16 }}>Through Orion’s established relationships across Dubai’s leading developers, clients gain access to opportunities before they are marketed — introduced quietly, negotiated carefully, and arranged with full alignment between Orion’s interests and their own.</p>
        </div>
      </section>
      <section className="section-space alt-section">
        <div className="content-width">
          <p className="section-eyebrow">What Sets This Apart</p>
          <div className="value-grid">{points.map(([t, d]) => <div key={t}><h3 style={{ fontSize: 24 }}>{t}</h3><p>{d}</p></div>)}</div>
        </div>
      </section>
      <section className="section-space">
        <div className="content-width split top">
          <div>
            <p className="section-eyebrow">Residency Through Investment</p>
            <p className="editorial-copy">For clients considering UAE residency alongside a property acquisition, Orion coordinates introductions to the relevant specialists as part of the same discreet process — one point of contact, not a referral chain.</p>
          </div>
          <div>
            <p className="section-eyebrow">Begin a Conversation</p>
            <p className="editorial-copy">Every mandate starts with a conversation, not a form to get a quote. Tell us what you are looking for in Dubai, and we will tell you honestly whether Orion is the right fit.</p>
          </div>
        </div>
      </section>
      <section id="begin" className="section-space alt-section">
        <div className="content-width" style={{ maxWidth: 760 }}>
          <p className="section-eyebrow">Begin a Conversation</p>
          <h2 className="section-heading">Tell us what you are looking for in Dubai.</h2>
          <NetlifyForm name="dubai-landing-en" submit="Send" note="All inquiries are treated with absolute discretion. Your information will never be shared with third parties."
            fields={[{ name: "name", label: "Name", required: true }, { name: "email", label: "Email Address", type: "email", required: true }, { name: "message", label: "What are you looking for?", type: "textarea", required: true }]} />
        </div>
      </section>
    </>
  );
}
