import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero, PhotoGallery, TextLink } from "@/components/site/parts";
import { seo } from "@/content/site";

export const Route = createFileRoute("/markets/")({
  head: () => seo("Dubai, Engadina & the Riviera — Orion’s Market Guide", "Three of the world’s most desirable luxury markets: Dubai & the UAE, the Engadina in Switzerland, and the Côte d’Azur in France.", "/markets"),
  component: Markets,
});

const markets = [
  { id: "dubai", gallery: [["/images/dubai-01-burj-al-arab.jpg", "Burj Al Arab viewed from Madinat Jumeirah"], ["/images/dubai-03-museum-of-future.jpg", "Museum of the Future in downtown Dubai"], ["/images/dubai-04-souk-madinat.jpg", "Souk Madinat Jumeirah entrance"], ["/images/dubai-05-beach-foodtrucks.jpg", "Beach food-truck area in Dubai"], ["/images/dubai-06-skyline-palms.jpg", "Dubai skyline framed by palm trees"]], eyebrow: "Dubai & UAE", title: "The New Capital of Luxury", img: "/images/dubai-06-skyline-palms.jpg", alt: "Dubai skyline and palm islands",
    copy: ["Dubai has redefined what is possible in luxury real estate. With world-class architecture, zero property tax, and a cosmopolitan lifestyle unlike anywhere else on earth, the UAE continues to attract the world’s most discerning investors and residents."],
    why: "Why Dubai", list: ["Zero property tax", "High rental yields", "World-class infrastructure", "Global connectivity", "Residency visa opportunities through property investment"], link: true },
  { id: "engadina", gallery: [["/images/engadina-01-village-view.jpg", "St. Moritz village and mountains"], ["/images/engadina-02-chalet-pines.jpg", "Traditional Engadina chalet among pine trees"], ["/images/engadina-03-badrutts-palace.jpg", "Historic hillside hotel above St. Moritz"], ["/images/engadina-04-frozen-lake.jpg", "Frozen St. Moritz lake and village skyline"], ["/images/engadina-05-lake-signpost.jpg", "St. Moritz lakeside signpost and mountains"], ["/images/engadina-06-ice-skating.jpg", "Ice skating on the frozen lake in St. Moritz"]], eyebrow: "Engadina, Switzerland", title: "Where Privacy Meets Perfection", img: "/images/engadina-02-chalet-pines.jpg", alt: "Alpine chalet among pines in the Engadina",
    copy: ["Nestled in the Swiss Alps, the Engadina valley is one of Europe’s most exclusive and private destinations. Home to St. Moritz and some of the world’s most prestigious ski resorts, the region attracts a global elite who value discretion, natural beauty, and enduring value.", "Orion’s established network in the Engadina region provides access to properties that are rarely, if ever, publicly listed."],
    why: "Why Engadina, Switzerland", list: ["Exceptional privacy and security", "Stable Swiss real estate market", "World-class ski and outdoor lifestyle", "Strong long-term asset value", "Proximity to major European financial centers"] },
  { id: "cote-d-azur", gallery: [["/images/cotedazur-01-aerial-monaco.jpg", "Aerial view of Monaco and the French Riviera coastline"], ["/images/cotedazur-02-casino-gardens.jpg", "Monte-Carlo Casino viewed through the gardens"], ["/images/cotedazur-03-harbor-yachts.jpg", "Superyachts docked in Monaco's harbor"], ["/images/cotedazur-04-monaco-signpost.jpg", "Historic Monaco street signage"], ["/images/cotedazur-05-pink-church.jpg", "Historic church on the French Riviera"], ["/images/cotedazur-07-ferrari-palace.jpg", "Luxury sports car in front of a Monte-Carlo palace"]], eyebrow: "Côte d’Azur, France", title: "The Timeless Riviera", img: "/images/cotedazur-01-aerial-monaco.jpg", alt: "Aerial view of Monaco and the Riviera coast",
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
          <PhotoGallery photos={m.gallery as [string, string][]} />
        </section>
      ))}
      <CtaBand />
    </>
  );
}
