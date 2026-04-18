# Free For Charity - Pure HTML Static Website

This is the pure HTML static version of the Free For Charity website, converted from the React/Next.js application.

## 🎉 Conversion Complete

This website has been successfully converted from React/Next.js to pure HTML, CSS, and vanilla JavaScript.

## Quick Start

### Local Development

Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Deployment

Deploy the entire `html-site` directory to any static hosting service:

- **GitHub Pages:** Push to `gh-pages` branch
- **Netlify:** Drag and drop the folder
- **Vercel:** Deploy static site
- **AWS S3:** Upload to bucket with static hosting enabled
- **Any web server:** Upload via FTP/SFTP

## File Structure

```
html-site/
├── index.html              # Main homepage
├── css/
│   └── styles.css          # All styles (converted from Tailwind)
├── js/
│   └── main.js             # All JavaScript functionality
├── images/                 # Image assets
├── svgs/                   # SVG icons
├── videos/                 # Video files
├── favicon.ico             # Favicon
├── apple-icon.png          # Apple touch icon
├── icon.png                # General icon
├── site.webmanifest        # PWA manifest
└── REACT_TO_HTML_CONVERSION.md  # Conversion documentation
```

## Features

### ✅ Implemented in HTML Version

- **Homepage** with all sections (Hero, Mission, Programs, etc.)
- **Responsive Navigation** with mobile menu
- **Cookie Consent Banner** with preferences
- **Google Tag Manager** integration
- **Zeffy Donation Forms** (iframe embeds)
- **Facebook Events Widget** (iframe embeds)
- **FAQ Accordion** (vanilla JavaScript)
- **Animated Numbers** in Results section
- **Smooth Scrolling** navigation
- **Social Media Links**
- **Contact Information**
- **SEO Optimization** (meta tags, Open Graph, Twitter Cards)

### ❌ Not Implemented (React-Specific)

See `REACT_TO_HTML_CONVERSION.md` for complete list of features not converted:

- Next.js Image Optimization
- Framer Motion animations
- Advanced React component interactions
- TypeScript type safety
- Policy pages (need to be created separately)
- Search functionality
- Complex form validation

## Browser Compatibility

The HTML version is compatible with:

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Internet Explorer 11 (with some limitations)

## Performance

Benefits of pure HTML version:

- **Fast Load Times:** No React bundle to download
- **SEO-Friendly:** All content is in HTML
- **Lightweight:** ~100KB total (vs ~500KB+ for React version)
- **No Build Step:** Direct deployment
- **Works Offline:** With service worker (can be added)

## Customization

### Updating Content

1. **Homepage Text:** Edit `index.html` directly
2. **Styles:** Modify `css/styles.css`
3. **Functionality:** Update `js/main.js`
4. **Images:** Replace files in `images/` directory

### Adding New Sections

Copy an existing section in `index.html` and modify:

```html
<section id="new-section" class="section-name">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <!-- Your content here -->
  </div>
  <div class="section-divider"></div>
</section>
```

### Styling Guidelines

The CSS uses CSS variables for easy customization:

```css
:root {
  --color-primary: #2e6f8e; /* Blue */
  --color-secondary: #f57c20; /* Orange */
  --color-accent: #113563; /* Dark Blue */
  /* ... more variables */
}
```

## Testing

### HTML Validation

```bash
# W3C HTML Validator
https://validator.w3.org/

# Upload index.html or enter URL
```

### Accessibility Testing

```bash
# axe DevTools
https://www.deque.com/axe/devtools/

# WAVE
https://wave.webaim.org/
```

### Performance Testing

```bash
# Lighthouse (Chrome DevTools)
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit

# PageSpeed Insights
https://pagespeed.web.dev/
```

## Google Tag Manager Setup

Update the GTM ID in two places:

1. **index.html** (line ~54):

   ```html
   <script>
     ...
     'https://www.googletagmanager.com/gtag/js?id=GTM-XXXXXXX'
     ...
   </script>
   ```

2. **index.html** (line ~64):

   ```html
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   ```

3. **js/main.js** (line ~415):
   ```javascript
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
   ```

## Cookie Consent Configuration

Cookie preferences are saved in browser localStorage and cookies:

- `ffc_cookie_consent` - Stores consent status
- `ffc_cookie_preferences` - Stores user preferences

To customize cookie behavior, edit `js/main.js` in the Cookie Consent section.

## Social Media Integration

Update social media links in `index.html` footer section:

```html
<a href="https://www.facebook.com/freeforcharity" ...>
  <a href="https://x.com/freeforcharity1" ...>
    <a href="https://www.linkedin.com/company/freeforcharity/" ...>
      <a href="https://github.com/FreeForCharity/..." ...></a></a></a
></a>
```

## Embedded Services

### Zeffy Donation Form

Update the Zeffy embed URL in `index.html`:

```html
<iframe src="https://www.zeffy.com/en-US/embed/donation-form/YOUR-FORM-ID"
```

### Facebook Events Widget

Update the SociableKit widget URL:

```html
<iframe src="https://widgets.sociablekit.com/facebook-page-events/iframe/YOUR-WIDGET-ID"
```

## SEO Optimization

The HTML includes comprehensive SEO:

- ✅ Title tags
- ✅ Meta descriptions
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Semantic HTML5
- ✅ Alt text on images
- ✅ ARIA labels for accessibility

Update meta tags in `index.html` `<head>` section for your needs.

## Known Limitations

1. **No Build Process:** Changes require manual updates
2. **Large CSS File:** No tree-shaking like Tailwind JIT
3. **Manual Testing:** No automated React testing
4. **Static Content:** Team members, FAQs must be manually updated
5. **Limited Animations:** Compared to Framer Motion

See `REACT_TO_HTML_CONVERSION.md` for complete details.

## Migration Back to React

If you need React features in the future:

1. Copy content from HTML files
2. Use original React codebase as base
3. Update content in React components
4. Consider hybrid approach (Astro, islands architecture)

## Support

For issues or questions:

- **Email:** clarkemoyer@freeforcharity.org
- **GitHub:** https://github.com/FreeForCharity/FFC_Single_Page_Template
- **Website:** https://ffcworkingsite1.org

## License

This project inherits the license from the original Free For Charity repository.

**EIN:** 46-2471893  
**Organization:** Free For Charity  
**Type:** 501(c)(3) Nonprofit Organization

---

**Created:** December 2024  
**Converted From:** React/Next.js 16.0.7  
**Technology:** Pure HTML5, CSS3, Vanilla JavaScript
