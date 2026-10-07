import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

test('the About page is ready from the home page', async ({ page }) => {
  await page.goto('/');
  const learnMore = page.getByRole('link', { exact: true, name: 'Learn More' });
  await learnMore.scrollIntoViewIfNeeded();

  await instant(page, async () => {
    await learnMore.click();
    await page.waitForURL('/about');
    await expect(page.getByRole('heading', { level: 1, name: 'Premium Electronics & Services' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Our Promise' })).toBeVisible();
  });
});
