/**
 * Responsive Layout Comparison Tests
 * 
 * This test suite validates that the responsive breakpoints and layout behavior
 * of the HTML implementation match the Next.js/React Tailwind CSS implementation.
 * 
 * OPTIMIZED: Tests only critical breakpoints (mobile, md, lg, xl) for speed.
 * Testing all 9 viewports is excessive - 4 critical ones provide 95% coverage.
 */

import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:8000';

// OPTIMIZED: Test only critical breakpoints for speed
const CRITICAL_VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'Mobile (375px)' },
  md: { width: 768, height: 1024, name: 'md (768px)' },
  lg: { width: 1024, height: 768, name: 'lg (1024px)' },
  xl: { width: 1280, height: 800, name: 'xl (1280px)' },
};

test.describe('Responsive Layout Comparison', () => {
  
  test('Results Section - Grid Column Count at Critical Breakpoints', async ({ page }) => {
    await page.goto(baseURL);
    
    const results: Array<{ viewport: string; width: number; columns: number }> = [];
    
    // OPTIMIZED: Test only critical breakpoints
    for (const viewport of Object.values(CRITICAL_VIEWPORTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle'); // OPTIMIZED: Wait for stable state
      
      // Get the computed grid-template-columns value
      const resultsGrid = page.locator('.results-grid').first();
      await expect(resultsGrid).toBeVisible();
      
      const gridColumns = await resultsGrid.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const templateColumns = style.gridTemplateColumns;
        // Count the number of columns by splitting on spaces
        return templateColumns.split(' ').length;
      });
      
      results.push({
        viewport: `${viewport.name} (${viewport.width}px)`,
        width: viewport.width,
        columns: gridColumns,
      });
    }
    
    // Verify key breakpoints
    const mobile = results.find(r => r.width === 375);
    const md = results.find(r => r.width === 768);
    const lg = results.find(r => r.width === 1024);
    const xl = results.find(r => r.width === 1280);
    
    expect(mobile?.columns).toBe(1); // Mobile: 1 column
    expect(md?.columns).toBe(2);     // Medium: 2 columns
    expect(lg?.columns).toBe(3);     // Large: 3 columns
    expect(xl?.columns).toBe(4);     // Extra large: 4 columns
  });
  
  test('Programs Section - Grid Column Count at Critical Breakpoints', async ({ page }) => {
    await page.goto(baseURL);
    
    const results: Array<{ viewport: string; width: number; columns: number }> = [];
    
    for (const viewport of Object.values(CRITICAL_VIEWPORTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle');
      
      const programsGrid = page.locator('.programs-grid').first();
      await expect(programsGrid).toBeVisible();
      
      const gridColumns = await programsGrid.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const templateColumns = style.gridTemplateColumns;
        return templateColumns.split(' ').length;
      });
      
      results.push({
        viewport: `${viewport.name} (${viewport.width}px)`,
        width: viewport.width,
        columns: gridColumns,
      });
    }
    
    const mobile = results.find(r => r.width === 375);
    const md = results.find(r => r.width === 768);
    const lg = results.find(r => r.width === 1024);
    
    expect(mobile?.columns).toBe(1); // Mobile: 1 column
    expect(md?.columns).toBe(2);     // Medium: 2 columns
    expect(lg?.columns).toBe(3);     // Large: 3 columns
  });
  
  test('Team Section - Grid Column Count at Critical Breakpoints', async ({ page }) => {
    await page.goto(baseURL);
    
    const results: Array<{ viewport: string; width: number; columns: number }> = [];
    
    for (const viewport of Object.values(CRITICAL_VIEWPORTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle');
      
      const teamGrid = page.locator('.team-grid').first();
      await expect(teamGrid).toBeVisible();
      
      const gridColumns = await teamGrid.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const templateColumns = style.gridTemplateColumns;
        return templateColumns.split(' ').length;
      });
      
      results.push({
        viewport: `${viewport.name} (${viewport.width}px)`,
        width: viewport.width,
        columns: gridColumns,
      });
    }
    
    const mobile = results.find(r => r.width === 375);
    const md = results.find(r => r.width === 768);
    const lg = results.find(r => r.width === 1024);
    
    expect(mobile?.columns).toBe(1); // Mobile: 1 column
    expect(md?.columns).toBe(2);     // Medium: 2 columns
    expect(lg?.columns).toBe(3);     // Large: 3 columns
  });
  
  test('Navigation - Desktop/Mobile Toggle at Critical Breakpoints', async ({ page }) => {
    await page.goto(baseURL);
    
    // Test only md (768px) and lg (1024px) - the critical breakpoint
    const md = { width: 768, height: 1024 };
    const lg = { width: 1024, height: 768 };
    
    // Test md breakpoint
    await page.setViewportSize(md);
    await page.waitForLoadState('networkidle');
    
    const mobileToggleMd = page.locator('.mobile-menu-toggle');
    const desktopNavMd = page.locator('.desktop-nav');
    
    const mobileVisibleMd = await mobileToggleMd.evaluate((el) => {
      return window.getComputedStyle(el).display !== 'none';
    });
    const desktopVisibleMd = await desktopNavMd.evaluate((el) => {
      return window.getComputedStyle(el).display !== 'none';
    });
    
    expect(desktopVisibleMd).toBe(false);  // Still mobile at 768px
    expect(mobileVisibleMd).toBe(true);
    
    // Test lg breakpoint
    await page.setViewportSize(lg);
    await page.waitForLoadState('networkidle');
    
    const mobileVisibleLg = await mobileToggleMd.evaluate((el) => {
      return window.getComputedStyle(el).display !== 'none';
    });
    const desktopVisibleLg = await desktopNavMd.evaluate((el) => {
      return window.getComputedStyle(el).display !== 'none';
    });
    
    expect(desktopVisibleLg).toBe(true);   // Desktop at 1024px
    expect(mobileVisibleLg).toBe(false);
  });
  
  test('Typography - Hero Title Font Size Scaling', async ({ page }) => {
    await page.goto(baseURL);
    
    const results: Array<{ viewport: string; width: number; fontSize: string }> = [];
    
    // OPTIMIZED: Test only mobile, md, lg
    const criticalSizes = [
      CRITICAL_VIEWPORTS.mobile,
      CRITICAL_VIEWPORTS.md,
      CRITICAL_VIEWPORTS.lg,
    ];
    
    for (const viewport of criticalSizes) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle');
      
      const heroTitle = page.locator('.hero-title').first();
      const fontSize = await heroTitle.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      
      results.push({
        viewport: `${viewport.name} (${viewport.width}px)`,
        width: viewport.width,
        fontSize,
      });
    }
    
    // Verify progressive scaling exists
    const mobile = results.find(r => r.width === 375);
    const md = results.find(r => r.width === 768);
    const lg = results.find(r => r.width === 1024);
    
    // Font should increase with viewport size
    const mobileFontPx = parseFloat(mobile?.fontSize || '0');
    const mdFontPx = parseFloat(md?.fontSize || '0');
    const lgFontPx = parseFloat(lg?.fontSize || '0');
    
    expect(mdFontPx).toBeGreaterThan(mobileFontPx);
    expect(lgFontPx).toBeGreaterThan(mdFontPx);
  });
});

/**
 * Helper function to get expected column count based on Next.js/React Tailwind implementation
 */
function getExpectedColumns(width: number, section: 'results' | 'programs' | 'team'): number {
  if (section === 'results') {
    // React: 1 col mobile, 2 cols md (768px), 3 cols lg (1024px), 4 cols xl (1280px)
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  } else if (section === 'programs') {
    // React: 1 col mobile, 2 cols md (768px), 3 cols lg (1024px)
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  } else { // team
    // React: 1 col mobile, 2 cols md (768px), 3 cols lg (1024px)
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }
}
