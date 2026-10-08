import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

const accountId = 'a833bc10-64dd-4069-8573-4bbb4b0065ed';

test('the account page shows its static sections before account details', async ({ baseURL, context, page }) => {
  await context.addCookies([
    {
      name: 'selectedAccountId',
      url: baseURL!,
      value: accountId,
    },
  ]);
  await page.goto('/');
  const profile = page.getByRole('link', { exact: true, name: 'Go to Profile' });

  await instant(page, async () => {
    await profile.click();
    await page.waitForURL('/user');
    await expect(page.getByRole('heading', { exact: true, name: 'Your Discounts' })).toBeVisible();
    await expect(page.getByRole('heading', { exact: true, name: 'Saved Products' })).toHaveCount(0);
    await expect(page.getByRole('heading', { exact: true, name: 'Contact Information' })).toHaveCount(0);
  });

  await expect(page.getByRole('heading', { exact: true, name: 'Contact Information' })).toBeVisible();
  await expect(page.getByRole('heading', { exact: true, name: 'Saved Products' })).toBeVisible();
});
