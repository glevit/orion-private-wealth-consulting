import { useEffect, useState } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; orionLoadClarity?: () => void }
}

/** Same consent logic as the current site: Google Consent Mode v2, everything denied until the visitor accepts. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("orion_consent"); } catch { /* storage unavailable */ }
    if (!stored) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("orion-cookie-open", reopen);
    return () => window.removeEventListener("orion-cookie-open", reopen);
  }, []);
  function choose(granted: boolean) {
    const v = granted ? "granted" : "denied";
    window.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
    try { localStorage.setItem("orion_consent", v); } catch { /* storage unavailable */ }
    if (granted) window.orionLoadClarity?.();
    setOpen(false);
  }
  if (!open) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p>We use cookies to improve your experience and analyze site usage. You can accept or decline non-essential cookies at any time.</p>
      <div className="cookie-actions">
        <button type="button" className="consultation-button" onClick={() => choose(false)}>Essential only</button>
        <button type="button" className="editorial-button" onClick={() => choose(true)}>Accept</button>
      </div>
    </div>
  );
}

export function openCookieSettings() { window.dispatchEvent(new Event("orion-cookie-open")); }
