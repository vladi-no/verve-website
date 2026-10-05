# Verve Website

Static client website hosted on GitHub Pages at `verve.vladi.no`.

## Current stack

- Plain HTML
- Plain CSS
- Plain JavaScript
- No build step required

## Files

- `index.html`, `home.css`, and `home.js` implement the current homepage and responsive navigation
- `assets/img/` contains optimized WebP images, including smaller responsive variants
- `assets/fonts/` contains the homepage fonts extracted from the client reference

## Local preview

Because this is a static site, you can preview it with any simple local server.

Examples:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

GitHub Pages publishes the root of `main` in `vladi-no/verve-website`. Keep the
`CNAME` file so the custom domain remains configured. After committing changes:

```bash
git push origin main
```

## Design Reference

The homepage follows the client-provided `VERVE Homepagev1.html` in
`/Users/vladino/Documents/GitHub/Side-Files-Personal/Verve-files/`. Its embedded
photography, transparent logo, fonts, and copy have been extracted into regular
static assets. The homepage does not need the reference's bundler or React runtime.

Homepage navigation scrolls to Featured, About, Press, and Contact. The supplied
studio introduction provides the About content. Press and social links remain
placeholders pending final content and destinations; project descriptions are
shown as text. The previous design's pages, stylesheet, and script have been
removed. Browser verification is handled by the project owner.
