# Fluxline Pro Website

Strategic architecture for modern business transformation.

## Overview

This website serves as the digital presence for Fluxline, showcasing our strategic consulting, business architecture, and transformation solutions. The site has been restructured from a TW.com clone to align with Fluxline's modular brand architecture and updated sitemap.

## Sitemap & Section Responsibilities

The website is organized into the following main sections:

| Section                     | Path              | Description                                               |
|----------------------------|-------------------|-----------------------------------------------------------|
| **Home**                   | `/`               | Hero banner, brand highlights, service overview, and CTA |
| **About Fluxline**        | `/about`          | Vision, ethos, leadership, and company philosophy         |
| **Services**               | `/services`       | Modular service blocks with detailed offerings           |
| **Strategic Architecture** | `/architecture`   | Deep-dive into our architectural approach and methodologies |
| **Portfolio / Case Studies** | `/portfolio`   | Client success stories, visuals, and testimonials        |
| **Blog**                   | `/blog`           | Strategic insights, thought leadership, and industry updates |
| **Media**                  | `/media`          | Podcasts, videos, and multimedia content                 |
| **Collaborate**            | `/collaborate`    | Contact forms, partnership opportunities, and media kit  |
| **Press & Announcements** | `/press`          | Terms, privacy, disclosures, and launch preparations     |

## Architecture Notes

### Component Structure
- **ViewportGrid** and **LayoutGrid**: Core layout components (preserved from original structure)
- **Theme Components**: Reusable UI components in `/src/theme/components`
- **Page Components**: Individual page layouts in `/src/pages`
- **Routing**: React Router configuration with nested routes in `/src/routing`

### Content Types
The site uses a unified content management approach:
- **ServicesPage**: Handles static service and about content
- **UnifiedContentPage**: Manages dynamic content (blog, media, press)
- **Portfolio**: Specialized component for case studies and project showcases
- **ContactPage**: Contact forms and collaboration portals

### Placeholder vs Production Content
Currently, the site contains **barebones placeholder content** reflecting Fluxline's core messaging:
- Strategic consulting focus
- Business architecture expertise  
- Transformation solutions emphasis
- Professional, modern branding

## Getting Started

### Prerequisites
- Node.js (>=20.0.0)
- Yarn or npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Fluxline-Pro/Fluxline-pro-website.git
cd Fluxline-pro-website
```

2. Install dependencies:
```bash
yarn install
# or
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `yarn start` / `npm start`: Starts development server with SCSS type generation
- `yarn build` / `npm run build`: Creates production build
- `yarn test` / `npm test`: Runs test suite
- `yarn scss-types` / `npm run scss-types`: Generates TypeScript definitions for SCSS modules

## Technology Stack

- **React 19.1.0** - Frontend framework
- **TypeScript** - Type safety and development experience
- **React Router Dom 7.6.0** - Client-side routing
- **Fluent UI 8.122.17** - Microsoft's design system components
- **Sass** - CSS preprocessing
- **Framer Motion** - Animation library
- **Bootstrap 5.3.6** - CSS framework (supplemental)

## Deployment

### Azure Static Web Apps

The site is configured for deployment on Azure Static Web Apps:

1. The `staticwebapp.config.json` file contains routing and configuration rules
2. Build command: `npm run build`
3. Build output directory: `build`

### Environment Configuration

Create a `.env` file based on `.env.example` for environment-specific settings:
- API endpoints
- Theme configurations
- Brand asset paths

## Development Guidelines

### Component Creation
Use the built-in component generator:
```bash
yarn generate:component ComponentName
# or
npm run generate:component ComponentName
```

### Styling
- Use Fluent UI theme system for consistency
- SCSS modules for custom styling
- Container queries for responsive design
- Follow existing naming conventions

### Content Management
- Static content: Update component props and data files
- Dynamic content: Use the UnifiedContentPage system
- Images: Store in `/public` or `/src/assets`
- Icons: Custom SVG components in `/src/assets/svgs`

## Brand Guidelines

### Visual Identity
- **Primary Colors**: Defined in theme configuration
- **Typography**: Fluent UI typography system with custom home page styling
- **Layout**: Container query-based responsive design
- **Animation**: Subtle entrance animations using Framer Motion

### Messaging
- Focus on strategic value and business transformation
- Professional, authoritative tone
- Clear, concise communication
- Industry expertise emphasis

## Next Steps

### Content Development
- [ ] Replace placeholder content with final copy
- [ ] Add high-quality imagery and brand assets
- [ ] Develop case study content and client testimonials
- [ ] Create blog content and thought leadership articles

### Feature Enhancement
- [ ] Implement contact form functionality
- [ ] Add dynamic content management
- [ ] Integrate analytics and tracking
- [ ] Optimize for SEO and performance

### Launch Preparation
- [ ] Final content review and approval
- [ ] Performance optimization and testing
- [ ] Security review and implementation
- [ ] Domain configuration and SSL setup

## Contributing

1. Create a feature branch from `develop`
2. Make your changes with appropriate tests
3. Ensure all linting and build checks pass
4. Submit a pull request with a clear description

## License

Private repository - All rights reserved by Fluxline Pro.

---

*Built with strategic precision for modern business transformation.*