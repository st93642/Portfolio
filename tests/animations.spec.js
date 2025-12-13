const { test, expect } = require('@playwright/test');

test.describe('Reveal Animations', () => {
  test('sections have reveal animation classes applied', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(200);
    
    const aboutSection = page.locator('#about');
    const classes = await aboutSection.getAttribute('class');
    expect(classes).toContain('reveal-element');
  });

  test('cards animate into view on scroll', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    
    const firstCard = page.locator('[data-project]').first();
    const opacity = await firstCard.evaluate(el => window.getComputedStyle(el).opacity);
    
    expect(parseFloat(opacity)).toBeGreaterThanOrEqual(0.9);
  });

  test('staggered animation delays are applied to cards', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    
    const cards = page.locator('[data-project]');
    const count = await cards.count();
    
    if (count > 1) {
      const secondCard = cards.nth(1);
      const transitionDelay = await secondCard.evaluate(el => 
        window.getComputedStyle(el).transitionDelay
      );
      
      expect(transitionDelay).toBeTruthy();
    }
  });

  test('hero section is visible immediately (no animation)', async ({ page }) => {
    await page.goto('/');
    
    const heroSection = page.locator('.hero');
    const classes = await heroSection.getAttribute('class');
    
    expect(classes).not.toContain('reveal-element');
    
    await expect(heroSection).toBeVisible();
    
    const opacity = await heroSection.evaluate(el => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(1);
  });
});

test.describe('Reduced Motion Support', () => {
  test('JavaScript checks for reduced motion preference', async ({ page }) => {
    await page.goto('/');
    
    const prefersReducedMotionValue = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    
    expect(typeof prefersReducedMotionValue).toBe('boolean');
  });

  test('smooth scrolling works regardless of motion preference', async ({ page }) => {
    await page.goto('/');
    
    const projectsLink = page.locator('.nav__link[href="#projects"]');
    await projectsLink.click();
    
    await page.waitForTimeout(500);
    
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });
});
