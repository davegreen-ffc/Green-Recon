import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test.describe('Domain configuration', () => {
  test('homepage social metadata should target greenrecon.org', async ({ page }) => {
    await page.goto('/')

    const ogUrl = page.locator('meta[property="og:url"]')
    const twitterUrl = page.locator('meta[property="twitter:url"]')

    await expect(ogUrl).toHaveAttribute('content', 'https://greenrecon.org/')
    await expect(twitterUrl).toHaveAttribute('content', 'https://greenrecon.org/')
  })

  test('GitHub Pages CNAME should point to greenrecon.org', async () => {
    const cname = await readFile('html-site/CNAME', 'utf8')
    expect(cname.trim()).toBe('greenrecon.org')
  })
})
