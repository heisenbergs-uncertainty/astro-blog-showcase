import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/DevPortfolio/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Portfolio');
  await expect(page).toHaveURL(/.*portfolio/);
  await expect(page.locator('h1.title')).toContainText('Selected Works');

  await page.click('text=Blog');
  await expect(page).toHaveURL(/.*blog/);
  await expect(page.locator('h1.title')).toContainText('Thoughts & Hobbies');
});
