import { instant } from '@next/playwright';
import { expect, test } from '@playwright/test';
import type { BrowserContext } from '@playwright/test';

const visible = { visible: true };
const accountId = 'a833bc10-64dd-4069-8573-4bbb4b0065ed';

async function authenticate({ baseURL, context }: { baseURL: string | undefined; context: BrowserContext }) {
  await context.addCookies([
    {
      name: 'selectedAccountId',
      url: baseURL!,
      value: accountId,
    },
  ]);
}

test.describe('Product list (/all)', () => {
  test('the product list is ready from the home page', async ({ page }) => {
    await page.goto('/');
    const viewAll = page.getByRole('link', { exact: true, name: 'View All Products →' });
    await viewAll.scrollIntoViewIfNeeded();

    await instant(page, async () => {
      await viewAll.click();
      await page.waitForURL('/all');
      await expect(page.getByRole('heading', { exact: true, name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible)).toBeVisible();
    });
  });

  test('the Next link prefetches the second page', async ({ page }) => {
    await page.goto('/all');
    const next = page.getByRole('link', { exact: true, name: 'Next' });
    await next.scrollIntoViewIfNeeded();

    await instant(page, async () => {
      await next.click();
      await page.waitForURL(url => url.pathname === '/all' && url.searchParams.get('page') === '2');
      await expect(page.getByRole('heading', { exact: true, name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Smart Thermostat/ }).filter(visible)).toBeVisible();
      await expect(page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible)).toHaveCount(0);
    });

    await expect(page.getByRole('link', { name: /Smart Thermostat/ }).filter(visible)).toBeVisible();
  });

  test('the Previous link prefetches the first page', async ({ page }) => {
    await page.goto('/all?page=2');
    const previous = page.getByRole('link', { exact: true, name: 'Previous' });
    await previous.scrollIntoViewIfNeeded();

    await instant(page, async () => {
      await previous.click();
      await page.waitForURL(url => url.pathname === '/all' && url.searchParams.get('page') === null);
      await expect(page.getByRole('heading', { exact: true, name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible)).toBeVisible();
      await expect(page.getByRole('link', { name: /Smart Thermostat/ }).filter(visible)).toHaveCount(0);
    });

    await expect(page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible)).toBeVisible();
  });

  test('hovering a category prefetches its filtered products', async ({ page }) => {
    await page.goto('/all');
    const audio = page.getByRole('main').getByRole('link', { exact: true, name: 'Audio' }).filter(visible);

    await instant(page, async () => {
      await audio.hover();
      await audio.click();
      await page.waitForURL(url => url.pathname === '/all' && url.searchParams.get('category') === 'Audio');
      await expect(page.getByRole('heading', { exact: true, name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Bass Speaker/ }).filter(visible)).toBeVisible();
      await expect(page.getByRole('link', { name: /Wireless Mouse/ }).filter(visible)).toHaveCount(0);
    });

    await expect(page.getByRole('link', { name: /Bass Speaker/ }).filter(visible)).toBeVisible();
  });

  test('the authenticated Next link prefetches the fourth page', async ({ baseURL, context, page }) => {
    await authenticate({ baseURL, context });
    await page.goto('/all?page=3');
    const next = page.getByRole('link', { exact: true, name: 'Next' });
    await next.scrollIntoViewIfNeeded();

    await instant(page, async () => {
      await next.click();
      await page.waitForURL(url => url.pathname === '/all' && url.searchParams.get('page') === '4');
      await expect(page.getByRole('heading', { exact: true, name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Bass Speaker/ }).filter(visible)).toBeVisible();
      await expect(page.getByRole('link', { name: /Portable Speaker/ }).filter(visible)).toHaveCount(0);
    });

    await expect(page.getByRole('link', { name: /Bass Speaker/ }).filter(visible)).toBeVisible();
  });

  test('authenticated category intent prefetches filtered products', async ({ baseURL, context, page }) => {
    await authenticate({ baseURL, context });
    await page.goto('/all?page=3');
    const audio = page.getByRole('main').getByRole('link', { exact: true, name: 'Audio' }).filter(visible);

    await instant(page, async () => {
      await audio.hover();
      await audio.click();
      await page.waitForURL(url => url.pathname === '/all' && url.searchParams.get('category') === 'Audio');
      await expect(page.getByRole('heading', { exact: true, name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Wireless Headphones/ }).filter(visible)).toBeVisible();
      await expect(page.getByRole('link', { name: /Mini Projector/ }).filter(visible)).toHaveCount(0);
    });

    await expect(page.getByRole('link', { name: /Wireless Headphones/ }).filter(visible)).toBeVisible();
  });
});
