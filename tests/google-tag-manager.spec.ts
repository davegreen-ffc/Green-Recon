import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Google Tag Manager (GTM) Tests
 *
 * Note: In the static template, GTM is intentionally disabled by default and
 * the GTM snippet is commented out. These tests skip automatically when the
 * "GTM Script Disabled" marker is present in the HTML.
 */

test.describe('Google Tag Manager Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const content = await page.content()

    if (content.includes('GTM Script Disabled') || content.includes('GTM Noscript Disabled')) {
      test.skip(true, 'GTM is disabled in this template (placeholder GTM-XXXXXXX)')
    }
  })

  test('should initialize dataLayer on page load', async ({ page }) => {
    const hasDataLayer = await page.evaluate(() => {
      return typeof (window as any).dataLayer !== 'undefined' && Array.isArray((window as any).dataLayer)
    })

    expect(hasDataLayer).toBe(true)
  })

  test('should load GTM script with configured ID', async ({ page }) => {
    const scriptSrcs = await page
      .locator('script[src*="googletagmanager.com"]')
      .evaluateAll((els) => els.map((e) => (e as HTMLScriptElement).src))

    expect(scriptSrcs.length).toBeGreaterThan(0)
    expect(scriptSrcs.some((src) => src.includes(testConfig.googleTagManager.id))).toBe(true)
  })

  test('should have GTM noscript fallback in body', async ({ page }) => {
    const content = await page.content()
    expect(content).toContain('googletagmanager.com/ns.html')
    expect(content).toContain(testConfig.googleTagManager.id)
  })

  test('should push events to dataLayer', async ({ page }) => {
    const canPushToDataLayer = await page.evaluate(() => {
      const dl = (window as any).dataLayer
      if (!Array.isArray(dl)) return false

      const initialLength = dl.length
      dl.push({ event: 'test_event', test: true })
      return dl.length > initialLength
    })

    expect(canPushToDataLayer).toBe(true)
  })

  test('should work with cookie consent system', async ({ page }) => {
    const banner = page.locator('[role="region"][aria-label="Cookie consent notice"]')
    if ((await banner.count()) > 0) {
      await page.getByRole('button', { name: testConfig.cookieConsent.buttons.acceptAll }).click()
    }

    const hasConsentEvent = await page.evaluate(() => {
      const dl = (window as any).dataLayer
      if (!Array.isArray(dl)) return false
      return dl.some((item: { event?: string }) => item.event === 'consent_update')
    })

    expect(hasConsentEvent).toBe(true)
  })
})