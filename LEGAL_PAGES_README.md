# Legal & Reference Pages

This document describes the implementation of legal and reference pages for the Fluxline.pro website.

## Overview

The legal pages feature provides a dedicated section for important legal documents and reference materials, including:

1. **Terms of Use** - Terms and conditions governing website usage
2. **Privacy Policy** - Data collection and privacy practices
3. **Stewardship Contract** - Foundational principles and commitments
4. **Glossary of Terms** - Key concepts and terminology
5. **Articles of Conversion** - Official conversion documents (PDF)

## File Structure

```
/public/legal/
├── terms-of-use.md
├── privacy-policy.md
├── stewardship-contract.md
├── glossary.md
└── articles-of-conversion-placeholder.txt (replace with actual PDF)

/src/pages/legal/
├── legal-constants.ts
├── legal-page.tsx
└── legal-page.css
```

## Routes

The following routes have been added:

- `/legal` - Legal documents list view
- `/legal/:id` - Individual document view (e.g., `/legal/terms-of-use`)

## Usage

### Navigation

Users can access legal pages via:

1. Direct URL navigation to `/legal`
2. Navigation from list view to individual documents
3. Back navigation to return to the document list

### Document Types

#### Markdown Documents
- Rendered using basic markdown-to-HTML conversion
- Styled with Fluxline theme typography and spacing
- Responsive layout for mobile, tablet, and desktop

#### PDF Documents
- Opened in a modal overlay using the existing `PdfModal` component
- Downloadable with a download button
- Closeable with escape key or close button

## Styling

The legal pages use:

- Fluxline theme system for colors, typography, and spacing
- Container queries for responsive design
- Custom CSS for markdown content formatting
- Typography components for consistent text rendering

### Theme Integration

All pages integrate with:
- `useAppTheme()` hook for theme access
- Fluent UI theme palette for colors
- Typography scale using `clamp()` for responsive sizing
- Semantic colors for backgrounds and text

## Components Used

- `PageWrapper` - Consistent page layout with hero image
- `BaseCard` - Card component for document list
- `Typography` - Themed typography components
- `Container` - Layout container with responsive spacing
- `NavigationArrow` - Back navigation control
- `PdfModal` - PDF viewer modal
- `FluentSpinner` - Loading indicator

## Markdown Rendering

Documents are rendered using a basic markdown-to-HTML converter that supports:

- Headers (h1, h2, h3)
- Bold text (**text** or __text__)
- Italic text (*text* or _text_)
- Unordered lists (- item)
- Line breaks and paragraphs

### Future Enhancement

For richer markdown support, the implementation can be upgraded to use:
- `react-markdown` for full markdown rendering
- `@mdx-js/react` for MDX support with React components
- Syntax highlighting for code blocks

## Copyright Notice

All legal documents include a copyright footer:
```
© 2025–Present Fluxline Resonance Group. All rights reserved.
```

The copyright symbol is properly rendered as `&copy;` in the markdown files.

## Adding New Legal Documents

To add a new legal document:

1. Create a markdown file in `/public/legal/`
2. Add an entry to `LEGAL_PAGES` array in `legal-constants.ts`:
   ```typescript
   {
     id: 'document-id',
     title: 'Document Title',
     description: 'Brief description',
     path: '/legal/document-file.md',
     isPdf: false,
   }
   ```
3. The document will automatically appear in the legal pages list

## PDF Documents

To add the actual Articles of Conversion PDF:

1. Place the PDF file at `/public/legal/articles-of-conversion.pdf`
2. Remove or replace the placeholder file
3. The PDF will be accessible via the modal viewer

## Accessibility

The implementation includes:

- Keyboard navigation support (Escape key closes PDF modal)
- Semantic HTML structure
- Responsive typography with clamp() for readability
- High contrast theme support through Fluxline theme system
- Proper heading hierarchy (h1 → h2 → h3)

## Testing

To test the implementation:

1. Navigate to `/legal` in the browser
2. Verify all five documents are listed
3. Click on a markdown document to view its content
4. Verify proper formatting and styling
5. Click the back arrow to return to the list
6. Click on the Articles of Conversion to open the PDF modal
7. Test PDF modal controls (download, close)
8. Test responsive behavior on different screen sizes

## Configuration

### Page Wrapper Configuration

Legal pages use the Fluxline logo as the hero image:

```typescript
'/legal': {
  image: 'FLUXLINE_LOGO',
  imageText: '',
}
```

### Routing Constants

Legal route is registered in the routing constants:

```typescript
{
  name: 'legal',
  path: 'legal',
  isMenuItem: false,
  isContentScreen: false,
}
```

## Notes

- The implementation follows Fluxline's existing patterns for content pages
- Styling is consistent with the overall site design
- The code is TypeScript-safe with proper type definitions
- The implementation uses minimal dependencies (no external markdown libraries required)
