import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { Block } from "@/content/original";

export function PageHero({ eyebrow, title, lead, image, children }: { eyebrow: string; title: string; lead?: string; image?: string; children?: ReactNode }) {
  return (
    <section className={`page-hero${image ? " has-image" : ""}`}>
      {image && <img src={image} alt="" width={1600} height={900} fetchPriority="high" />}
      <div className="content-width">
        <p className="section-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Speak with us before you search.", text = "A first conversation, on your terms." }: { title?: string; text?: string }) {
  return (
    <section className="cta-band">
      <h2>{title}</h2>
      <p>{text}</p>
      <Button variant="editorial" asChild><Link to="/contact">Request a private consultation <ArrowUpRight aria-hidden="true" /></Link></Button>
    </section>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="text-link">{children} <ArrowRight size={16} aria-hidden="true" /></Link>;
}

export function Prose({ blocks, legal = false }: { blocks: Block[]; legal?: boolean }) {
  return (
    <div className={`prose${legal ? " legal" : ""}`}>
      {blocks.map(([type, text], i) =>
        type === "h2" ? <h2 key={i}>{text}</h2> : type === "h3" ? <h3 key={i}>{text}</h3> : <p key={i}>{text}</p>,
      )}
    </div>
  );
}
