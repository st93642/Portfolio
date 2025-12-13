const { test, expect } = require('@playwright/test');

test.describe('Dynamic Content Rendering', () => {
  test('projects are rendered correctly', async ({ page }) => {
    await page.goto('/');
    
    const projectCards = page.locator('[data-project]');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
    
    const firstProject = projectCards.first();
    await expect(firstProject.locator('[data-project-title]')).toBeVisible();
    await expect(firstProject.locator('[data-project-description]')).toBeVisible();
    await expect(firstProject.locator('[data-project-tech]')).toBeVisible();
  });

  test('project cards have all required elements', async ({ page }) => {
    await page.goto('/');
    
    const firstProject = page.locator('[data-project]').first();
    
    await expect(firstProject.locator('[data-project-title]')).toContainText(/\w+/);
    await expect(firstProject.locator('[data-project-description]')).toContainText(/\w+/);
    
    const techList = firstProject.locator('[data-project-tech] li');
    const techCount = await techList.count();
    expect(techCount).toBeGreaterThan(0);
    
    const githubLink = firstProject.locator('[data-project-github]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const demoLink = firstProject.locator('[data-project-demo]');
    await expect(demoLink).toBeVisible();
    await expect(demoLink).toHaveAttribute('target', '_blank');
    
    const projectImage = firstProject.locator('[data-project-image]');
    await expect(projectImage).toBeVisible();
    await expect(projectImage).toHaveAttribute('src', /\.(svg|png|jpg|jpeg|webp)/i);
    await expect(projectImage).toHaveAttribute('alt');
  });

  test('specific project content matches data', async ({ page }) => {
    await page.goto('/');
    
    const taskFlowProject = page.locator('[data-project]').filter({ 
      hasText: 'TaskFlow' 
    });
    
    await expect(taskFlowProject).toBeVisible();
    await expect(taskFlowProject).toContainText('Personal Task Manager');
    await expect(taskFlowProject).toContainText('LocalStorage');
  });

  test('notes/blog posts are rendered correctly', async ({ page }) => {
    await page.goto('/');
    
    const noteCards = page.locator('[data-note]');
    const count = await noteCards.count();
    expect(count).toBeGreaterThan(0);
    
    const firstNote = noteCards.first();
    await expect(firstNote.locator('[data-note-title]')).toBeVisible();
    await expect(firstNote.locator('[data-note-date]')).toBeVisible();
    await expect(firstNote.locator('[data-note-summary]')).toBeVisible();
    await expect(firstNote.locator('[data-note-link]')).toBeVisible();
  });

  test('note dates are formatted correctly', async ({ page }) => {
    await page.goto('/');
    
    const firstNoteDate = page.locator('[data-note-date]').first();
    const dateText = await firstNoteDate.textContent();
    
    expect(dateText).toMatch(/\w+.*\d+.*\d{4}/);
  });
});

test.describe('Contact Section', () => {
  test('contact information is present', async ({ page }) => {
    await page.goto('/');
    
    const contactSection = page.locator('#contact');
    
    const emailLink = contactSection.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    
    const linkedInLink = contactSection.locator('a[href*="linkedin.com"]');
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute('target', '_blank');
    await expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const githubLink = contactSection.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
