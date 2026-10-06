import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero } from "@/components/site/parts";
import { faqGroups } from "@/content/original";
import { seo } from "@/content/site";

export const Route = createFileRoute("/faq")({
  head: () => seo("How Does Orion’s Success-Fee Model Work? Costs & FAQ", "Answers on Orion’s success-fee model, Dubai real estate, collector automobiles and luxury timepieces.", "/faq"),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero eyebrow="Frequently Asked Questions" title="Everything You Need to Know" />
      <section className="section-space">
        <div className="content-width">
          {faqGroups.map((g) => (
            <div key={g.title} className="faq-group">
              <p className="section-eyebrow">{g.eyebrow}</p>
              {g.eyebrow !== g.title && <h2>{g.title}</h2>}
              <div className="faq-list">
                {g.items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Still have a question?" text="Every engagement begins with a private conversation — no pressure, just a conversation about your goals." />
    </>
  );
}
