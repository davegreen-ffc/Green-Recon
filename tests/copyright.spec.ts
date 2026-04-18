import { test, expect } from '@playwright/test'

/**
 * Copyright Notice Tests (Static HTML Template)
 */

test.describe('Footer Copyright Notice', () => {
  test('should display copyright notice with current year', async ({ page }) => {
    await page.goto('/')

    const currentYear = new Date().getFullYear()

    const footerBottom = page.locator('footer .footer-bottom')
    await expect(footerBottom).toBeVisible()

    await expect(page.locator('#currentYear')).toHaveText(String(currentYear))
    await expect(footerBottom).toContainText('Free For Charity')
    await expect(footerBottom).toContainText('All rights reserved')
  })

  test('should display link in copyright notice if present', async ({ page }) => {
    await page.goto('/')

    const link = page.locator('footer .footer-bottom a')
    if ((await link.count()) === 0) {
      test.skip(true, 'No copyright link present in this template')
    }

    await expect(link.first()).toBeVisible()
  })
})