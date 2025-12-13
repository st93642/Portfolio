# Portfolio

Beginner-friendly static site scaffold using plain HTML, CSS, and JavaScript.

## Structure

- `index.html` - page markup (semantic sections + anchor navigation)
- `assets/css/styles.css` - styles (includes sticky header and responsive cards)
- `assets/js/main.js` - small enhancements (smooth scrolling, active nav state, renders Projects + Notes from arrays)
- `assets/img/` - images (currently includes a project screenshot placeholder SVG)

## Run locally

You can open `index.html` directly, or serve the folder (recommended so relative links and future fetches work):

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Updating content

- Edit your projects + notes in `assets/js/main.js`.
- Update Contact links directly in `index.html`.
