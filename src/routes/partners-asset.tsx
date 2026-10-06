import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/parts";
import { NetlifyForm } from "@/components/site/NetlifyForm";
import { seo } from "@/content/site";

export const Route = createFileRoute("/partners-asset")({
  head: () => seo("Asset Partner Program — Zero Listing Cost | Orion", "Your inventory. Our network. A pure success-fee collaboration with terms put in writing before any joint activity.", "/partners-asset"),
  component: Asset,
});

function Asset() {
  return (
    <>
      <PageHero eyebrow="Partners · Asset" title="Asset Partner" lead="Your inventory. Our network." />
      <section className="section-space">
        <div className="content-width split top">
          <div>
            <p className="section-eyebrow">Who We’re Looking For</p>
            <p className="editorial-copy">Real estate developers, dealers in collectible automobiles, and dealers or auction houses specializing in fine watches, based in Dubai, Switzerland, or the French Riviera.</p>
            <p className="section-eyebrow" style={{ marginTop: 40 }}>How It Works</p>
            <ul className="check-list ticks">
              <li><strong>Share your inventory</strong> or upcoming opportunities with us, ideally before they reach the open market.</li>
              <li>We introduce them <strong>selectively and discreetly</strong> to clients in our network who match the profile.</li>
              <li>When <strong>a transaction closes</strong>, our success fee applies.</li>
            </ul>
            <p className="section-eyebrow" style={{ marginTop: 40 }}>Compensation</p>
            <p className="editorial-copy">Every collaboration runs on a success-fee model, calibrated to the scope and complexity of the individual mandate. Terms are defined and put in writing before any joint activity begins — no surprises, no standard rate applied regardless of context.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 34, marginBottom: 24 }}>Apply as an Asset Partner</h2>
            <NetlifyForm name="orion-partner-asset-en" submit="Submit Application" note="All applications are treated with absolute discretion."
              error="There was a problem sending your application. Please try again, or reach us directly via WhatsApp."
              fields={[
                { name: "name", label: "Full Name", required: true }, { name: "email", label: "Email Address", type: "email", required: true },
                { name: "firm", label: "Company" }, { name: "sector", label: "Sector", type: "select", options: ["Real Estate Development", "Automobile Dealer", "Watch Dealer / Auction House", "Other"] },
                { name: "region", label: "Region" }, { name: "website", label: "Website / Portfolio Link", type: "url" },
                { name: "message", label: "Tell us about your inventory or opportunities", type: "textarea" },
              ]} />
          </div>
        </div>
      </section>
    </>
  );
}
