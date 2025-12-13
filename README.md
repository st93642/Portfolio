# Portfolio

Beginner-friendly static site scaffold using plain HTML, CSS, and JavaScript.

## Structure

- `index.html` - page markup (semantic sections + anchor navigation)
- `assets/css/styles.css` - styles (includes sticky header and responsive cards)
- `assets/js/main.js` - small enhancements (smooth scrolling, active nav state, renders Projects + Notes from arrays)
- `assets/img/` - images (currently includes a project screenshot placeholder SVG)

## Local Preview

You can open `index.html` directly in a browser, or serve the folder (recommended so relative links work correctly):

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then visit http://localhost:8000 in your browser.

## Updating Content

### Projects

1. Open `assets/js/main.js`
2. Find the `PROJECTS` array near the top
3. Edit existing projects or add new ones:

```javascript
{
  title: "Your Project Name",
  description: "A brief description of what this project does.",
  tech: ["JavaScript", "HTML", "CSS"],
  githubUrl: "https://github.com/your-handle/your-repo",
  demoUrl: "https://your-demo-url.com",
  imageUrl: "assets/img/your-screenshot.png",
  imageAlt: "Screenshot description for accessibility",
}
```

4. Save the file - the cards will update automatically

### Blog Posts / Notes

1. Open `assets/js/main.js`
2. Find the `NOTES` array
3. Add or edit entries:

```javascript
{
  title: "Your Blog Post Title",
  date: "2025-01-15", // YYYY-MM-DD format
  summary: "A short summary or excerpt from your post.",
  url: "/blog/your-post.html", // or external URL
}
```

4. Create corresponding HTML files in a `blog/` folder, or link to external posts

### Contact Information & Social Links

Edit the Contact section directly in `index.html` (around line 177):

```html
<li>
  <strong>Email:</strong>
  <a href="mailto:your-email@example.com">your-email@example.com</a>
</li>
<li>
  <strong>LinkedIn:</strong>
  <a href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noopener noreferrer">linkedin.com/in/your-handle</a>
</li>
```

Also update:
- Line 7: `<meta name="author" content="Your Name" />`
- Line 10-12: Open Graph metadata
- Line 14: `<title>Your Name | Portfolio</title>`
- Line 24: Brand name in header
- Line 49: Name in hero section

## GitHub Pages Deployment

### Initial Setup

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in the left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

3. **Wait for deployment:**
   - The workflow will run automatically
   - Your site will be live at `https://your-username.github.io/your-repo-name/`

### Monitoring the Workflow

- **View workflow runs:** Go to the **Actions** tab in your GitHub repository
- **Check status:** Look for the "Deploy to GitHub Pages" workflow
- **View logs:** Click on any workflow run to see detailed logs
- **Troubleshoot:** If the workflow fails, check the error messages in the logs

The workflow file is at `.github/workflows/pages.yml` and runs automatically on every push to `main`.

### Custom Domain (Optional)

1. **Create a CNAME file** in the repository root:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS** with your domain provider:
   - Add an `A` record pointing to GitHub's IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a `CNAME` record pointing to `your-username.github.io`

3. **Update GitHub Pages settings:**
   - Go to **Settings** → **Pages**
   - Enter your custom domain
   - Enable **Enforce HTTPS** (recommended)

4. **Wait for DNS propagation** (can take up to 48 hours, usually much faster)

For more details, see [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Adding New Images

1. Add your images to the `assets/img/` folder
2. Reference them in `assets/js/main.js` with the path: `assets/img/your-image.png`
3. Always include descriptive `imageAlt` text for accessibility

## Tips

- **Keep it simple:** This scaffold works with zero dependencies or build tools
- **Test locally first:** Always preview changes with a local server before pushing
- **Progressive enhancement:** The site works without JavaScript; JS adds polish
- **Accessibility:** The site includes semantic HTML, ARIA labels, and keyboard support
- **Mobile-friendly:** Responsive design with mobile navigation works out of the box

## License

MIT (see LICENSE file)
