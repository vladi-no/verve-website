# Verve Website

Static client website hosted on GitHub Pages at `verve.vladi.no`.

## Current stack

- Plain HTML
- Plain CSS
- Plain JavaScript
- No build step required

## Files

- `index.html`, `home.css`, and `home.js` implement the current homepage and responsive navigation
- `press.html` is a retained standalone Press placeholder; homepage navigation uses the in-page Press section instead
- `assets/img/` contains optimized WebP images, including smaller responsive variants
- `assets/fonts/` contains the homepage fonts extracted from the client reference

## Homepage Features

Homepage navigation scrolls to Featured, About, Press, and Contact. The supplied
studio introduction provides the About content; project descriptions are shown
as text.

Press contains four fictional releases for the Atlanta, Georgia studio in a
horizontal carousel, with left/right arrows and mobile swipe scrolling. The
section is labeled "Studio news" and still needs final client-approved content.
Instagram and LinkedIn links remain placeholders pending real destinations.

The contact form has required Name, Email, and Message fields. It is not connected
to a submission service: JavaScript currently prevents submission without sending
data or showing a success message. The email link remains available.

The hero and pool image slowly zoom in; the image with the woman slowly zooms out.
Animations run for 18 seconds, and featured images start once when they enter
view. Visitors who prefer reduced motion see static images.

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
