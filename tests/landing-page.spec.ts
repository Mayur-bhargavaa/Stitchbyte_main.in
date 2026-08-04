import { test, expect } from '@playwright/test';

test.describe('StitchByte Landing Page Smoke Tests', () => {
  test('should load the homepage and render key elements', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Check title of page contains StitchByte
    await expect(page).toHaveTitle(/StitchByte/i);

    // Verify main header/navigation is present
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verify desktop navigation brand or links exist
    const prebuiltLink = page.locator('header nav >> text=Prebuilt').first();
    await expect(prebuiltLink).toBeVisible();

    const customizedLink = page.locator('header nav >> text=Customized').first();
    await expect(customizedLink).toBeVisible();
  });

  test('should check responsiveness toggling mobile menu', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify hamburger menu button is visible on mobile
    const hamburgerBtn = page.locator('header nav button').first();
    await expect(hamburgerBtn).toBeVisible();

    const mobileDropdownLink = page.locator('header div.overflow-hidden a[href="/prebuilt"]');

    // Verify dropdown content is NOT visible initially
    await expect(mobileDropdownLink).not.toBeVisible();

    // Click hamburger button to open mobile menu
    await hamburgerBtn.click();

    // Mobile menu dropdown link should now be visible
    await expect(mobileDropdownLink).toBeVisible();
  });
});
