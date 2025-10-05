# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Shopify theme based on Dawn (Shopify's reference theme), customized for Librairie Sans Titre. It uses a modern build setup with Vite, Tailwind CSS, and custom JavaScript components.

## Development Commands

### Primary Development
```bash
npm run dev
```
Runs three processes concurrently using `concurrently`:
- **SHOPIFY**: `shopify theme dev` - Starts Shopify development server for live theme preview
- **VITE**: `vite build --watch` - Watches and builds JavaScript and CSS components from `src/`
- **TAILWIND**: `tailwindcss --watch` - Watches and compiles Tailwind CSS

For isolated development:
```bash
npm run vite:dev          # Run Vite dev server only
npm run vite:build        # Build Vite assets only
```

### Theme Management
```bash
npm run push              # Push theme to Shopify (ignores docs/)
npm run pull              # Pull theme from Shopify (ignores docs/)
shopify theme check       # Run theme linting
```

### Documentation (VitePress)
```bash
npm run docs:dev          # Start docs dev server
npm run docs:build        # Build docs
npm run docs:preview      # Preview built docs
```

### Utility Scripts
```bash
node restore-products.js [--dry-run]  # Restore unpublished products with images
node tag-images.js [--dry-run]        # Add image tags to products
```

## Architecture

### Build System
- **Vite** builds JavaScript components and CSS from `src/` into `assets/` directory
- Component files follow naming pattern: `component-name-vite.js` and `component-name-vite.css`
- Vite config watches `src/js/*`, `src/css/*`, and `**/*.liquid` files
- **Tailwind CSS** uses custom prefix `lst:` to avoid conflicts with Dawn's default styles
- Main entry point is `main.js` (imports `style.css`)

### Directory Structure
- **`sections/`** - Shopify sections (reusable theme components)
- **`snippets/`** - Shopify snippets (smaller reusable components, e.g., `card-product.liquid`, `facets.liquid`)
- **`templates/`** - Page templates with JSON schema format (e.g., `index.json`, `collection.json`)
- **`layout/`** - Theme layout files (e.g., `theme.liquid`)
- **`assets/`** - Compiled assets and static files (Vite output directory)
- **`src/js/`** - Source JavaScript components (carousel, slideshow, custom-select, ticker, product-slideshow)
- **`src/css/`** - Source CSS for custom components
- **`config/`** - Shopify theme settings (`settings_data.json`, `settings_schema.json`)
- **`locales/`** - Translation files
- **`docs/`** - VitePress documentation site

### Custom Components
The theme includes several custom Web Components built in vanilla JavaScript:
- `component-carousel.js` - Main carousel functionality
- `component-slideshow.js` - Slideshow with autoplay/navigation
- `component-product-slideshow.js` - Product-specific slideshow
- `component-custom-select.js` - Custom select dropdown
- `component-ticker.js` - Scrolling ticker/marquee
- `component-carousel-swipe-content.js` - Touch/swipe carousel

All components are built as Web Components extending `HTMLElement`.

### Styling
- Tailwind CSS with custom configuration:
  - Prefix: `lst:` (all Tailwind classes must be prefixed)
  - Custom font: Vermeille
  - Primary color: `#FFFF00` (yellow)
  - Typography plugin configured with custom sizes (xl, 3xl) and black theme variant
  - Forms plugin included

### Shopify Configuration
- Store: `librairie-sans-titre-2`
- Theme settings managed via Shopify CLI
- Metafields configuration in `.shopify/metafields.json`
- Project config in `.shopify/project.json`

## Development Notes

### When Editing Components
1. Source files are in `src/js/` and `src/css/`
2. Vite automatically builds them to `assets/` with `-vite` suffix
3. Liquid files reference the built assets (e.g., `{{ 'component-carousel-vite.js' | asset_url }}`)
4. Watch process rebuilds on save when using `npm run dev`

### When Editing Liquid Files
- Sections are in `sections/` and define schema for customization in Shopify theme editor
- Snippets are in `snippets/` and are included via `{% render 'snippet-name' %}`
- Templates use JSON schema format and compose sections

### When Working with Styles
- Use `lst:` prefix for all Tailwind classes
- Global styles are in `style.css` and `assets/base.css`
- Component-specific styles go in `src/css/component-*.css`
- Avoid conflicts with Dawn's default styles by using the prefix

### Proportional Scaling System

The theme uses a fluid scaling system where all sizes automatically increase by 52.78% between 1280px and 1920px screen widths (e.g., 36px → 55px).

**How it works:**
- Base `font-size` on `html` element scales from 100% (16px) at 1280px to 152.78% (24.44px) at 1920px
- All sizes use `rem` or `em` units, which are relative to the root font-size
- This creates smooth, proportional scaling across all screen sizes

**Usage:**
- Set sizes in `rem` units based on the desired size at 1280px (base)
- Conversion formula: `[px-value] / 16 = [rem-value]`
- The element will automatically scale to 152.78% of its base size at 1920px

**Scale Examples:**

| Base Size (1280px) | rem Value | Scaled Size (1920px) |
|--------------------|-----------|----------------------|
| 36px               | 2.25rem   | 55px                 |
| 20px               | 1.25rem   | 30.56px              |
| 12px               | 0.75rem   | 18.33px              |
| 16px               | 1rem      | 24.44px              |

**Practical Example:**
```css
/* Define a header icon at base size (1280px) */
.header__icon {
  width: 2.25rem;  /* 36px at 1280px */
  height: 2.25rem;
}
/* At 1920px, this automatically becomes 55px × 55px */
```

**CSS Custom Property:**
A `--scale-factor` custom property is available if you need to reference the current scale value:
```css
.my-element {
  /* Scale factor ranges from 1 (at 1280px) to 1.5278 (at 1920px) */
  transform: scale(var(--scale-factor));
}
```

### Package Manager
- Uses pnpm (lockfile: `pnpm-lock.yaml`)
- Workspace configuration in `pnpm-workspace.yaml` (only builds dependencies for esbuild)

## Theme Quality Tools
- **Theme Check**: Lints Liquid files (`.theme-check.yml` config)
- **Prettier**: Code formatting (`.prettierrc.json` config)
- **GitHub Actions**: Runs Lighthouse CI and Theme Check on push
