const { test, expect } = require('@playwright/test');

test.describe('Accessibility Features', () => {
  test('page has proper semantic HTML structure', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
  });

  test('sections have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toHaveAttribute('aria-labelledby', 'about-title');
    
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toHaveAttribute('aria-labelledby', 'projects-title');
    
    const notesSection = page.locator('#notes');
    await expect(notesSection).toHaveAttribute('aria-labelledby', 'notes-title');
    
    const contactSection = page.locator('#contact');
    await expect(contactSection).toHaveAttribute('aria-labelledby', 'contact-title');
  });

  test('navigation links have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');
    
    const navLinks = page.locator('.nav__link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^#\w+/);
    }
  });

  test('external links have security attributes', async ({ page }) => {
    await page.goto('/');
    
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('form elements and buttons have proper labels', async ({ page }) => {
    await page.goto('/');
    
    const navToggle = page.locator('.nav__toggle');
    await expect(navToggle).toHaveAttribute('aria-label', 'Toggle navigation menu');
    await expect(navToggle).toHaveAttribute('aria-expanded');
    await expect(navToggle).toHaveAttribute('aria-controls', 'nav-menu');
    
    const brandLink = page.locator('.brand');
    await expect(brandLink).toHaveAttribute('aria-label', 'Go to top');
  });

  test('keyboard navigation works for main links', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    
    await page.keyboard.press('Enter');
    
    const main = page.locator('#main');
    await expect(main).toBeFocused();
  });

  test('noscript fallback messages are present', async ({ page, context }) => {
    await context.route('**/*.js', route => route.abort());
    await page.goto('/');
    
    const content = await page.content();
    expect(content).toContain('noscript');
  });
});

test.describe('Responsive Design', () => {
  test('site is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('.nav__toggle')).toBeVisible();
  });

  test('site is responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('.nav__list')).toBeVisible();
  });

  test('site is responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('.nav__list')).toBeVisible();
  });
});
