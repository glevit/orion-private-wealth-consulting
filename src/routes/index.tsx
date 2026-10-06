import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, TextLink } from "@/components/site/parts";
import { articles } from "@/content/original";
import { seo } from "@/content/site";
import villa from "@/assets/orion-villa.jpg";
import estate from "@/assets/orion-estate.jpg";
import car from "@/assets/orion-car.jpg";
import watch from "@/assets/orion-watch.jpg";

export const Route = createFileRoute("/")({
  head: () => seo("Orion Private Wealth Consulting — Success-Fee Luxury Access", "Prime real estate in Dubai, St. Moritz and the Côte d’Azur. Rare automobiles and timepieces for select clients. Paid by the seller, only when the transaction completes.", "/"),
  component: Index,
});

const markets = [
  { to: "/markets", title: "Dubai & UAE", img: "/images/dubai-01-burj-al-arab.jpg", alt: "Burj Al Arab, Dubai", text: "Contemporary architecture, international connections and exceptional residences in a luxury market that continues to attract discerning investors and residents." },
  { to: "/markets", title: "Engadina, Switzerland", img: "/images/engadina-02-chalet-pines.jpg", alt: "Alpine chalet among pines", text: "St. Moritz and the Swiss Alps. Privacy, natural beauty and a network that opens doors to properties rarely publicly listed." },
  { to: "/markets", title: "Côte d’Azur, France", img: "/images/cotedazur-01-aerial-monaco.jpg", alt: "Aerial view of Monaco", text: "From Monaco to Saint-Tropez. Mediterranean villas, apartments and estates, introduced through established relationships." },
];

function Index() {
  return (
    <>
      <section id="home" className="opening" aria-labelledby="opening-title">
        <img className="opening-image" src={villa} alt="Contemporary Mediterranean villa overlooking the sea at dusk" width={1920} height={1200} fetchPriority="high" />
        <div className="opening-shade" /><div className="glass-panel glass-panel-left" /><div className="glass-panel glass-panel-right" />
        <div className="opening-content">
          <h1 id="opening-title">Private access. Negotiated on your side.</h1>
          <p>Prime real estate in Dubai, St. Moritz and the Côte d’Azur. Rare automobiles and timepieces for select clients.</p>
          <div style={{ marginTop: 28 }}><Button variant="editorial" asChild><Link to="/contact">Request a private consultation <ArrowUpRight aria-hidden="true" /></Link></Button></div>
        </div>
      </section>

      <section className="estates-intro section-space">
        <div className="content-width">
          <p className="section-eyebrow">Orion Private Wealth Consulting</p>
          <div className="intro-grid">
            <h2>We sit on your side of the table.</h2>
            <p>Our compensation is a success fee paid by the seller, only when a transaction completes, and nothing is added to your price. We introduce, we negotiate, we stay discreet.</p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="content-width">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-heading">Real estate at the core.</h2>
          <div className="market-grid">
            <article className="market-item"><h3>Luxury Real Estate</h3><p>UAE • Engadina • Côte d’Azur. Off-market sourcing, negotiation and end-to-end transaction management.</p><TextLink to="/services">Our services</TextLink></article>
            <article className="market-item"><h3>Luxury Automobiles</h3><p>Rare and collector cars sourced discreetly for select clients, by introduction.</p><TextLink to="/services">Our services</TextLink></article>
            <article className="market-item"><h3>Luxury Timepieces</h3><p>Fine timepieces, sourced and authenticated with the same care. Selected mandates, by introduction.</p><TextLink to="/services">Our services</TextLink></article>
          </div>
        </div>
      </section>

      <section className="markets-section section-space">
        <div className="content-width">
          <p className="section-eyebrow">Markets</p>
          <h2 className="section-heading">Three markets. One trusted partner.</h2>
          <div className="market-grid">
            {markets.map((m) => (
              <article key={m.title} className="market-item market-card">
                <img src={m.img} alt={m.alt} width={900} height={675} loading="lazy" />
                <h3>{m.title}</h3><p>{m.text}</p>
              </article>
            ))}
          </div>
          <TextLink to="/markets">Explore our markets</TextLink>
        </div>
      </section>

      <section className="mandate-section section-space">
        <div className="content-width">
          <p className="section-eyebrow">How a Mandate Unfolds</p>
          <div className="mandate-grid">
            <img className="estate-image" src={estate} alt="Travertine residence framed by olive trees on the Mediterranean coast" width={1200} height={912} loading="lazy" />
            <div className="mandate-copy">
              <h2>Every engagement begins with a conversation.</h2>
              <p>We listen first: what you are looking for, where, and on what timeline. Then we go to work, quietly.</p>
              <Button variant="navigation" asChild className="mandate-link"><Link to="/how-it-works">How it works <ArrowRight aria-hidden="true" /></Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="content-width process-grid">
          <article className="process-item"><span className="process-number">01</span><h3>Introduced, not listed.</h3><p>Many of the finest properties never reach a public portal. Through our relationships in Dubai, the Engadina and the Côte d’Azur, we introduce select clients to opportunities before they reach the open market, and arrange viewings on your terms.</p></article>
          <article className="process-item"><span className="process-number">02</span><h3>Negotiated on your side.</h3><p>Orion is paid by the seller, and only when the transaction completes. Nothing is added to your price. Our interests are aligned with yours at every step, and we negotiate accordingly.</p></article>
          <article className="process-item"><span className="process-number">03</span><h3>Discreet by design.</h3><p>We do not publish client names and we do not circulate mandates. Introductions are made one at a time, by people you can speak to directly. Orion is a boutique firm by choice.</p></article>
        </div>
      </section>

      <section className="acquisitions-section section-space">
        <div className="content-width">
          <p className="section-eyebrow">Selected acquisitions</p>
          <div className="acquisitions-grid">
            <article id="automobiles" className="acquisition"><img src={car} alt="Silver collector’s sports car photographed in a studio" width={928} height={720} loading="lazy" /><h3>Automobiles</h3><p>For select clients, we extend the same approach to rare automobiles: sourcing, authentication and negotiation, handled with the same care.</p></article>
            <article id="horology" className="acquisition"><img src={watch} alt="Fine mechanical wristwatch with a rose-gold case on dark stone" width={928} height={720} loading="lazy" /><h3>Timepieces</h3><p>Fine timepieces, sourced and authenticated with the same care. Selected mandates, by introduction.</p></article>
          </div>
        </div>
      </section>

      <section className="partners-section section-space">
        <div className="content-width">
          <p className="section-eyebrow">Partners</p>
          <h2 className="section-heading">Relationships, not transactions.</h2>
          <div className="about-grid">
            <div><h3 className="section-heading" style={{ fontSize: 32 }}>Referral partners</h3><p className="editorial-copy">Private bankers, lawyers and advisors: introduce clients seeking exceptional properties, automobiles or timepieces. Your client relationship stays protected and discreet.</p><TextLink to="/partners-referral">Become a Referral Partner</TextLink></div>
            <div><h3 className="section-heading" style={{ fontSize: 32 }}>Asset partners</h3><p className="editorial-copy">Developers and dealers: connect your inventory with our private client network. Pure success-fee, zero listing costs, no exclusivity required.</p><TextLink to="/partners-asset">Become an Asset Partner</TextLink></div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="content-width">
          <p className="section-eyebrow">Insights</p>
          <h2 className="section-heading">Perspective before a decision.</h2>
          <div className="article-cards">
            {articles.slice(0, 4).map((a) => (
              <Link key={a.slug} to="/$slug" params={{ slug: a.slug }} className="article-card"><span className="meta">{a.date}</span><h3>{a.title}</h3><p>{a.excerpt}</p></Link>
            ))}
          </div>
          <TextLink to="/blog">All insights</TextLink>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
