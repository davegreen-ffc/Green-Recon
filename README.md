# Free For Charity Website

## 📄 Pure HTML Static Website

This repository contains the **Free For Charity** website built with pure HTML, CSS, and JavaScript - no build process required!

### Quick Links

- 🌐 **[Live Site](https://freeforcharity.github.io/FFC-IN-Single_Page_Template_HTML/)** - Production website
- 📂 **[HTML Site Files](./html-site/)** - All website files
- 🔄 **[Conversion History](./HTML_CONVERSION_SUMMARY.md)** - Documentation of React to HTML conversion

---

## Organization

**Free For Charity** is a 501(c)(3) nonprofit organization (EIN: 46-2471893) dedicated to supporting other nonprofits.

**Mission**: Free For Charity connects students, professionals, and businesses with nonprofits to reduce operating costs and increase impact. By providing free web hosting, domain names, Microsoft 365 grants assistance, and consulting services, we help nonprofits put more resources back into their charitable missions.

**Primary Contact**: Clarke Moyer ([@clarkemoyer](https://github.com/clarkemoyer)) - clarkemoyer@freeforcharity.org

---

## Repository Structure

```
html-site/                      # Production website (deployed to GitHub Pages)
├── index.html                 # Main homepage
├── css/                       # Stylesheets
│   └── styles.css            # All site styles
├── js/                        # JavaScript files
│   └── main.js               # Site functionality
├── images/                    # Image assets (WebP optimized)
├── svgs/                      # SVG icons
├── videos/                    # Video files
├── privacy-policy.html        # Privacy policy page
├── cookie-policy.html         # Cookie policy page
├── terms-of-service.html      # Terms of service page
├── donation-policy.html       # Donation policy page
├── free-for-charity-donation-policy.html
├── vulnerability-disclosure-policy.html
├── security-acknowledgements.html
└── *.png, *.ico, *.webmanifest # Icons and manifest files

tests/                         # Playwright E2E tests for HTML site
├── *.spec.ts                 # Test files
└── README.md                  # Testing documentation

docs-backup/                   # Archived documentation from React/Next.js version
└── *.md                       # Historical reference files
```

---

## Website Features

### Homepage Sections
- **Hero Section** - Welcome message with call-to-action buttons
- **Mission Section** - Mission statement with video
- **Results 2023** - Impact numbers with animated counters
- **Volunteer Section** - Call to action for volunteers
- **Events Section** - Facebook Events integration
- **Donate Section** - Zeffy donation form
- **Programs Section** - Free hosting, domains, consulting
- **FAQ Section** - Accordion-style questions
- **Team Section** - Team member cards

### Navigation & Layout
- **Sticky Header** - Navigation with mobile hamburger menu
- **Mobile Menu** - Slide-out panel with overlay
- **Footer** - Links, social media, contact info
- **Smooth Scrolling** - To section anchors
- **Active Nav Highlighting** - Based on scroll position

### Policy Pages
All legal and policy information is available on separate pages:
- Privacy Policy
- Cookie Policy
- Terms of Service
- Donation Policy
- Free For Charity Donation Policy
- Vulnerability Disclosure Policy
- Security Acknowledgements

---

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Production URL**: https://freeforcharity.github.io/FFC-IN-Single_Page_Template_HTML/
- **Deployment**: Via GitHub Actions (`.github/workflows/deploy.yml`)
- **No Build Step**: Pure HTML files are served directly from the `html-site/` directory

---

## Local Development

No build process or dependencies required! Simply open the HTML files in your browser:

```bash
# Clone the repository
git clone https://github.com/FreeForCharity/FFC-IN-Single_Page_Template_HTML.git
cd FFC-IN-Single_Page_Template_HTML

# Open in browser
cd html-site
open index.html  # macOS
# or
xdg-open index.html  # Linux
# or just double-click index.html in Windows
```

### Using a Local HTTP Server (Optional)

For testing features that require a web server (like cookies or CORS):

```bash
# Using Python (usually pre-installed)
cd html-site
python3 -m http.server 8000
# Visit http://localhost:8000

# Or using PHP (if installed)
cd html-site
php -S localhost:8000

# Or using Node.js http-server (if you have Node installed)
npx http-server html-site -p 8000
```

---

## Testing

The repository includes Playwright E2E tests to validate HTML site functionality:

```bash
# Install dependencies (first time only)
npm install

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed
```

Tests validate:
- Page loading and navigation
- Image rendering
- Cookie consent functionality
- Form functionality
- Social media links
- Copyright information
- Mobile responsiveness

See [tests/README.md](./tests/README.md) for detailed testing documentation.

---

## Making Changes

1. Edit HTML, CSS, or JavaScript files in the `html-site/` directory
2. Test locally in your browser
3. Commit and push to the `main` branch
4. GitHub Actions will automatically deploy to GitHub Pages

### File Organization

- **HTML**: Main structure and content in `*.html` files
- **CSS**: All styles in `html-site/css/styles.css`
- **JavaScript**: Functionality in `html-site/js/main.js`
- **Assets**: Images in `images/`, SVGs in `svgs/`, videos in `videos/`

---

## CNCF-Compliant Open Source Project

This repository follows **Cloud Native Computing Foundation (CNCF)** standards for governance, security, and community practices. We are committed to transparency, inclusive participation, and professional project management.

### Project Governance and Policies

- 📜 **[LICENSE](./LICENSE)** - Apache 2.0 open source license
- 🤝 **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community standards (Contributor Covenant 2.1)
- ⚖️ **[GOVERNANCE.md](./GOVERNANCE.md)** - Decision-making processes
- 👥 **[MAINTAINERS.md](./MAINTAINERS.md)** - Repository maintainers and their roles
- 🎉 **[CONTRIBUTORS.md](./CONTRIBUTORS.md)** - Recognition of all contributors
- 🔒 **[SECURITY.md](./SECURITY.md)** - Vulnerability reporting and security practices
- 🛡️ **[THREAT-MODEL.md](./THREAT-MODEL.md)** - Security threat analysis
- 🌟 **[ADOPTERS.md](./ADOPTERS.md)** - Organizations using this template
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- 💬 **[SUPPORT.md](./SUPPORT.md)** - How to get help
- 🔗 **[EXTERNAL_DEPENDENCIES.md](./EXTERNAL_DEPENDENCIES.md)** - Third-party services
- 📖 **[CITATION.cff](./CITATION.cff)** - Citation information for academic use
- 📝 **[CHANGELOG.md](./CHANGELOG.md)** - Release notes and version history

**Why CNCF Alignment?** Following CNCF standards strengthens project credibility, simplifies onboarding of contributors, and prepares us for cloud-native ecosystem integrations.

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:
- Code of Conduct
- How to submit issues
- How to submit pull requests
- Coding standards

---

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

---

## Historical Context

This repository originally contained a React/Next.js application that was converted to pure HTML/CSS/JavaScript. For details on the conversion process and what was changed, see:
- [HTML Conversion Summary](./HTML_CONVERSION_SUMMARY.md)
- [HTML Conversion Assessment](./HTML_CONVERSION_ASSESSMENT.md)
- [HTML Conversion Verification](./HTML_CONVERSION_VERIFICATION.md)
