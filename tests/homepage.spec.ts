import { test, expect } from '@playwright/test';

test.describe('Homepage Enhancements', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('displays featured projects section', async ({ page }) => {
        const section = page.locator('#featured-projects');
        await expect(section).toBeVisible();
        await expect(section.getByText('Featured Projects')).toBeVisible();
        
        // Should show projects tagged with 'Favorite'
        await expect(section.getByText('Space Explorer VR')).toBeVisible();
        await expect(section.getByText('Exo-Constellation')).toBeVisible();
        
        // Should NOT show non-favorite projects within this section
        await expect(section.getByText('Legacy API Wrapper')).not.toBeVisible();
    });

    test('displays latest posts section', async ({ page }) => {
        const section = page.locator('#latest-posts');
        await expect(section).toBeVisible();
        await expect(section.getByText('Latest from the Blog')).toBeVisible();

        await expect(section.getByText('Getting into 3D Printing')).toBeVisible();
        await expect(section.getByText('Rust for WebAssembly')).toBeVisible();
        await expect(section.getByText('Why I Switched to Vim')).toBeVisible();
        
        const cards = section.locator('.card');
        await expect(cards).toHaveCount(3);
    });
});
