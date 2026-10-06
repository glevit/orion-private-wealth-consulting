import { useEffect } from "react";

export type NfField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "select" | "textarea";
  options?: string[];
  required?: boolean;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function buildHtml(name: string, fields: NfField[], submit: string, note: string | undefined, error: string) {
  const rows = fields
    .map((f) => {
      const id = `${name}-${f.name}`;
      const label = `<label for="${id}">${esc(f.label)}${f.required ? " *" : ""}</label>`;
      const req = f.required ? " required" : "";
      if (f.type === "select")
        return `<div class="field">${label}<select id="${id}" name="${f.name}">${(f.options ?? []).map((o) => `<option>${esc(o)}</option>`).join("")}</select></div>`;
      if (f.type === "textarea") return `<div class="field full">${label}<textarea id="${id}" name="${f.name}"${req}></textarea></div>`;
      return `<div class="field">${label}<input id="${id}" name="${f.name}" type="${f.type ?? "text"}"${req}></div>`;
    })
    .join("");
  return (
    `<form name="${name}" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you" data-netlify-recaptcha="true" data-error-msg="${esc(error)}" class="nf-form">` +
    `<input type="hidden" name="form-name" value="${name}">` +
    `<p style="display:none"><label>Don’t fill this out if you’re human: <input name="bot-field"></label></p>` +
    `<div class="form-grid">${rows}</div>` +
    (note ? `<p class="form-note" style="margin-top:20px">${esc(note)}</p>` : "") +
    `<div class="g-recaptcha-wrap" data-netlify-recaptcha="true" style="margin-top:20px"></div>` +
    `<div class="submit-row"><button class="editorial-button" type="submit">${esc(submit)}</button></div>` +
    `</form>`
  );
}

/**
 * The same Netlify form (same name, honeypot, reCAPTCHA and handler) used on the current site, so
 * existing form notifications and the spam protection keep working. The markup is injected as plain
 * HTML so that Netlify can detect and enhance it without React re-rendering it.
 */
export function NetlifyForm({ name, fields, submit, note, error = "There was a problem sending your message. Please try again, or reach us directly via WhatsApp." }: {
  name: string; fields: NfField[]; submit: string; note?: string; error?: string;
}) {
  useEffect(() => {
    if (document.querySelector('script[data-orion-form]')) return;
    const s = document.createElement("script");
    s.src = "/js/contact-form.js";
    s.dataset.orionForm = "1";
    document.body.appendChild(s);
  }, []);
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: buildHtml(name, fields, submit, note, error) }} />;
}
