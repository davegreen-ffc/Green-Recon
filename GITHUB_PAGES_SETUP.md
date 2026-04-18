# GitHub Pages Configuration Required

## ⚠️ QUICK FIX SUMMARY

**The site shows README because GitHub Pages is set to deploy from main branch instead of using GitHub Actions.**

**To fix:**
1. Go to: https://github.com/FreeForCharity/FFC-IN-Single_Page_Template_HTML/settings/pages
2. Change "Source" dropdown from "Deploy from a branch" to **"GitHub Actions"**
3. Click Actions tab → "Deploy to GitHub Pages" → "Run workflow" → "Run workflow" button
4. Wait 2 minutes and refresh the site

That's it! Detailed instructions below.

---

## Issue

The site is currently rendering the README.md instead of the HTML site because GitHub Pages is not properly configured to use GitHub Actions as the deployment source.

## Solution

You need to update the GitHub Pages settings in the repository to use GitHub Actions:

### Steps to Fix (⚠️ CRITICAL - MUST BE DONE):

1. Go to your repository on GitHub: https://github.com/FreeForCharity/FFC-IN-Single_Page_Template_HTML

2. Click on **Settings** (top navigation bar)

3. In the left sidebar, scroll down and click on **Pages** (under "Code and automation" section)

4. Under "Build and deployment", you will see a **Source** dropdown

5. **CRITICAL STEP**: Change the source from ~~"Deploy from a branch"~~ to **"GitHub Actions"**

   Currently, it's likely set to:
   - Source: "Deploy from a branch" 
   - Branch: "main" → "/ (root)"
   
   Change it to:
   - Source: **"GitHub Actions"** ← THIS IS THE FIX

6. The page will auto-save (no Save button needed)

7. Wait 1-2 minutes for the next deployment to complete

8. **Trigger a deployment** (choose one option):
   - **Option A (Recommended)**: Go to Actions tab → "Deploy to GitHub Pages" → "Run workflow" → Select "main" branch → Click "Run workflow"
   - **Option B**: Wait for the next automatic deployment (happens when CI completes on a push to main)
   - **Option C**: Make any commit to main branch to trigger CI + Deploy

### What This Does:

- Tells GitHub Pages to use the deployment from the GitHub Actions workflow (`.github/workflows/deploy.yml`) instead of deploying directly from the main branch
- The workflow already deploys the `html-site/` directory contents, which contain the actual HTML website
- Once configured correctly, the site will be available at:
  - https://ffcworkingsite1.org (custom domain)
  - https://freeforcharity.github.io/FFC-IN-Single_Page_Template_HTML/ (GitHub Pages URL)

### Verification:

After making the change:
1. The deploy workflow will automatically run (or you can manually trigger it from the Actions tab)
2. Visit the site URLs above to verify the HTML site is loading instead of the README
3. You should see the actual Free For Charity website, not the repository documentation

## Current Configuration:

- ✅ Deployment workflow configured correctly (`.github/workflows/deploy.yml`)
- ✅ HTML site ready in `html-site/` directory  
- ✅ `.nojekyll` file present in `html-site/` to disable Jekyll processing
- ✅ CNAME file added for custom domain support
- ❌ **Repository Pages settings need to be set to "GitHub Actions"** ← YOU NEED TO DO THIS

## Troubleshooting:

### If you still see the README after changing settings:

1. **Clear your browser cache** or open in an incognito/private window
2. **Wait 2-3 minutes** - GitHub Pages deployments take time
3. **Check the Actions tab** - Verify the "Deploy to GitHub Pages" workflow ran successfully
4. **Hard refresh** the page (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)

### How to verify the settings are correct:

- Go to Settings → Pages
- You should see: "Your site is live at https://freeforcharity.github.io/FFC-IN-Single_Page_Template_HTML/"
- Under "Source", it should say "GitHub Actions" with a green checkmark icon
- You should NOT see options for "Branch" and "Folder" (those only appear when "Deploy from a branch" is selected)

### If it's still showing README:

1. The settings change hasn't been made yet (double-check Settings → Pages)
2. Browser cache (try incognito mode)
3. DNS propagation for custom domain (can take up to 24 hours, but usually much faster)

## Why This Is Necessary:

GitHub Pages can deploy in two ways:
1. **Deploy from a branch**: GitHub serves files directly from a branch (e.g., main branch root or gh-pages branch)
2. **GitHub Actions**: GitHub uses the artifact uploaded by a workflow (our approach)

The repository is currently set to option 1, which is why it's showing the README.md from the main branch root. We need to switch to option 2 to serve the HTML site from the `html-site/` directory via the GitHub Actions workflow.

When set to "Deploy from a branch", GitHub Pages looks at the root of the main branch and finds README.md, so it renders that as the homepage. When set to "GitHub Actions", it uses the artifact uploaded by the workflow, which contains only the files from `html-site/` directory (including the proper index.html).
