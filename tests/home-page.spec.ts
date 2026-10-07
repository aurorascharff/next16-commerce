import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

test('the home page is ready from the About page', async ({ page }) => {
  await page.goto('/about');
  const startShopping = page.getByRole('link', { exact: true, name: 'Start Shopping' });

  await instant(page, async () => {
    await startShopping.click();
    await page.waitForURL('/');
    await expect(page.getByText('Fall Conference Special')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Featured Categories' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
  });
});
