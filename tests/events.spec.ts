import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Events Section Tests (Static HTML Template)
 */

test.describe('Events Section', () => {
  test('should render the Events section on homepage', async ({ page }) => {
    await page.goto('/')

    const eventsSection = page.locator(`#${testConfig.events.sectionId}`)
    await expect(eventsSection).toBeVisible()

    await expect(
      eventsSection.getByRole('heading', { name: testConfig.events.heading })
    ).toBeVisible()
  })

  test('should load iframe with proper sandbox attributes', async ({ page }) => {
    await page.goto('/')

    const eventsIframe = page.locator(
      `#${testConfig.events.sectionId} iframe[title="${testConfig.events.iframeTitle}"]`
    )
    await expect(eventsIframe).toBeVisible()

    await expect(eventsIframe).toHaveAttribute(
      'src',
      'https://widgets.sociablekit.com/facebook-page-events/iframe/25631700'
    )

    const sandboxAttr = await eventsIframe.getAttribute('sandbox')
    expect(sandboxAttr).toBeTruthy()
    expect(sandboxAttr).toContain('allow-scripts')
    expect(sandboxAttr).toContain('allow-same-origin')

    await expect(eventsIframe).toHaveAttribute('loading', 'lazy')
    await expect(eventsIframe).toHaveAttribute('title', testConfig.events.iframeTitle)
  })

  test('should be accessible via #events anchor link', async ({ page }) => {
    await page.goto(`/#${testConfig.events.sectionId}`)
    await page.waitForLoadState('domcontentloaded')

    const eventsSection = page.locator(`#${testConfig.events.sectionId}`)
    await expect(eventsSection).toBeVisible()
    expect(await eventsSection.boundingBox()).toBeTruthy()
  })

  test('should have working Facebook link', async ({ page }) => {
    await page.goto('/')

    const facebookLink = page.locator(
      `#${testConfig.events.sectionId} a[href*="${testConfig.events.facebookUrl}"]`
    )
    await expect(facebookLink).toBeVisible()
    await expect(facebookLink).toContainText(testConfig.events.facebookLinkText)
    await expect(facebookLink).toHaveAttribute('target', '_blank')
    await expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(facebookLink).toHaveAttribute('href', testConfig.events.facebookUrl)
  })

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/')

    await page.locator(`#${testConfig.events.sectionId}`).scrollIntoViewIfNeeded()
    const facebookLink = page.locator(
      `#${testConfig.events.sectionId} a[href*="${testConfig.events.facebookUrl}"]`
    )

    await facebookLink.focus()
    await expect(facebookLink).toBeFocused()

    const isClickable = await facebookLink.evaluate((el) => {
      return el instanceof HTMLAnchorElement && el.href.length > 0
    })
    expect(isClickable).toBe(true)
  })

  test('should have proper section structure', async ({ page }) => {
    await page.goto('/')

    const eventsSection = page.locator(`#${testConfig.events.sectionId}`)
    await expect(eventsSection).toBeVisible()

    const classes = await eventsSection.getAttribute('class')
    expect(classes).toContain('events-section')

    const description = eventsSection.locator('p').first()
    await expect(description).toBeVisible()
    await expect(description).toContainText(testConfig.events.descriptionText)

    await expect(eventsSection.locator('.section-divider')).toBeVisible()
  })

  test('should appear in footer navigation', async ({ page }) => {
    await page.goto('/')

    const footerEventsLink = page.locator(`footer a[href="/#${testConfig.events.sectionId}"]`)
    await expect(footerEventsLink).toBeVisible()
    await expect(footerEventsLink).toContainText(testConfig.events.footerLinkText)

    await footerEventsLink.click()
    await page.waitForTimeout(250)

    await expect(page.locator(`#${testConfig.events.sectionId}`)).toBeVisible()
  })

  test('should load on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await page.locator(`#${testConfig.events.sectionId}`).scrollIntoViewIfNeeded()
    await expect(page.locator(`#${testConfig.events.sectionId}`)).toBeVisible()

    const eventsIframe = page.locator(
      `#${testConfig.events.sectionId} iframe[title="${testConfig.events.iframeTitle}"]`
    )
    await expect(eventsIframe).toBeVisible()

    await expect(
      page.locator(`#${testConfig.events.sectionId}`).getByRole('heading', {
        name: testConfig.events.heading,
      })
    ).toBeVisible()
  })
})