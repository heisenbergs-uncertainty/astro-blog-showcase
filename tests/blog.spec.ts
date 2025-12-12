import { test, expect } from '@playwright/test';

test('blog list renders', async ({ page }) => {
  await page.goto('/blog');
  const blogCards = page.locator('.card');
  // We added 3 more posts, plus the original 1 = 4 total
  await expect(blogCards).toHaveCount(4); 
});

test('blog post navigation', async ({ page }) => {
  await page.goto('/blog');
  // Click specifically on the 3D Printing post
  await page.locator('.card-link', { hasText: 'Getting into 3D Printing' }).click();
  await expect(page).toHaveURL(/.*3d-printing/);
  await expect(page.locator('h1.title')).toContainText('Getting into 3D Printing');
});
