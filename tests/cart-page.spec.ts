import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

test('the empty cart is ready from the home page', async ({ page }) => {
  await page.goto('/');
  const cart = page.getByRole('link', { name: /^Cart/ });

  await instant(page, async () => {
    await cart.click();
    await page.waitForURL('/cart');
    await expect(page.getByText('Your cart is empty.')).toBeVisible();
    await expect(page.getByRole('link', { exact: true, name: 'Browse products' })).toBeVisible();
  });
});
