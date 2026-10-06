<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The site is multi-page (English): one route per page, matching the original site's URLs (/services, /markets, /who-we-are, /how-it-works, /partners, /faq, /blog, /blog-<slug>, /contact, /privacy, /terms). Shared header, footer and WhatsApp button live in src/components/site/SiteLayout.tsx; use shared Button variants for actions.
- Page text comes from the original site (src/content/original.ts is generated from it); do not rewrite wording without the owner's approval.
- The floating WhatsApp button is gold (var(--gold)), never green.
- Define all visual styling and theme roles in src/styles.css; this keeps the editorial design consistent across screen sizes.
- Prebundle the shared Button's Radix composition dependencies at startup; this prevents late dependency discovery from mixing React module generations in the preview.
- Keep language options linked to the verified localized original site until preview translations are supplied; this avoids presenting untranslated content as a language switch.
- Use verified original contact destinations and externalized brand assets; this preserves the business identity without fabricating contact details.
