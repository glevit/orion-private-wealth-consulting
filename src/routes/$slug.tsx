import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Prose, CtaBand } from "@/components/site/parts";
import { articles } from "@/content/original";
import { seo } from "@/content/site";

// Article URLs keep the original site’s flat form: /blog-<name>
export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => seo(loaderData ? `${loaderData.article.title} | Orion` : "Orion", loaderData?.article.excerpt ?? "", loaderData ? `/${loaderData.article.slug}` : undefined),
  component: Article,
});

function Article() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`Insights · ${article.date}`} title={article.title}>
        <p className="breadcrumb" style={{ marginTop: 24, marginBottom: 0 }}><Link to="/blog">← All insights</Link></p>
      </PageHero>
      <section className="section-space">
        <Prose blocks={article.body} />
        <div className="author-box">
          <strong>About the Author</strong>
          Giacomo Levita is the founder and principal of Orion Private Wealth Consulting, with a deep network spanning three continents and decades of experience in luxury markets.
        </div>
      </section>
      <section className="section-space alt-section">
        <div className="content-width">
          <p className="section-eyebrow">Related Articles</p>
          <div className="article-cards">
            {related.map((a) => (
              <Link key={a.slug} to="/$slug" params={{ slug: a.slug }} className="article-card">
                <span className="meta">{a.date}</span><h3>{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
