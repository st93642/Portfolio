const { test, expect } = require('@playwright/test');

test.describe('Portfolio Site - Basic Functionality', () => {
  test('page loads with correct title and meta information', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Igors.*Portfolio/);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /beginner-friendly portfolio scaffold/i);
    
    const metaAuthor = page.locator('meta[name="author"]');
    await expect(metaAuthor).toHaveAttribute('content', 'Igors');
  });

  test('all main sections are present', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('#top')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#notes')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('hero section displays correct content', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('.hero__title')).toContainText('I build simple, useful software');
    await expect(page.locator('.eyebrow')).toContainText("Hi, I'm Igors");
    
    const projectsButton = page.locator('.hero__actions a[href="#projects"]');
    await expect(projectsButton).toBeVisible();
    
    const contactButton = page.locator('.hero__actions a[href="#contact"]');
    await expect(contactButton).toBeVisible();
  });

  test('footer displays current year', async ({ page }) => {
    await page.goto('/');
    
    const currentYear = new Date().getFullYear().toString();
    const yearElement = page.locator('[data-year]');
    await expect(yearElement).toHaveText(currentYear);
  });

  test('skip link is available for accessibility', async ({ page }) => {
    await page.goto('/');
    
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveText('Skip to content');
    await expect(skipLink).toHaveAttribute('href', '#main');
  });
});
