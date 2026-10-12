// Orion Private Wealth Consulting — Geo-blocking Edge Function
// Blocca l'accesso al sito ai visitatori localizzati in:
//   - Emilia-Romagna (IT-45)
//   - Campania (IT-72)
//   - Provincia di Savona (Liguria, IT-42 + comune di Savona e provincia)

const BLOCKED_SUBDIVISIONS = new Set([
  "IT-45", // Emilia-Romagna
  "IT-72", // Campania
]);

// Netlify espone solo la regione (subdivision) e la città: la provincia non è
// disponibile. Per Savona e provincia si controlla quindi Liguria + comune.
const LIGURIA = "IT-42";
const SAVONA_PROVINCE_CITIES = new Set([
  "alassio","albenga","albisola superiore","albissola marina","altare","andora",
  "arnasco","balestrino","bardineto","bergeggi","boissano","borghetto santo spirito",
  "borgio verezzi","bormida","cairo montenotte","calice ligure","calizzano","carcare",
  "casanova lerrone","castelbianco","castelvecchio di rocca barbena","celle ligure",
  "cengio","cisano sul neva","cosseria","dego","erli","finale ligure","garlenda",
  "giustenice","giusvalla","laigueglia","loano","magliolo","mallare","massimino",
  "millesimo","mioglia","murialdo","nasino","noli","onzo","orco feglino","ortovero",
  "osiglia","pallare","piana crixia","pietra ligure","plodio","pontinvrea","quiliano",
  "rialto","roccavignale","sassello","savona","spotorno","stella","stellanello",
  "testico","toirano","tovo san giacomo","urbe","vado ligure","varazze","vendone",
  "vezzi portio","villanova d'albenga","zuccarello",
]);

const normalizeCity = (name) =>
  (name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’`]/g, "'")
    .toLowerCase()
    .trim();

export default async (request, context) => {
  const country = context.geo?.country?.code;
  const subdivision = context.geo?.subdivision?.code;

  const city = normalizeCity(context.geo?.city);
  const inSavona =
    country === "IT" && subdivision === LIGURIA && SAVONA_PROVINCE_CITIES.has(city);

  if (
    country === "IT" &&
    ((subdivision && BLOCKED_SUBDIVISIONS.has(subdivision)) || inSavona)
  ) {
    return new Response(
      `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Contenuto non disponibile</title>
  <meta name="robots" content="noindex">
  <style>
    body { font-family: -apple-system, sans-serif; background:#0b0b0d; color:#C9A24B;
           display:flex; align-items:center; justify-content:center; height:100vh; margin:0; }
    .box { text-align:center; padding:2rem; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Contenuto non disponibile nella tua area</h1>
    <p>Questo sito non è al momento accessibile dalla tua regione.</p>
  </div>
</body>
</html>`,
      {
        status: 451,
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      }
    );
  }
  // Redirect delle vecchie URL .html verso la versione pulita
    const url = new URL(request.url);
    if (url.pathname.endsWith(".html")) {
          url.pathname = url.pathname.slice(0, -5);
          return Response.redirect(url.toString(), 301);
    }
  
  return context.next();
};

export const config = {
  path: "/*",
  excludedPath: ["/css/*", "/images/*", "/js/*", "/robots.txt", "/sitemap.xml", "/llms.txt"],
};
