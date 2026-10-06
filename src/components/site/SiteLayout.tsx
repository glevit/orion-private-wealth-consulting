import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { contact, languages, localizedUrl, navLinks } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { openCookieSettings } from "./CookieConsent";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setMenuOpen(false); setLanguageOpen(false); }, [pathname]);
  useEffect(() => {
    const onOutside = (e: PointerEvent) => {
      if (e.target instanceof Node && !languageRef.current?.contains(e.target)) setLanguageOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setLanguageOpen(false); setMenuOpen(false); } };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onOutside); document.removeEventListener("keydown", onKey); };
  }, []);
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Orion Private Wealth home">
        <img src="/images/logo-lockup.png" alt="Orion Private Wealth Consulting" width={1920} height={480} />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((l) => (
          <Button key={l.label} variant="navigation" asChild><Link to={l.to} activeOptions={{ exact: l.to === "/" }}>{l.label}</Link></Button>
        ))}
      </nav>
      <div className="header-actions">
        <Button variant="consultation" asChild><Link to="/contact">Private consultation <ArrowUpRight aria-hidden="true" /></Link></Button>
        <div className="language-control" ref={languageRef}>
          <Button variant="navigation" className="language-toggle" aria-label="Choose language" aria-expanded={languageOpen} aria-controls="language-menu" onClick={() => { setLanguageOpen(!languageOpen); setMenuOpen(false); }}>
            <img className="flag" src="/flags/gb.svg" alt="" width={20} height={14} /> EN <ChevronDown aria-hidden="true" />
          </Button>
          {languageOpen && (
            <nav id="language-menu" className="language-menu" aria-label="Languages">
              {languages.map(([code, label, flag]) => (
                <Button variant="navigation" asChild key={code}>
                  {code === "en"
                    ? <a href="#" onClick={(e) => { e.preventDefault(); setLanguageOpen(false); }} lang="en"><img className="flag" src={`/flags/${flag}.svg`} alt="" width={20} height={14} />{label}</a>
                    : <a href={localizedUrl(code, pathname)} lang={code} hrefLang={code}><img className="flag" src={`/flags/${flag}.svg`} alt="" width={20} height={14} />{label}</a>}
                </Button>
              ))}
              <p className="language-note">Translations open on the current Orion website.</p>
            </nav>
          )}
        </div>
        <Button variant="navigation" size="icon" className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { setMenuOpen(!menuOpen); setLanguageOpen(false); }}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((l) => (<Button key={l.label} variant="navigation" asChild><Link to={l.to}>{l.label}</Link></Button>))}
          <Button variant="editorial" asChild className="mt-3"><Link to="/contact">Request a private consultation</Link></Button>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="footer-brand">Orion</Link>
          <p>Private Wealth Consulting LLC<br />Serving clients globally with discretion and excellence.</p>
          <p className="locations" style={{ marginTop: 12, fontSize: 11 }}>Dubai · St. Moritz · Côte d’Azur</p>
        </div>
        <div>
          <h2>Explore</h2>
          {navLinks.filter((l) => l.to !== "/").map((l) => <Link key={l.label} to={l.to}>{l.label}</Link>)}
        </div>
        <div>
          <h2>Partners</h2>
          <Link to="/partners-referral">Referral Partner</Link>
          <Link to="/partners-asset">Asset Partner</Link>
          <h2 style={{ marginTop: 24 }}>Legal</h2>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.whatsappUsa.url} target="_blank" rel="noopener noreferrer">WhatsApp USA · {contact.whatsappUsa.display}</a>
          <a href={contact.whatsappEu.url} target="_blank" rel="noopener noreferrer">WhatsApp EU · {contact.whatsappEu.display}</a>
          <address className="footer-address" style={{ marginTop: 12 }}>{contact.address.map((l) => <span key={l}>{l}<br /></span>)}</address>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Orion Private Wealth Consulting LLC. All Rights Reserved.</span>
        <span><Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms of Service</Link> · <button type="button" className="footer-cookie" onClick={openCookieSettings}>Cookie settings</button></span>
      </div>
    </footer>
  );
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onOutside = (e: PointerEvent) => { if (e.target instanceof Node && !ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onOutside); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onOutside); document.removeEventListener("keydown", onKey); };
  }, []);
  return (
    <div className="whatsapp-widget" ref={ref}>
      {open && (
        <div className="whatsapp-panel" id="whatsapp-contacts">
          <h2>Contact Orion</h2>
          <Button variant="navigation" asChild><a href={contact.whatsappUsa.url} target="_blank" rel="noopener noreferrer">USA <small>{contact.whatsappUsa.display}</small><ArrowUpRight /></a></Button>
          <Button variant="navigation" asChild><a href={contact.whatsappEu.url} target="_blank" rel="noopener noreferrer">EU <small>{contact.whatsappEu.display}</small><ArrowUpRight /></a></Button>
        </div>
      )}
      <Button variant="whatsapp" size="icon" aria-label={open ? "Close WhatsApp contacts" : "Open WhatsApp contacts"} title="WhatsApp" aria-controls="whatsapp-contacts" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X /> : <WhatsAppIcon />}
      </Button>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="orion-page">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
