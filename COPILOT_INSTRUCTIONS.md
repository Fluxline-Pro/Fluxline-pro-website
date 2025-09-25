# COPILOT_INSTRUCTIONS.md

## Purpose
This file provides clear development guidelines for GitHub Copilot and contributors working within the Fluxline codebase. It outlines collaboration practices, technical standards, and expectations for code quality and documentation.

---

## Collaboration Guidelines

- All enhancements begin with a clearly written **User Story** that includes context, goals, and acceptance criteria.
- GitHub Copilot should generate modular, maintainable code that aligns with existing architecture and naming conventions.
- Suggestions should be scoped to solve the defined problem and integrate cleanly with the current codebase.

---

## Pull Request Protocol

- All Pull Requests (PRs) must be created **against the `develop` branch**.
- PR titles should follow conventional commit formats (e.g., `feat: add page stepper navigation`).
- Each PR must include:
  - A summary of the change
  - Reference to the related issue or user story
  - Notes on any visual, functional, or accessibility impact

---

## Theming Standards

- Use the `theme.ts` file located in `src/theme` as the **source of truth** for all styling.
- Follow **Fluent UI v8 standards** for component design, spacing, typography, and responsiveness.
- Avoid hardcoded styles—use theme tokens and variables to ensure consistency and scalability.

---

## Testing Requirements

- **Unit tests are required** for all components that include logic, state management, or user interaction.
- Use descriptive test names and ensure coverage for edge cases and expected behavior.
- Prefer colocated test files (e.g., `ComponentName.test.tsx`) for maintainability.

---

## Documentation Updates

- When new components or features are added, update the `README.md` file to include:
  - Purpose and usage
  - Props and configuration options
  - Any relevant examples or screenshots

---

## Development Workflow Summary

1. **User Story** created with clear goals and acceptance criteria.
2. **Copilot** generates code aligned with architectural and theming standards.
3. **Unit tests** written to validate functionality and handle edge cases.
4. **Code review** ensures quality, maintainability, and adherence to standards.
5. **Documentation** updated to reflect new features or changes.

---

## Architecture Notes

### Component Structure
- Components are organized in `src/theme/components/` by feature
- Each component should have its own folder with:
  - Main component file (`component-name.tsx`)
  - Styles file (`component-name.module.scss`) if needed
  - Test file (`component-name.test.tsx`)
  - Type definitions if complex

### Routing & Navigation
- Routes are defined in `src/routing/constants.ts` 
- Use the `ROUTES` array for navigation logic
- Main menu items have `isMenuItem: true`
- Navigation should respect the established flow

### Theme System
- Fluxline Pro uses a comprehensive theme system in `src/theme/theme.ts`
- Default theme is dark mode with deep black (#010101) background
- Follow the text transform progression: H1-H2 (uppercase) → H3-H4 (title case) → H5 (lowercase) → H6 (uppercase accents)
- Use the primary motion curve: `cubic-bezier(0.4, 0, 0.2, 1)` for animations

### State Management
- Use Zustand stores in `src/store/store-specs/`
- Follow existing patterns for state management
- Keep stores focused and modular

### Accessibility
- All interactive elements must be keyboard accessible
- Use proper ARIA labels and roles
- Ensure color contrast ratios meet WCAG guidelines
- Support screen readers with meaningful descriptions

---

## Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces for all props and data structures  
- Prefer type inference where possible, explicit types where clarity is needed

### React Patterns
- Use functional components with hooks
- Implement proper error boundaries where appropriate
- Use React.memo for performance optimization when needed
- Follow the existing patterns for component composition

### Naming Conventions
- Components: PascalCase (`PageStepper`)
- Files: kebab-case (`page-stepper.tsx`)  
- Variables/functions: camelCase (`navigateToNext`)
- Constants: UPPER_SNAKE_CASE (`NAVIGATION_ROUTES`)

---

## Performance Considerations

- Use React.lazy for code splitting where appropriate
- Implement intersection observers for scroll-based features
- Debounce scroll event handlers
- Use CSS-in-JS patterns that align with the theme system
- Optimize images and assets for web delivery

---

This document should be updated as the codebase evolves and new patterns emerge.