import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

const visible = { visible: true };

test('a product page includes its cached product content', async ({ page }) => {
  await page.goto('/all');
  const product = page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible);
  await product.scrollIntoViewIfNeeded();

  await instant(page, async () => {
    await product.click();
    await page.waitForURL('/product/4');
    await expect(page.getByRole('heading', { exact: true, name: 'Wireless Mouse' })).toBeVisible();
    await expect(page.getByRole('heading', { exact: true, name: 'Product Details' })).toBeVisible();
    await expect(page.getByRole('button', { exact: true, name: 'Add to cart' })).toHaveCount(0);
  });

  await expect(page.getByRole('button', { exact: true, name: 'Add to cart' })).toBeVisible();
});
