import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/parts";
import { NetlifyForm } from "@/components/site/NetlifyForm";
import { seo } from "@/content/site";

export const Route = createFileRoute("/partners-referral")({
  head: () => seo("Referral Partner Program — Get Paid, No Effort | Orion", "Introduce a client. We handle the rest. Compensation agreed openly before any introduction.", "/partners-referral"),
  component: Referral,
});

function Referral() {
  return (
    <>
      <PageHero eyebrow="Partners · Referral" title="Referral Partner" lead="Introduce a client. We handle the rest." />
      <section className="section-space">
        <div className="content-width split top">
          <div>
            <p className="section-eyebrow">Who We’re Looking For</p>
            <p className="editorial-copy">Private bankers, family offices, lawyers, and tax or residency/golden-visa advisors who, in the ordinary course of their work, meet people interested in luxury real estate, collectible automobiles, or rare timepieces.</p>
            <p className="section-eyebrow" style={{ marginTop: 40 }}>How It Works</p>
            <ul className="check-list ticks">
              <li><strong>Introduce your contact</strong> — even a brief email or WhatsApp introduction is enough to start.</li>
              <li><strong>We manage the relationship</strong> with absolute discretion — your name stays as protected as your client’s.</li>
              <li>If it leads to <strong>a transaction</strong>, we recognize your introduction with compensation.</li>
            </ul>
            <p className="section-eyebrow" style={{ marginTop: 40 }}>Compensation</p>
            <p className="editorial-copy">We recognize every introduction with compensation proportionate to the outcome, agreed openly before you introduce anyone to us — not after. We prefer to negotiate terms case by case rather than impose a fixed rate that wouldn’t reflect the real value of the introduction.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 34, marginBottom: 24 }}>Apply as a Referral Partner</h2>
            <NetlifyForm name="orion-partner-referral-en" submit="Submit Application" note="We only succeed when you do. All applications are treated with absolute discretion."
              error="There was a problem sending your application. Please try again, or reach us directly via WhatsApp."
              fields={[
                { name: "name", label: "Full Name", required: true }, { name: "email", label: "Email Address", type: "email", required: true },
                { name: "firm", label: "Firm / Company" }, { name: "role", label: "Your Role", type: "select", options: ["Private Banker", "Family Office", "Lawyer", "Tax / Golden-Visa Advisor", "Other"] },
                { name: "region", label: "Region" }, { name: "linkedin", label: "LinkedIn / Website", type: "url" },
                { name: "message", label: "Tell us about your network", type: "textarea" },
              ]} />
          </div>
        </div>
      </section>
    </>
  );
}
