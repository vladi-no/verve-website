# Verve Website

Static website scaffold for the client project in `/Users/vladino/Documents/GitHub/verve-website`.

## Current stack

- Plain HTML
- Plain CSS
- Plain JavaScript
- No build step required

## Files

- `index.html` contains the page structure
- `styles.css` contains the visual system and responsive layout
- `main.js` contains small reveal animations

## Local preview

Because this is a static site, you can preview it with any simple local server.

Examples:

```bash
python3 -m http.server 8000
```

or

```bash
npx serve .
```

Then open `http://localhost:8000`.

## GitHub setup

The folder is initialized as a git repository locally. To publish it under GitHub user `vladi-no`, create an empty GitHub repository and then connect it:

```bash
git remote add origin git@github.com:vladi-no/verve-website.git
git add .
git commit -m "Initial static site scaffold"
git push -u origin main
```

## What is still needed from Figma

The provided Figma URL was not readable from this environment, so the exact UI cannot be implemented from the link alone yet.

To build the real design, provide one of these:

1. Public Figma inspect access
2. Full-page screenshots for desktop and mobile
3. Exported assets such as logos, icons, and images
4. Brand fonts, colors, and final copy if they are not embedded in the exports

## Recommended workflow

1. Export or capture every page section from Figma.
2. Drop image assets into an `assets/` folder.
3. Replace placeholder sections with the final design.
4. Test desktop and mobile layouts.
5. Push to GitHub and deploy on a static host such as GitHub Pages, Netlify, or Vercel.
