import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero, TextLink } from "@/components/site/parts";
import { seo } from "@/content/site";
import estate from "@/assets/orion-estate.jpg";
import car from "@/assets/orion-car.jpg";
import watch from "@/assets/orion-watch.jpg";
import villa from "@/assets/orion-villa.jpg";

export const Route = createFileRoute("/services")({
  head: () => seo("Services: Real Estate, Autos & Watches — Success-Fee | Orion", "A curated suite of private opportunity sourcing: luxury real estate, automobiles, timepieces and private consulting, on a success-fee basis.", "/services"),
  component: Services,
});

const items = [
  { id: "real-estate", eyebrow: "Luxury Real Estate", title: "The world’s most desirable addresses — secured for you.", img: villa, alt: "Contemporary Mediterranean villa at dusk",
    copy: "Whether you are seeking a prestigious residence overlooking the Palm Jumeirah, a private chalet in the Engadina valley, or a villa on the shores of the French Riviera, Orion provides exclusive access to properties that rarely reach the open market.",
    list: ["Off-market property sourcing", "Price negotiation and due diligence", "Coordination with local legal and financial advisors", "End-to-end transaction management"],
    foot: "Markets: Dubai & UAE • Engadina, Switzerland • Côte d’Azur, France" },
  { id: "automobiles", eyebrow: "Luxury Automobiles", title: "The rarest cars. The most advantageous conditions.", img: car, alt: "Silver collector’s sports car in a studio",
    copy: "From limited edition supercars to classic collectibles, Orion sources the vehicles that define automotive excellence. We leverage our global network of private dealers, collectors, and auction houses to find the exact vehicle you are looking for — at conditions you will not find elsewhere.",
    list: ["Private sourcing of rare and limited edition vehicles", "Condition verification and independent inspection", "Import and logistics coordination", "Price and terms negotiation"] },
  { id: "timepieces", eyebrow: "Luxury Timepieces", title: "Time is the ultimate luxury. Wear it accordingly.", img: watch, alt: "Fine mechanical wristwatch on dark stone",
    copy: "The world’s most prestigious timepieces are more than instruments — they are statements of achievement, taste, and legacy. Orion connects collectors and connoisseurs with exceptional watches from the most prestigious maisons, including rare and discontinued references.",
    list: ["Sourcing of rare and vintage references", "Authentication and condition assessment", "Private collector network access", "Investment-grade timepiece opportunities"] },
  { id: "private-consulting", eyebrow: "Private Consulting", title: "Your vision. Our strategy.", img: estate, alt: "Travertine residence framed by olive trees",
    copy: "Beyond specific asset classes, Orion offers a comprehensive private consulting service for clients with complex or unique requirements. Whether you are relocating internationally, diversifying your assets into tangible luxury goods, or simply seeking a trusted advisor who understands your world — we are here." },
];

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="What We Do" lead="Orion offers a curated suite of private opportunity sourcing services, designed for clients who demand the extraordinary." />
      {items.map((it, i) => (
        <section key={it.id} id={it.id} className={`section-space ${i % 2 ? "alt-section" : ""}`}>
          <div className={`content-width split top`} style={i % 2 ? { direction: "rtl" } : undefined}>
            <img src={it.img} alt={it.alt} width={1200} height={900} loading="lazy" style={{ direction: "ltr" }} />
            <div style={{ direction: "ltr" }}>
              <p className="section-eyebrow">{it.eyebrow}</p>
              <h2>{it.title}</h2>
              <p className="editorial-copy">{it.copy}</p>
              {it.list && <ul className="check-list">{it.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              {it.foot && <p className="editorial-copy" style={{ marginTop: 20, fontSize: 13 }}>{it.foot}</p>}
              {it.id === "real-estate" && <TextLink to="/markets">Explore our markets</TextLink>}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
