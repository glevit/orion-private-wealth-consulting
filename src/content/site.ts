export const originalSite = "https://orionprivatewealthconsulting.com";
export const contact = {
  email: "giacomo@orionprivatewealthconsulting.com",
  privacyEmail: "admin@orionprivatewealthconsulting.com",
  whatsappUsa: { url: "https://wa.me/17865786373", display: "+1 786 578 6373" },
  whatsappEu: { url: "https://wa.me/393406488167", display: "+39 340 648 8167" },
  address: ["1000 Brickell Avenue", "Suite #715 PMB 151", "Miami FL 33131 USA"],
};
export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Who We Are", to: "/who-we-are" },
  { label: "Services", to: "/services" },
  { label: "Markets", to: "/markets" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Partners", to: "/partners" },
  { label: "FAQ", to: "/faq" },
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;
// code, native label, flag file (same flag set as the original site)
export const languages = [
  ["en", "English", "gb"], ["ru", "Русский", "ru"], ["uk", "Українська", "ua"], ["ar", "العربية", "ae"],
  ["zh", "中文", "cn"], ["de", "Deutsch", "de"], ["hi", "हिन्दी", "in"], ["fr", "Français", "fr"],
  ["he", "עברית", "il"], ["es", "Español", "es"], ["pt", "Português", "pt"], ["ko", "한국어", "kr"], ["ja", "日本語", "jp"], ["it", "Italiano", "it"],
] as const;
// The 13 translated sites live on the same domain (/ru/, /de/ ...). /markets/dubai has no translation.
export function localizedUrl(code: string, pathname: string) {
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const safe = path.startsWith("/markets/") ? "/markets" : path;
  return `/${code}${safe === "/" ? "/" : safe}`;
}
export function seo(title: string, description: string, path?: string) {
  const canonical = path === undefined ? [] : [{ rel: "canonical", href: `${originalSite}${path === "/" ? "/" : path}` }];
  const alternates =
    path === undefined || path.startsWith("/markets/")
      ? []
      : languages.map(([code]) => ({
          rel: "alternate",
          hrefLang: code,
          href: code === "en" ? `${originalSite}${path}` : `${originalSite}/${code}${path === "/" ? "/" : path}`,
        }));
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: `${originalSite}/images/logo-card.png` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [...canonical, ...alternates],
  };
}
