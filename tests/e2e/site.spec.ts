import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = [
  '/',
  '/about',
  '/programs',
  '/get-help',
  '/volunteer',
  '/partner',
  '/events',
  '/donate',
  '/contact',
  '/impact',
  '/locations',
  '/privacy',
  '/accessibility',
  '/credits',
];
for (const route of routes)
  test(`${route} has a readable heading and no horizontal overflow`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('main')).toBeVisible();
    expect(await page.locator('h1').count()).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
  });
test('all seven required program pages resolve', async ({ page }) => {
  for (const slug of [
    'court-community-support',
    'visitation-transportation',
    'housing-support-stability',
    'reentry-support',
    'youth-entrepreneurship-education',
    'family-support',
    'community-outreach-events',
  ]) {
    const r = await page.goto('/programs/' + slug);
    expect(r?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  }
});
test('support category survives navigation', async ({ page }) => {
  await page.goto('/get-help?need=Housing%20support');
  await expect(page.getByLabel('Housing support', { exact: true })).toBeChecked();
});
test('unconfigured form cannot pretend to send', async ({ page }) => {
  await page.goto('/get-help');
  await expect(page.getByRole('button', { name: 'Send support request' })).toBeDisabled();
  await expect(
    page
      .getByText('This form is not currently monitored and cannot submit.', { exact: false })
      .first(),
  ).toBeVisible();
});
test('unconfigured donation does not open a fake checkout', async ({ page }) => {
  await page.goto('/donate');
  await expect(page.locator('input[name="cardNumber"]')).toHaveCount(0);
});
test('reduced-motion preference is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'calm');
});
for (const route of ['/', '/programs', '/get-help'])
  test(`${route} accessibility scan`, async ({ page }) => {
    await page.goto(route);
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(scan.violations).toEqual([]);
  });
test('unknown event and program return not-found', async ({ page }) => {
  expect((await page.goto('/events/not-published'))?.status()).toBe(404);
  expect((await page.goto('/programs/not-a-program'))?.status()).toBe(404);
});

test('coat drive, sponsor, and new nonprofit pages are available', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Give warmth.Share hope.');
  await expect(
    page.getByRole('img', { name: 'One Warm Coat — Official Member of Nonprofit Network' }),
  ).toBeVisible();
  for (const route of [
    '/community-initiatives',
    '/community-initiatives/coat-drive',
    '/ways-to-give',
    '/careers',
    '/about/people',
    '/stories',
    '/programs/summer-camp',
    '/brand-preview',
    '/donate/thank-you',
  ]) {
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
  }
});
test('brand palette persists through navigation and reset', async ({ page }) => {
  await page.goto('/brand-preview');
  await page.getByRole('radio', { name: 'Rooted together' }).check();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');
  await expect(page.locator('html')).toHaveCSS('--brand-primary', '#173e35');
  await page.getByRole('link', { name: 'Preview the homepage' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'forest');
  await page.goto('/brand-preview');
  await page.getByRole('button', { name: 'Reset to default' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'earth');
});
