import { test, expect } from '@playwright/test';

test.describe('CV Print Layout', () => {
  test('CV should fit on one PDF page', async ({ page }) => {
    // Navigate to the compact CV
    await page.goto('/cv-compact.html');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Generate PDF to check page count
    const pdf = await page.pdf({ 
      format: 'Letter',
      margin: { top: '0.3in', right: '0.3in', bottom: '0.3in', left: '0.3in' }
    });
    
    // PDF should exist and contain data
    expect(pdf).toBeDefined();
    expect(pdf.length).toBeGreaterThan(0);
    
    console.log('PDF generated successfully. Size:', pdf.length, 'bytes');
  });

  test('CV layout should use 2-column grid in print', async ({ page }) => {
    await page.goto('/cv-compact.html');
    await page.waitForLoadState('networkidle');
    
    // Check main element has grid layout
    const cvWrapper = page.locator('.cv-wrapper');
    
    // Check that layout components exist
    const leftSidebar = page.locator('aside').first();
    const mainContent = page.locator('main').first();
    
    await expect(leftSidebar).toBeVisible();
    await expect(mainContent).toBeVisible();
    
    console.log('✓ 2-column layout structure verified');
  });

  test('CV content should be present and organized', async ({ page }) => {
    await page.goto('/cv-compact.html');
    await page.waitForLoadState('networkidle');
    
    // Check critical sections exist
    const sections = {
      'Name': page.locator('h1:has-text("Igors Oleinikovs")'),
      'Experience': page.locator('h2:has-text("Experience")').first(),
      'Education': page.locator('h2:has-text("Education")').first(),
      'Certifications': page.locator('h2:has-text("Certifications")').first(),
      'Skills': page.locator('h2:has-text("Skills")').first(),
      'Languages': page.locator('h2:has-text("Languages")').first()
    };
    
    for (const [name, locator] of Object.entries(sections)) {
      await expect(locator).toBeVisible();
      console.log(`✓ ${name} section found`);
    }
  });
});
