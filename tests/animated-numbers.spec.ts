import { test, expect, type Page } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Animated Numbers Tests (Static HTML Template)
 *
 * The HTML template renders the Results section using `.result-card` markup.
 * These tests validate:
 *  - Section exists
 *  - Descriptions exist
 *  - Numbers begin at 0 before scroll (when section is not initially in view)
 *  - Numbers reach their configured `data-target` values after scroll
 */

test.describe('Results 2023 Animated Numbers', () => {
  const getResultsHeading = (page: Page) =>
    page.getByRole('heading', { name: testConfig.animatedNumbers.sectionHeading })

  const getResultCard = (page: Page, description: string) =>
    page.locator('.result-card', {
      has: page.locator('.result-label', { hasText: description }),
    })

  const getResultNumber = (page: Page, description: string) =>
    getResultCard(page, description).locator('.result-number')

  test('should display the Results section with all statistics', async ({ page }) => {
    await page.goto('/')

    const heading = getResultsHeading(page)
    await expect(heading).toBeVisible()
    await heading.scrollIntoViewIfNeeded()

    for (const stat of testConfig.animatedNumbers.statistics) {
      const number = getResultNumber(page, stat.description)
      await expect(number).toBeVisible()
      await expect(number).toHaveAttribute('data-target', stat.value)
      await expect(number).toHaveText(stat.value, { timeout: 5000 })
    }
  })

  test('should start with numbers at 0 before scrolling into view', async ({ page }) => {
    await page.goto('/')

    const heading = getResultsHeading(page)
    await expect(heading).toBeVisible()

    const headingIsFullyInViewport = await heading.evaluate((el) => {
      const rect = el.getBoundingClientRect()
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      return rect.top >= 0 && rect.bottom <= viewHeight
    })

    if (headingIsFullyInViewport) {
      test.skip(true, 'Results section is initially visible at the default viewport size')
    }

    const firstStat = testConfig.animatedNumbers.statistics[0]
    const number = getResultNumber(page, firstStat.description)
    await expect(number).toBeVisible()
    await expect(number).toHaveText('0')
  })

  test('should animate numbers only once when scrolled into view', async ({ page }) => {
    await page.goto('/')

    const heading = getResultsHeading(page)
    await expect(heading).toBeVisible()
    await heading.scrollIntoViewIfNeeded()

    const firstStat = testConfig.animatedNumbers.statistics[0]
    const number = getResultNumber(page, firstStat.description)
    await expect(number).toHaveText(firstStat.value, { timeout: 5000 })

    await page.evaluate(() => window.scrollTo(0, 0))
    await heading.scrollIntoViewIfNeeded()

    await expect(number).toHaveText(firstStat.value)
  })

  test('should display correct descriptions for each statistic', async ({ page }) => {
    await page.goto('/')

    for (const stat of testConfig.animatedNumbers.statistics) {
      await expect(page.locator('.result-label', { hasText: stat.description })).toBeVisible()
    }
  })

  test('should respect prefers-reduced-motion preference', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()

    await page.goto('/')
    const heading = getResultsHeading(page)
    await expect(heading).toBeVisible()
    await heading.scrollIntoViewIfNeeded()

    const firstStat = testConfig.animatedNumbers.statistics[0]
    const number = getResultNumber(page, firstStat.description)
    await expect(number).toHaveText(firstStat.value, { timeout: 5000 })

    await context.close()
  })
})