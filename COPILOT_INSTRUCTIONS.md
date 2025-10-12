# COPILOT_INSTRUCTIONS.md

## Purpose
This repository contains the Fluxline Resonance Group's web platform. It is built with **React 19.1.0** (not Next.js) using **Create React App** and follows strict design, layout, and architectural guidelines for maintainability, UI consistency, and future integration with Azure backend services.

---

## General Development Guidelines

### Theme & Design System
- **Always use `theme.ts` and Fluent UI v8 design standards**
  - All new components and features must utilize pre-defined theming, spacing, typography, and color palettes located in `/src/theme/theme.ts`
  - The theme system supports dark mode (default), light mode, and high-contrast mode
  - Fluent UI v8.122.17+ provides the core component library

### Package Management
- **Use the `yarn` package manager exclusively** for all dependency management and scripts
  - Do not use `npm` for installs, scripts, or lockfiles
  - Current Node.js requirement: **>= 20.0.0** (specified in `package.json`)
  - Ensure all packages (TypeScript, SASS, Fluent UI, Zustand, etc.) are kept up to date
  - If a version upgrade is required for any packages, do so under a separate feature branch request for full testing

### Node & Environment
- The project uses **Node.js >= 20.0.0**
- `.nvmrc` file should be maintained if Node version needs to be pinned for consistency
- Environment variables should be configured in `.env.local` (see `.env.example` for reference)
- Development server: `yarn start` (includes SCSS type generation watch)
- Production build: `yarn build`

### Styling
- **Priority order: Fluent UI DSM → Theme.ts → SCSS**
  - Primary styling should be achieved with **Fluent UI** themed components and built-in typography
  - Use `theme.ts` constants for spacing, colors, breakpoints, and z-indices
  - Use SCSS modules (`*.module.scss`) for supplemental/specific styles only
  - Avoid excessive SCSS and minimize the use of `!important`
  - Maintain DSM (Design System Module) standards from Fluent UI for all styles and overrides
  - Auto-generated SCSS type definitions (`*.module.scss.d.ts`) are ignored in git

### Component Reuse & Layout
- **Favor reusing existing components**, including:
  - **ViewportGrid** and **LayoutGrid**: Core responsive layout components
  - **Container**: Wrapper components with consistent padding and max-width
  - **Typography**: Text components with theme-based styling
  - **page-wrapper**: Standard page layout structure
  - **UnifiedContentPage**: Dynamic content management system for blog, media, press
  - **ServicesPage**: Static service and about content handler
- **Do not alter underlying design and layout unless approved**
- Use the component generator for new components: `yarn generate:component ComponentName`

### State & Data Handling
- **Use Zustand exclusively for client-side state management**
  - All data points, API payloads, callback results, and local data should use Zustand stores
  - Existing stores are located in `/src/store/store-specs/`:
    - `apiStore.ts`, `authorsStore.ts`, `blogPostsStore.ts`, `booksStore.ts`
    - `contactStore.ts`, `contentStore.ts`, `githubStore.ts`, `mediaStore.ts`
    - `navigationStore.ts`, `portfolioPiecesStore.ts`, `userPreferencesStore.ts`
    - `combinedApiStore.ts` for unified API health checks
- Provide **mock data with complete schema** for new features to aid backend/DB development
- Document data shapes and API integration requirements clearly

### Markdown & Content
- All business/legal document content (Terms, Privacy, Stewardship, Glossary) must be loaded from Markdown/JSX
- Render using Fluxline's Typography components from `/src/theme/components/typography/`
- **Use relative URLs for document routes**: `/terms`, `/privacy-policy`, `/stewardship`, `/glossary`
- Update legacy Notion links to use local routes
- Static content lives in `/src/pages` or data files
- Dynamic content uses the **UnifiedContentPage** system

### Navigation
- All new features/pages must be added to `/src/theme/components/header/navigation-menu.tsx`
- Follow consistent navigation patterns defined in `navigation.config.tsx` and `navigation.types.ts`
- Navigation state is managed via `navigationStore.ts`

### Backend & API
- Future backend integration will use **Azure Storage** and **Azure Functions**
  - Reference implementation: [tw-az-functions-platform](https://github.com/AplUSAndmINUS/tw-az-functions-platform)
  - Current API layer documentation in `/src/api/README.md` shows Azure Functions integration patterns
- Mock APIs or serverless functions should follow Azure-compatible standards until full integration
- **Include complete schemas and payload shapes** for all API interactions
- API configuration should use environment variables:
  - `NEXT_PUBLIC_API_BASE_URL` (currently references TerenceWaters.com - will be updated to Fluxline.pro)
  - `NEXT_PUBLIC_CDN_BASE_URL` (Azure CDN endpoint)
  - `NEXT_PUBLIC_API_KEY` (API authentication key)
  - `NEXT_PUBLIC_ENVIRONMENT` (development, staging, production)

---

## Coding Best Practices

### TypeScript
- Maintain **strict TypeScript typing** throughout the codebase
- No implicit `any` types - define proper interfaces and types
- Type definitions for external libraries should be kept up to date

### Component Development
- Use **functional components and hooks exclusively**
- Follow React 19.1.0 best practices
- Prefer composition over inheritance
- Keep components focused and single-responsibility

### Styling Approach
- **Adhere to JSX Fluent UI DSM practices and theme.ts BEFORE SCSS**
  - Example: Use `theme.palette.themePrimary` instead of hardcoded colors
  - Example: Use `theme.spacing.xl` instead of custom margin values
- **SCSS should be used second**, only when Fluent UI or theme.ts cannot achieve the desired result
- Adhere to SASS coding standards:
  - Use nesting appropriately (max 3 levels deep)
  - Avoid `!important` whenever possible
  - Use CSS custom properties for dynamic values
  - Follow BEM naming conventions for SCSS classes

### Accessibility & Responsiveness
- Follow all **WCAG 2.1 AA accessibility guidelines**
- Ensure keyboard navigation works throughout
- Provide appropriate ARIA labels and roles
- Test with screen readers when implementing interactive components
- Use container queries for responsive design
- Support all breakpoints defined in theme.ts:
  - xs: 0-575px (mobile)
  - sm: 576-767px (small tablet)
  - md: 768-1023px (tablet)
  - lg: 1024-1365px (small desktop / iPad Pro)
  - xl: 1366-1919px (large desktop)
  - xxl: 1920px+ (high-resolution desktop)

### Theme Support
- Ensure all pages/components work with Fluxline's theme modes:
  - **Dark mode** (default): Deep black (`#010101`) background
  - **Light mode**: Clean, airy aesthetic
  - **High contrast mode**: Maximum legibility
- Logo, palette, and all visual elements must support theme switching
- Use theme-aware colors from `theme.palette` for all color references

### Documentation
- Keep DSM conventions central to all UI/UX decisions
- **Document all new features, data shapes, and key logic flows**:
  - Code comments for complex logic
  - JSDoc comments for public functions and components
  - Markdown documentation for features and patterns
  - Update README.md when adding major features
- If implementing mock data, document:
  - Complete schema definition
  - Expected backend data structure
  - Integration points and requirements

### Technical Debt & Quality
- **Actively remove technical debt found along the way**
  - Refactor outdated patterns when encountered
  - Test functionality after cleanup to ensure nothing breaks
- **Unit testing should be included when possible**:
  - Especially for API calls, mock data handlers, and business logic
  - Use React Testing Library for component tests
  - Follow existing test patterns in `/src/test/`
- Run tests with `yarn test`
- Ensure linting passes before committing

---

## Technology Stack

### Core Framework
- **React 19.1.0** - Frontend framework (NOT Next.js)
- **Create React App 5.0.1** - Build tooling and development server
- **TypeScript 5.8.3+** - Type safety and developer experience

### UI & Styling
- **Fluent UI 8.122.17+** - Microsoft's design system components
- **Sass 1.88.0+** - CSS preprocessing (SCSS modules)
- **Bootstrap 5.3.6+** - CSS framework (supplemental, used sparingly)
- **Framer Motion 12.23.0+** - Animation library for subtle entrance animations

### Routing & State
- **React Router Dom 7.6.0+** - Client-side routing
- **Zustand 5.0.4+** - State management (all stores)

### Build & Development Tools
- **typed-scss-modules** - Auto-generate TypeScript definitions for SCSS modules
- **concurrently** - Run multiple scripts simultaneously (`yarn start`)
- **Prettier 3.5.3+** - Code formatting
- **Jest & React Testing Library** - Testing infrastructure

### Backend Integration (Planned)
- **Azure Static Web Apps** - Hosting platform
- **Azure Functions** - Serverless API backend
- **Azure Storage** - Media and asset storage
- **Azure CDN** - Content delivery for media assets

---

## Project Structure

### Key Directories

```
/src
├── /api              # API client layer, types, and Zustand stores
├── /assets           # Images, SVGs, fonts, and static assets
│   ├── /svgs         # Custom SVG components
│   └── /white-pages  # Service PDFs and documents
├── /config           # Configuration files
├── /hooks            # Custom React hooks
├── /md-prompts       # Markdown prompt templates
├── /pages            # Page components (Home, Services, Portfolio, etc.)
│   ├── /home         # Landing page
│   ├── /services     # Services and about content
│   └── [other pages] # Blog, Media, Portfolio, Contact, etc.
├── /routing          # React Router configuration
├── /store            # Zustand store specifications
│   └── /store-specs  # Individual store implementations
├── /styles           # Global styles and SCSS utilities
├── /theme            # Theme system and reusable components
│   ├── /components   # Reusable UI components
│   ├── /contexts     # React context providers
│   ├── /hooks        # Theme-related hooks
│   ├── /layouts      # ViewportGrid, LayoutGrid, Container
│   ├── /utils        # Theme utilities
│   └── theme.ts      # Core theme configuration
└── /utils            # General utility functions
```

### Important Files

- `theme.ts` - Core theme system (colors, spacing, typography, breakpoints)
- `navigation-menu.tsx` - Main navigation configuration
- `staticwebapp.config.json` - Azure Static Web Apps configuration
- `package.json` - Dependencies and scripts (use yarn only)
- `.gitignore` - Excludes build artifacts, node_modules, .env files, generated SCSS types

---

## Development Workflow

### Starting Development
```bash
yarn install          # Install dependencies
yarn start            # Start dev server + SCSS type generation watch
```

### Building for Production
```bash
yarn build            # Create optimized production build
```

### Running Tests
```bash
yarn test             # Run Jest test suite
```

### Component Generation
```bash
yarn generate:component ComponentName
# Creates component with .tsx, .module.scss, .storybook.tsx, and .test.ts files
```

### SCSS Type Generation
```bash
yarn scss-types       # Generate TypeScript definitions once
yarn scss-types:watch # Watch mode (included in yarn start)
```

---

## Issue & Pull Request Instructions

### For New Issues and PRs

1. **Reference this file** - Copy critical context into the issue body if needed
2. **Tag related files** - Mention specific components, pages, or utilities affected
3. **Document requirements clearly**:
   - Mock data needs and complete schemas
   - Navigation additions (update `navigation-menu.tsx`)
   - Theming requirements (dark/light/high-contrast support)
   - DSM adherence and design structure
4. **State integration needs**:
   - Azure API endpoints required
   - Backend integration points
   - Zustand store requirements
5. **Specify UX/design**:
   - Layout expectations (ViewportGrid, LayoutGrid, Container usage)
   - Component reuse opportunities
   - Responsive behavior across breakpoints
   - Accessibility requirements

### Branching Strategy
- Create feature branches from `develop`
- Use descriptive branch names: `feature/add-glossary-page`, `fix/navigation-mobile`
- Ensure all linting and build checks pass before PR
- Include tests for new features when applicable

### Code Review Checklist
- [ ] Follows theme.ts and Fluent UI DSM patterns
- [ ] Uses yarn (not npm) for any dependency changes
- [ ] TypeScript types are properly defined
- [ ] Works in dark mode, light mode, and high-contrast mode
- [ ] Responsive across all breakpoints (xs to xxl)
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Navigation updated if new routes added
- [ ] Documentation updated (code comments, README if needed)
- [ ] Build passes: `yarn build`
- [ ] Tests pass: `yarn test` (if tests exist)
- [ ] No console errors or warnings in development

---

## Notes

- This site was originally based on TerenceWaters.com codebase and adapted for Fluxline Pro
- API references in `/src/api/README.md` currently point to TerenceWaters.com endpoints
- Once Fluxline Pro backend services are implemented, update:
  - Environment variables (`.env.local`)
  - API base URLs in configuration
  - `staticwebapp.config.json` for Azure deployment
  - CDN URLs for media assets
- The project uses **Create React App**, not Next.js - there is no server-side rendering
- All routing is client-side via React Router Dom
- Build output goes to `/build` directory for Azure Static Web Apps deployment

---

**Built with strategic precision for modern business transformation.**

*Last Updated: 2025-10-12*
