import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';

test('the Sign in page shows its static layout before the form', async ({ page }) => {
  await page.goto('/');
  const signIn = page.getByRole('link', { exact: true, name: 'Sign In to Join' });
  await signIn.scrollIntoViewIfNeeded();

  await instant(page, async () => {
    await signIn.click();
    await page.waitForURL('/sign-in');
    await expect(page.getByRole('heading', { exact: true, name: 'Welcome Back' })).toBeVisible();
    await expect(page.getByRole('button', { exact: true, name: 'Sign In' })).toHaveCount(0);
  });

  await expect(page.getByRole('button', { exact: true, name: 'Sign In' })).toBeVisible();
});
