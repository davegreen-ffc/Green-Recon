import { test, expect, type BrowserContext } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Cookie Consent Tests (Static HTML Template)
 *
 * The template persists consent via cookies:
 *   - ffc_cookie_consent
 *   - ffc_cookie_preferences (JSON)
 */

const COOKIE_CONSENT_NAME = 'ffc_cookie_consent'
const COOKIE_PREFERENCES_NAME = 'ffc_cookie_preferences'

async function getCookieValue(context: BrowserContext, name: string): Promise<string | undefined> {
  const cookies = await context.cookies()
  return cookies.find((c) => c.name === name)?.value
}

function parseCookieJson(value: string | undefined): unknown {
  if (!value) return null
  try {
    return JSON.parse(decodeURIComponent(value))
  } catch {
    try {
      return JSON.parse(value)
    } catch {
      return null
    }
  }
}

test.describe('Cookie Consent Banner', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should display cookie consent banner on first visit', async ({ page }) => {
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible()

    const heading = banner.locator('h3')
    await expect(heading).toHaveText(testConfig.cookieConsent.bannerHeading)

    await expect(
      banner.getByRole('button', { name: testConfig.cookieConsent.buttons.declineAll })
    ).toBeVisible()
    await expect(
      banner.getByRole('button', { name: testConfig.cookieConsent.buttons.customize })
    ).toBeVisible()
    await expect(
      banner.getByRole('button', { name: testConfig.cookieConsent.buttons.acceptAll })
    ).toBeVisible()

    await expect(banner.getByRole('link', { name: 'Privacy Policy' })).toBeVisible()
    await expect(banner.getByRole('link', { name: 'Cookie Policy' })).toBeVisible()
  })

  test('should hide banner after clicking Accept All', async ({ page }) => {
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible()

    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.acceptAll }).click()
    await expect(banner).not.toBeVisible()
  })

  test('should hide banner after clicking Decline All', async ({ page }) => {
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible()

    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.declineAll }).click()
    await expect(banner).not.toBeVisible()
  })

  test('should persist Accept All choice and not show banner on subsequent visits', async ({ page, context }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.acceptAll }).click()
    await page.reload()

    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).not.toBeVisible()

    expect(await getCookieValue(context, COOKIE_CONSENT_NAME)).toBe('true')

    const prefs = parseCookieJson(await getCookieValue(context, COOKIE_PREFERENCES_NAME)) as any
    expect(prefs).toBeTruthy()
    expect(prefs.necessary).toBe(true)
    expect(prefs.functional).toBe(true)
    expect(prefs.analytics).toBe(true)
    expect(prefs.marketing).toBe(true)
  })

  test('should persist Decline All choice and not show banner on subsequent visits', async ({ page, context }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.declineAll }).click()
    await page.reload()

    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).not.toBeVisible()

    expect(await getCookieValue(context, COOKIE_CONSENT_NAME)).toBe('true')

    const prefs = parseCookieJson(await getCookieValue(context, COOKIE_PREFERENCES_NAME)) as any
    expect(prefs).toBeTruthy()
    expect(prefs.necessary).toBe(true)
    expect(prefs.functional).toBe(true)
    expect(prefs.analytics).toBe(false)
    expect(prefs.marketing).toBe(false)
  })
})

test.describe('Cookie Preferences Modal', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should open preferences modal when clicking Customize', async ({ page }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()

    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    const heading = modal.locator('h2')
    await expect(heading).toHaveText(testConfig.cookieConsent.modalHeading)

    await expect(modal.getByText('Necessary Cookies')).toBeVisible()
    await expect(modal.getByText('Functional Cookies')).toBeVisible()
    await expect(modal.getByText('Analytics Cookies')).toBeVisible()
    await expect(modal.getByText('Marketing Cookies')).toBeVisible()

    await expect(
      modal.getByRole('button', { name: testConfig.cookieConsent.buttons.savePreferences })
    ).toBeVisible()
    await expect(modal.getByRole('button', { name: testConfig.cookieConsent.buttons.cancel })).toBeVisible()
  })

  test('should close modal when clicking Cancel', async ({ page }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()
    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.cancel }).click()

    await expect(modal).not.toBeVisible()
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible()
  })

  test('should close modal when pressing Escape key', async ({ page }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()
    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(modal).not.toBeVisible()
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible()
  })

  test('should close modal when clicking outside (overlay)', async ({ page }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()
    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    await page.locator('#cookiePreferences').click({ position: { x: 5, y: 5 } })

    await expect(modal).not.toBeVisible()
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toBeVisible()
  })

  test('should show necessary and functional cookies as always active', async ({ page }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()
    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    await expect(modal.getByRole('heading', { name: 'Necessary Cookies' })).toBeVisible()
    await expect(modal.getByRole('heading', { name: 'Functional Cookies' })).toBeVisible()

    const alwaysActiveTexts = modal.getByText('Always Active')
    await expect(alwaysActiveTexts).toHaveCount(2)

    const checkboxes = modal.locator('input[type="checkbox"]')
    await expect(checkboxes).toHaveCount(2)
    await expect(modal.locator('input[type="checkbox"][disabled]')).toHaveCount(0)
  })

  test('should allow toggling analytics and marketing cookies', async ({ page }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()
    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    const analyticsInput = modal.locator('#cookieAnalytics')
    const marketingInput = modal.locator('#cookieMarketing')
    const analyticsToggle = modal.locator('#cookieAnalytics + .cookie-toggle-slider')
    const marketingToggle = modal.locator('#cookieMarketing + .cookie-toggle-slider')

    await expect(analyticsInput).not.toBeChecked()
    await expect(marketingInput).not.toBeChecked()

    await analyticsToggle.click({ force: true })
    await expect(analyticsInput).toBeChecked()

    await marketingToggle.click({ force: true })
    await expect(marketingInput).toBeChecked()
  })

  test('should save custom preferences correctly', async ({ page, context }) => {
    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.customize }).click()
    const modal = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(modal).toBeVisible()

    const analyticsInput = modal.locator('#cookieAnalytics')
    const analyticsToggle = modal.locator('#cookieAnalytics + .cookie-toggle-slider')
    await analyticsToggle.click({ force: true })
    await expect(analyticsInput).toBeChecked()

    await page.getByRole('button', { name: testConfig.cookieConsent.buttons.savePreferences }).click()

    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(modal).not.toBeVisible()
    await expect(banner).not.toBeVisible()

    expect(await getCookieValue(context, COOKIE_CONSENT_NAME)).toBe('true')
    const prefs = parseCookieJson(await getCookieValue(context, COOKIE_PREFERENCES_NAME)) as any
    expect(prefs).toBeTruthy()
    expect(prefs.necessary).toBe(true)
    expect(prefs.functional).toBe(true)
    expect(prefs.analytics).toBe(true)
    expect(prefs.marketing).toBe(false)

    await page.reload()
    await expect(banner).not.toBeVisible()
  })
})

test.describe('Cookie Consent Accessibility', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('modal should have proper ARIA attributes', async ({ page }) => {
    await page.getByRole('button', { name: 'Customize' }).click()

    const modal = page.locator('[role="dialog"]')
    await expect(modal).toHaveAttribute('aria-modal', 'true')
    await expect(modal).toHaveAttribute('aria-labelledby', 'cookie-preferences-title')
  })

  test('banner should have proper ARIA attributes', async ({ page }) => {
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    await expect(banner).toHaveAttribute('aria-label', 'Cookie consent notice')
  })
})