// Orion Private Wealth Consulting — Geo-blocking Edge Function
// Blocca l'accesso al sito ai visitatori localizzati in:
//   - Emilia-Romagna (IT-45)
//   - Campania (IT-72)

const BLOCKED_SUBDIVISIONS = new Set([
  "IT-45", // Emilia-Romagna
  "IT-72", // Campania
]);

export default async (request, context) => {
  const country = context.geo?.country?.code;
  const subdivision = context.geo?.subdivision?.code;

  if (country === "IT" && subdivision && BLOCKED_SUBDIVISIONS.has(subdivision)) {
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

  return context.next();
};

export const config = {
  path: "/*",
};
