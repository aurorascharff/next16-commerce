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

  await cartButton.click();
  const removeFromCartButton = page.getByRole('button', { exact: true, name: 'Remove from cart' });
  await expect(removeFromCartButton).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cart with 1 item' })).toBeVisible();

  await page.getByRole('button', { exact: true, name: 'Back' }).click();
  await page.waitForURL('/all');

  const sameProduct = page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible);
  await sameProduct.scrollIntoViewIfNeeded();

  await instant(page, async () => {
    await sameProduct.click();
    await page.waitForURL('/product/4');
    await expect(page.getByRole('button', { exact: true, name: 'Remove from cart' })).toBeVisible();
  });

  await page.reload();
  await expect(page.getByRole('button', { exact: true, name: 'Remove from cart' })).toBeVisible();

  await page.getByRole('button', { exact: true, name: 'Remove from cart' }).click();
  await expect(page.getByRole('button', { exact: true, name: 'Add to cart' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cart with 0 items' })).toBeVisible();
});
