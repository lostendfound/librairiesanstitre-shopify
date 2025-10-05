# Librairie Sans Titre Theme Constitution

<!--
Sync Impact Report (Version 1.0.0 → Initial Creation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Version Change: N/A → 1.0.0
Rationale: Initial constitution creation for Shopify theme project

Principles Established:
- I. Performance-First Web Development
- II. Progressive Enhancement
- III. Component Isolation
- IV. Build Process Integrity
- V. Shopify Platform Standards

Sections Added:
- Core Principles (5 principles)
- Development Standards
- Quality Gates
- Governance

Templates Status:
✅ plan-template.md - Reviewed, constitution check placeholder present
✅ spec-template.md - Reviewed, requirement validation aligns with principles
✅ tasks-template.md - Reviewed, task categorization compatible
⚠️  No command files found - skipped

Follow-up TODOs:
- None - all principles fully defined
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-->

## Core Principles

### I. Performance-First Web Development
Every feature and component MUST be evaluated for performance impact before implementation. This is non-negotiable.

**Rules:**
- JavaScript MUST be justified—default to HTML/CSS/Liquid server-side rendering
- Bundle sizes MUST be monitored; components built with Vite MUST have separate entry points
- Lighthouse CI scores MUST NOT regress on homepage, product, and collection pages
- Images MUST be optimized and use Shopify's responsive image system
- Third-party scripts require explicit approval and performance audit

**Rationale:** The theme inherits Dawn's performance-first philosophy. Online stores compete on speed. Server-rendered HTML loads faster than client-side JavaScript. This principle ensures merchants' stores remain fast and conversion-optimized.

### II. Progressive Enhancement
Features MUST work with basic HTML, then be enhanced with CSS and JavaScript where appropriate.

**Rules:**
- Core functionality MUST NOT depend on JavaScript
- JavaScript components MUST extend existing HTML elements (Web Components pattern)
- Fallback experiences MUST be functional and accessible
- CSS MUST NOT break layout when JavaScript fails to load
- Forms MUST submit via standard HTTP POST even without JavaScript

**Rationale:** Web users have varying device capabilities, network conditions, and browser configurations. Progressive enhancement ensures the broadest possible accessibility while allowing modern browsers to benefit from enhanced features.

### III. Component Isolation
Custom components MUST be self-contained, independently buildable, and clearly separated from Dawn's base code.

**Rules:**
- Source files MUST live in `src/js/` and `src/css/`, NOT directly in `assets/`
- Built files MUST use `-vite` suffix (e.g., `component-carousel-vite.js`)
- Components MUST NOT modify Dawn's base CSS classes or JavaScript
- Tailwind classes MUST use `lst:` prefix to avoid conflicts
- Each component MUST be independently testable via its Liquid section

**Rationale:** Maintaining clear separation from Dawn's base code allows future Dawn updates to be merged without conflicts. The `-vite` suffix and `lst:` prefix create namespace boundaries that prevent accidental overrides.

### IV. Build Process Integrity
The build system MUST maintain a clear source→compiled flow with automatic rebuilding during development.

**Rules:**
- `npm run dev` MUST run Shopify CLI, Vite watch, and Tailwind watch concurrently
- Changes to `src/` files MUST trigger automatic rebuilds to `assets/`
- Liquid files MUST reference compiled assets from `assets/` directory, NEVER from `src/`
- Build errors MUST halt the watch process with clear error messages
- Manual `assets/` edits are prohibited—all changes go through `src/`

**Rationale:** A reliable build process prevents deployment of broken code and ensures consistency between development and production. The watch system provides immediate feedback and enables rapid iteration.

### V. Shopify Platform Standards
Code MUST adhere to Shopify's theme development best practices and platform constraints.

**Rules:**
- Theme Check linting MUST pass (configured in `.theme-check.yml`)
- Sections MUST define proper JSON schemas for theme editor customization
- Translation strings MUST use Liquid translation filters (e.g., `{{ 'general.search' | t }}`)
- Metafields MUST be properly defined in `.shopify/metafields.json`
- API rate limits MUST be respected in utility scripts

**Rationale:** Shopify themes operate within a specific platform ecosystem. Following platform standards ensures merchant compatibility, theme editor functionality, and proper integration with Shopify's infrastructure.

## Development Standards

### Code Organization
**Directory Structure (Non-Negotiable):**
- `sections/` - Shopify sections with JSON schema (reusable theme components)
- `snippets/` - Smaller reusable Liquid components
- `templates/` - Page templates in JSON schema format
- `layout/` - Theme layout files (e.g., `theme.liquid`)
- `src/js/` - Source JavaScript components (Web Components)
- `src/css/` - Source CSS for custom components
- `assets/` - Compiled output and static assets (NO direct edits)
- `config/` - Shopify theme settings
- `locales/` - Translation files

**Naming Conventions:**
- JavaScript components: `component-name-vite.js`
- CSS modules: `component-name-vite.css`
- Tailwind utilities: `lst:` prefix for ALL classes
- Liquid sections: `kebab-case.liquid`
- Liquid snippets: `kebab-case.liquid`

### Technology Stack
**Core Technologies (Approved):**
- **Liquid**: Shopify's templating language for server-side rendering
- **Vite**: Build tool for JavaScript/CSS compilation
- **Tailwind CSS**: Utility-first CSS framework (with `lst:` prefix)
- **Vanilla JavaScript**: Web Components extending `HTMLElement`
- **pnpm**: Package manager for dependency management

**Prohibited Patterns:**
- React, Vue, or other framework dependencies in theme code
- Global JavaScript scope pollution (use Web Components)
- Inline styles generated by JavaScript (prefer CSS classes)
- jQuery or legacy JavaScript libraries
- Removing Dawn's base functionality without replacement

### Component Development
**Web Component Pattern (Mandatory):**
```javascript
class ComponentName extends HTMLElement {
  constructor() {
    super();
    // Initialization
  }

  connectedCallback() {
    // DOM ready logic
  }

  disconnectedCallback() {
    // Cleanup
  }
}

customElements.define('component-name', ComponentName);
```

**Component Checklist:**
- [ ] Extends `HTMLElement`
- [ ] Registered with `customElements.define()`
- [ ] Has `connectedCallback()` for initialization
- [ ] Has `disconnectedCallback()` for cleanup
- [ ] Works without JavaScript (progressive enhancement)
- [ ] Documented in VitePress docs (if customer-facing)

## Quality Gates

### Pre-Commit Requirements
1. **Theme Check**: `shopify theme check` MUST pass
2. **Build Success**: `npm run vite:build` MUST complete without errors
3. **No Direct `assets/` Edits**: Git diff MUST NOT show manual edits to `-vite.js` or `-vite.css` files

### Pre-Push Requirements
1. **Lighthouse CI**: GitHub Actions workflow MUST pass
   - Performance scores MUST NOT regress
   - Accessibility scores MUST remain above 90
   - Best practices MUST remain above 90
2. **Theme Check Action**: Automated linting MUST pass

### Feature Acceptance Criteria
1. **Performance**: Feature MUST NOT increase page load time by >100ms
2. **Accessibility**: Feature MUST meet WCAG 2.1 Level AA standards
3. **Mobile-First**: Feature MUST work on mobile devices (375px width minimum)
4. **Browser Support**: Feature MUST work in last 2 versions of major browsers
5. **Documentation**: Customer-facing features MUST have VitePress documentation

## Governance

### Amendment Process
1. **Proposal**: Create discussion document explaining proposed change
2. **Impact Analysis**: Identify affected components, workflows, and documentation
3. **Approval**: Requires consensus among project maintainers
4. **Migration Plan**: Document steps to update existing code if needed
5. **Version Update**: Update constitution version following semantic versioning

### Versioning Policy
- **MAJOR** (X.0.0): Principle removal, backward-incompatible governance changes
- **MINOR** (0.X.0): New principle addition, expanded guidance
- **PATCH** (0.0.X): Clarifications, typo fixes, non-semantic refinements

### Compliance Review
- All pull requests MUST reference this constitution in their description
- Code reviews MUST verify adherence to Core Principles
- Violations MUST be justified in PR description or blocked from merging
- Quarterly audits SHOULD review codebase alignment with constitution

### Template Synchronization
When this constitution is amended:
1. Update `.specify/templates/plan-template.md` Constitution Check section
2. Update `.specify/templates/spec-template.md` requirements validation rules
3. Update `.specify/templates/tasks-template.md` task categorization if new principle added
4. Update `CLAUDE.md` if agent-specific guidance changes
5. Document changes in constitution's Sync Impact Report (HTML comment at top)

**Version**: 1.0.0 | **Ratified**: 2025-10-05 | **Last Amended**: 2025-10-05
