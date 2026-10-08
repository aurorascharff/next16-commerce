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

  const cartButton = page.getByRole('button', { exact: true, name: 'Add to cart' });
  await expect(cartButton).toBeVisible();
  await expect(cartButton).toHaveAttribute('aria-pressed', 'false');

  await cartButton.click();
  await expect(cartButton).toHaveAttribute('aria-pressed', 'true');
  await expect(cartButton).toContainText('Remove from cart');

  await cartButton.click();
  await expect(cartButton).toHaveAttribute('aria-pressed', 'false');
  await expect(cartButton).toContainText('Add to cart');
});
