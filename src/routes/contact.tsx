import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/parts";
import { NetlifyForm } from "@/components/site/NetlifyForm";
import { contact, seo } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Orion — Start Your Success-Fee Search Today", "Begin your journey with a private inquiry. Giacomo replies to every inquiry personally, within 24 hours.", "/contact"),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Begin Your Journey" lead="Every extraordinary acquisition begins with a conversation. We invite you to share your vision with us — in complete confidence. We only succeed when you do." />
      <section className="section-space">
        <div className="content-width split top">
          <div>
            <h2 style={{ fontSize: 34, marginBottom: 24 }}>Private inquiry</h2>
            <NetlifyForm name="orion-inquiry-en" submit="Submit Private Inquiry"
              note="All inquiries are treated with absolute discretion. Your information will never be shared with third parties. Giacomo replies to every inquiry personally, within 24 hours, in English or in your language."
              fields={[
                { name: "name", label: "Full Name", required: true }, { name: "country", label: "Country of Residence", required: true },
                { name: "email", label: "Email Address", type: "email", required: true }, { name: "phone", label: "Phone / WhatsApp (optional)", type: "tel" },
                { name: "interest", label: "I am interested in", type: "select", options: ["Real Estate", "Automobiles", "Timepieces", "Private Consulting", "Other"] },
                { name: "message", label: "Tell us what you are looking for", type: "textarea", required: true },
              ]} />
          </div>
          <aside className="contact-aside">
            <div><h3>WhatsApp</h3>
              <p><a href={contact.whatsappUsa.url} target="_blank" rel="noopener noreferrer">USA · {contact.whatsappUsa.display}</a></p>
              <p><a href={contact.whatsappEu.url} target="_blank" rel="noopener noreferrer">EU · {contact.whatsappEu.display}</a></p></div>
            <div><h3>Email</h3><p><a href={`mailto:${contact.email}`}>{contact.email}</a></p></div>
            <div><h3>Office</h3><address>Orion Private Wealth Consulting LLC<br />{contact.address.map((l) => <span key={l}>{l}<br /></span>)}</address></div>
          </aside>
        </div>
      </section>
    </>
  );
}
