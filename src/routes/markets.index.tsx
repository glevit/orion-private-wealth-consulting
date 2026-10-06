import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero, TextLink } from "@/components/site/parts";
import { seo } from "@/content/site";

export const Route = createFileRoute("/markets/")({
  head: () => seo("Dubai, Engadina & the Riviera — Orion’s Market Guide", "Three of the world’s most desirable luxury markets: Dubai & the UAE, the Engadina in Switzerland, and the Côte d’Azur in France.", "/markets"),
  component: Markets,
});

const markets = [
  { id: "dubai", eyebrow: "Dubai & UAE", title: "The New Capital of Luxury", img: "/images/dubai-06-skyline-palms.jpg", alt: "Dubai skyline and palm islands",
    copy: ["Dubai has redefined what is possible in luxury real estate. With world-class architecture, zero property tax, and a cosmopolitan lifestyle unlike anywhere else on earth, the UAE continues to attract the world’s most discerning investors and residents."],
    why: "Why Dubai", list: ["Zero property tax", "High rental yields", "World-class infrastructure", "Global connectivity", "Residency visa opportunities through property investment"], link: true },
  { id: "engadina", eyebrow: "Engadina, Switzerland", title: "Where Privacy Meets Perfection", img: "/images/engadina-02-chalet-pines.jpg", alt: "Alpine chalet among pines in the Engadina",
    copy: ["Nestled in the Swiss Alps, the Engadina valley is one of Europe’s most exclusive and private destinations. Home to St. Moritz and some of the world’s most prestigious ski resorts, the region attracts a global elite who value discretion, natural beauty, and enduring value.", "Orion’s established network in the Engadina region provides access to properties that are rarely, if ever, publicly listed."],
    why: "Why Engadina, Switzerland", list: ["Exceptional privacy and security", "Stable Swiss real estate market", "World-class ski and outdoor lifestyle", "Strong long-term asset value", "Proximity to major European financial centers"] },
  { id: "cote-d-azur", eyebrow: "Côte d’Azur, France", title: "The Timeless Riviera", img: "/images/cotedazur-01-aerial-monaco.jpg", alt: "Aerial view of Monaco and the Riviera coast",
    copy: ["From Monaco to Saint-Tropez, the French Riviera represents the pinnacle of Mediterranean luxury living. With its unparalleled climate, cultural richness, and concentration of ultra-high-net-worth residents, the Côte d’Azur remains one of the world’s most coveted real estate markets.", "Orion’s presence on the Riviera opens doors to villas, apartments, and estates that define the art of living."],
    why: "Why Côte d’Azur, France", list: ["Year-round luxury lifestyle", "Proximity to Monaco", "Strong international demand", "Prestigious address recognition worldwide", "Access to exclusive private communities"] },
];

function Markets() {
  return (
    <>
      <PageHero eyebrow="Markets" title="Where We Operate" lead="Three of the world’s most desirable luxury markets. One trusted partner." />
      {markets.map((m, i) => (
        <section key={m.id} id={m.id} className={`section-space ${i % 2 === 0 ? "" : "alt-section"}`}>
          <div className="content-width split top" style={i % 2 ? { direction: "rtl" } : undefined}>
            <img src={m.img} alt={m.alt} width={1200} height={900} loading="lazy" style={{ direction: "ltr" }} />
            <div style={{ direction: "ltr" }}>
              <p className="section-eyebrow">{m.eyebrow}</p>
              <h2>{m.title}</h2>
              {m.copy.map((c) => <p key={c} className="editorial-copy">{c}</p>)}
              <h3 style={{ fontSize: 24, marginTop: 28 }}>{m.why}</h3>
              <ul className="check-list">{m.list.map((l) => <li key={l}>{l}</li>)}</ul>
              {m.link && <TextLink to="/markets/dubai">Learn more about opportunities in Dubai</TextLink>}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
