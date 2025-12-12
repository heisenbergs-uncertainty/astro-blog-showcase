import { test, expect } from '@playwright/test';

test('portfolio list renders', async ({ page }) => {
  await page.goto('/portfolio');
  const projectCards = page.locator('.card');
  // We added 2 more projects, plus the original 1 = 3 total
  await expect(projectCards).toHaveCount(3); 
});

test('project card details', async ({ page }) => {
  await page.goto('/portfolio');
  const card = page.locator('.card').first();
  await expect(card).toContainText('Exo-Constellation');
  await expect(card).toContainText('Astro');
  await expect(card).toContainText('Bulma');
});
