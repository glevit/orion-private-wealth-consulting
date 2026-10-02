#!/usr/bin/env node
// IndexNow submitter for orionprivatewealthconsulting.com
// Usage:
//   node scripts/indexnow.mjs --all                      submit every URL in sitemap.xml
//   node scripts/indexnow.mjs --changed <base> <head>    submit only pages changed between two commits
// Options:
//   --dry-run                 print what would be sent, send nothing
//   --sitemap-file <path>     read the sitemap from a local file (testing)
// Env (all optional, defaults below):
//   INDEXNOW_HOST, INDEXNOW_KEY, SITEMAP_URL, PUBLISH_DIR (e.g. "public" if HTML lives in a subfolder)

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const HOST = process.env.INDEXNOW_HOST || "orionprivatewealthconsulting.com";
const KEY = process.env.INDEXNOW_KEY || "a16bc216818848fda62ae4b14ced3c7e";
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;
const PUBLISH_DIR = (process.env.PUBLISH_DIR || "").replace(/^\/|\/$/g, "");
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const BATCH = 10000;

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => args[args.indexOf(f) + 1];
const dryRun = has("--dry-run");

const norm = (u) => u.replace(/\/+$/, "").replace(/\.html$/, "").toLowerCase();

async function fetchText(url) {
  const r = await fetch(url, { headers: { "user-agent": "indexnow-script" } });
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  return r.text();
}

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

async function sitemapUrls() {
  const xml = has("--sitemap-file") ? readFileSync(val("--sitemap-file"), "utf8") : await fetchText(SITEMAP_URL);
  let urls = [];
  if (xml.includes("<sitemapindex")) {
    for (const child of locs(xml)) urls.push(...locs(await fetchText(child)));
  } else {
    urls = locs(xml);
  }
  return [...new Set(urls)].filter((u) => new URL(u).host.replace(/^www\./, "") === HOST);
}

function fileToUrl(file) {
  let p = file;
  if (PUBLISH_DIR) {
    if (!p.startsWith(PUBLISH_DIR + "/")) return null;
    p = p.slice(PUBLISH_DIR.length + 1);
  }
  if (!p.endsWith(".html")) return null;
  if (/(^|\/)(node_modules|\.github|_[^/]*)\//.test(p)) return null;
  p = p.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
  return `https://${HOST}/${p}`;
}

function changedFiles(base, head) {
  const zero = /^0+$/.test(base);
  const range = zero ? `${head}~1 ${head}` : `${base} ${head}`;
  const out = execSync(`git diff --name-status ${range}`, { encoding: "utf8" });
  const upserts = [], deletes = [];
  for (const line of out.split("\n").filter(Boolean)) {
    const [status, ...paths] = line.split("\t");
    if (status.startsWith("D")) deletes.push(paths[0]);
    else if (status.startsWith("R")) { deletes.push(paths[0]); upserts.push(paths[1]); }
    else upserts.push(paths[paths.length - 1]);
  }
  return { upserts, deletes };
}

async function submit(urls) {
  if (!urls.length) { console.log("Nothing to submit."); return; }
  for (let i = 0; i < urls.length; i += BATCH) {
    const chunk = urls.slice(i, i + BATCH);
    const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: chunk };
    if (dryRun) { console.log(`[dry-run] would POST ${chunk.length} URLs`); continue; }
    const r = await fetch(ENDPOINT, { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify(body) });
    console.log(`POST ${chunk.length} URLs -> HTTP ${r.status}`);
    if (![200, 202].includes(r.status)) { console.error(await r.text()); process.exitCode = 1; }
  }
}

(async () => {
  const sm = await sitemapUrls();
  const smMap = new Map(sm.map((u) => [norm(u), u]));
  console.log(`Sitemap: ${sm.length} URLs`);

  let toSend = [];
  if (has("--all")) {
    toSend = sm;
  } else if (has("--changed")) {
    const base = args[args.indexOf("--changed") + 1];
    const head = args[args.indexOf("--changed") + 2];
    const { upserts, deletes } = changedFiles(base, head);
    for (const f of upserts) {
      const u = fileToUrl(f);
      if (u && smMap.has(norm(u))) toSend.push(smMap.get(norm(u))); // only pages that are in the sitemap
      else if (u) console.log(`skip (not in sitemap): ${u}`);
    }
    for (const f of deletes) {
      const u = fileToUrl(f);
      if (u) toSend.push(u); // deleted pages: tell engines they are gone
    }
  } else {
    console.error("Use --all or --changed <base> <head>"); process.exit(2);
  }
  toSend = [...new Set(toSend)];
  console.log(`To submit: ${toSend.length}`);
  if (dryRun) toSend.slice(0, 20).forEach((u) => console.log("  " + u));
  await submit(toSend);
})().catch((e) => { console.error(e); process.exit(1); });
