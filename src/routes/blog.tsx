import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/parts";
import { articles } from "@/content/original";
import { seo } from "@/content/site";

export const Route = createFileRoute("/blog")({
  head: () => seo("Insights: Luxury Real Estate, Autos & Watches | Orion", "Perspectives from Dubai, Switzerland, and the Riviera: real estate, collector automobiles, timepieces and the success-fee model.", "/blog"),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Perspectives from Dubai, Switzerland, and the Riviera" />
      <section className="section-space">
        <div className="content-width article-cards">
          {articles.map((a) => (
            <Link key={a.slug} to="/$slug" params={{ slug: a.slug }} className="article-card">
              <span className="meta">{a.date}</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <span className="text-link" style={{ marginTop: "auto" }}>Read more</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
