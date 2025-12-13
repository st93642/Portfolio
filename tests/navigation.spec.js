const { test, expect } = require('@playwright/test');

test.describe('Navigation Features', () => {
  test('smooth scrolling works for internal links', async ({ page }) => {
    await page.goto('/');
    
    const projectsLink = page.locator('.nav__link[href="#projects"]');
    await projectsLink.click();
    
    await page.waitForTimeout(500);
    
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('active navigation link updates on scroll', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    const aboutLink = page.locator('.nav__link[href="#about"]');
    await expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  test('back to top link in footer works', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    const backToTopLink = page.locator('.footer__link[href="#top"]');
    await backToTopLink.click();
    
    await page.waitForTimeout(500);
    
    const heroSection = page.locator('#top');
    await expect(heroSection).toBeInViewport();
  });

  test('brand logo link returns to top', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    const brandLink = page.locator('.brand[href="#top"]');
    await brandLink.click();
    
    await page.waitForTimeout(500);
    
    const heroSection = page.locator('#top');
    await expect(heroSection).toBeInViewport();
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile menu toggle button is visible on mobile', async ({ page }) => {
    await page.goto('/');
    
    const navToggle = page.locator('.nav__toggle');
    await expect(navToggle).toBeVisible();
    await expect(navToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/');
    
    const navToggle = page.locator('.nav__toggle');
    const navMenu = page.locator('.nav__list');
    const navOverlay = page.locator('.nav__overlay');
    
    await navToggle.click();
    await expect(navToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(navMenu).toHaveClass(/nav--open/);
    await expect(navOverlay).toHaveClass(/nav--open/);
    
    await navToggle.click({ force: true });
    await expect(navToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navMenu).not.toHaveClass(/nav--open/);
  });

  test('mobile menu closes when clicking a nav link', async ({ page }) => {
    await page.goto('/');
    
    const navToggle = page.locator('.nav__toggle');
    const navMenu = page.locator('.nav__list');
    
    await navToggle.click();
    await expect(navMenu).toHaveClass(/nav--open/);
    
    const aboutLink = page.locator('.nav__link[href="#about"]');
    await aboutLink.click();
    
    await page.waitForTimeout(300);
    await expect(navMenu).not.toHaveClass(/nav--open/);
  });

  test('mobile menu closes when clicking overlay', async ({ page }) => {
    await page.goto('/');
    
    const navToggle = page.locator('.nav__toggle');
    const navMenu = page.locator('.nav__list');
    const navOverlay = page.locator('.nav__overlay');
    
    await navToggle.click();
    await expect(navMenu).toHaveClass(/nav--open/);
    
    await navOverlay.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(300);
    
    await expect(navMenu).not.toHaveClass(/nav--open/);
  });

  test('mobile menu closes on Escape key', async ({ page }) => {
    await page.goto('/');
    
    const navToggle = page.locator('.nav__toggle');
    const navMenu = page.locator('.nav__list');
    
    await navToggle.click();
    await expect(navMenu).toHaveClass(/nav--open/);
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    
    await expect(navMenu).not.toHaveClass(/nav--open/);
  });
});
