# Legal Pages Visual Structure

## Page Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Homepage (/)                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Legal & Reference (/legal)                  │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  [←] Legal & Reference                         │    │
│  ├────────────────────────────────────────────────┤    │
│  │  Access important legal documents and          │    │
│  │  reference materials...                         │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Terms of Use │  │Privacy Policy│  │ Stewardship  │ │
│  │              │  │              │  │  Contract    │ │
│  │ Review the   │  │ Learn how    │  │ Explore the  │ │
│  │ terms...     │  │ we collect...│  │ foundational │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │  Glossary of │  │  Articles of │                    │
│  │    Terms     │  │  Conversion  │                    │
│  │              │  │              │                    │
│  │ Understand   │  │ View or      │                    │
│  │ key concepts │  │ download...  │                    │
│  │              │  │ PDF Document │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
                          │
                          │ (Click on card)
                          ↓
┌─────────────────────────────────────────────────────────┐
│         Individual Document View                         │
│         (/legal/terms-of-use)                           │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  [←] Terms of Use                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  # Terms of Use                                │    │
│  │                                                 │    │
│  │  ## Introduction                               │    │
│  │                                                 │    │
│  │  Welcome to Fluxline Resonance Group...        │    │
│  │                                                 │    │
│  │  ## Acceptance of Terms                        │    │
│  │                                                 │    │
│  │  By accessing or using our website...          │    │
│  │                                                 │    │
│  │  ...                                           │    │
│  │                                                 │    │
│  │  © 2025–Present Fluxline Resonance Group.     │    │
│  │  All rights reserved.                          │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Legal Page List View (/legal)

**Layout:**
- PageWrapper with Fluxline logo header image
- Back arrow navigation (← to home)
- Page title: "Legal & Reference"
- Description paragraph
- Grid of document cards (responsive: 1 column on mobile, multiple on desktop)

**Document Cards:**
- Each card displays:
  - Document title (h3, theme primary color)
  - Description text (p, neutral color)
  - "PDF Document" indicator (for PDF files, italic, tertiary color)
- Hover effect: Card translates up 4px
- Click action: Navigate to document or open PDF modal

### Individual Document View (/legal/:id)

**Layout:**
- PageWrapper with Fluxline logo header image
- Back arrow navigation (← to legal list)
- Document title as page heading
- Content container with:
  - Background: semantic body background color
  - Border radius: rounded corners
  - Padding: responsive (more on desktop, less on mobile)
  - Rendered markdown content

**Content Styling:**
- H1: Large responsive font (clamp 1.75rem - 2.5rem)
- H2: Medium responsive font (clamp 1.4rem - 2rem)
- H3: Small responsive font (clamp 1.2rem - 1.5rem)
- Paragraphs: Left-aligned, 1rem bottom margin
- Lists: Disc bullets, 2rem left padding
- Line height: 1.8 for readability
- Copyright footer at bottom

### PDF Modal (Articles of Conversion)

**Layout:**
- Full-screen overlay with dark background (rgba(0,0,0,0.9))
- Modal container with:
  - Header bar with document title and controls
  - Download button (primary variant, with icon)
  - Close button (error variant, circular, icon only)
  - PDF iframe viewer
- Escape key closes modal
- Click outside closes modal

## Responsive Behavior

### Mobile (< 768px)
- Single column card grid
- Reduced padding
- Smaller navigation arrows
- Font sizes adjust via clamp()

### Tablet (768px - 1024px)
- Max content width: 700px
- Two-column card grid (if space permits)
- Medium spacing

### Desktop (> 1024px)
- Max content width: 900px
- Multi-column card grid (auto-fit, min 280px)
- Large spacing
- Hover effects on cards

## Color Scheme (Fluxline Theme)

- **Primary**: Used for titles and headings
- **Neutral Primary**: Used for body text
- **Tertiary**: Used for secondary information
- **Body Background**: Used for content containers
- **Semantic Colors**: Dynamic based on theme mode (light/dark)

## Typography Scale

Uses Fluxline's clamp-based responsive typography:
- clamp7: Page titles
- clamp5: Card titles
- clamp4: Document body text
- clamp3: Card descriptions
- clamp2: Meta information

## Accessibility Features

- Semantic HTML structure (h1 → h2 → h3)
- Keyboard navigation (arrow keys, escape)
- High contrast support via theme
- Screen reader friendly
- Focus indicators on interactive elements
- Proper ARIA labels (via components)

## Files Created

```
public/legal/
├── terms-of-use.md (3.0K)
├── privacy-policy.md (3.4K)
├── stewardship-contract.md (4.1K)
├── glossary.md (6.3K)
└── articles-of-conversion-placeholder.txt (380B)

src/pages/legal/
├── legal-constants.ts (1.5K) - Type definitions and document list
├── legal-page.tsx (9.9K) - Main component
└── legal-page.css (1.3K) - Document content styling
```

## Integration Points

### Routing
- Added routes in `src/routing/routes.tsx`
- Added constants in `src/routing/constants.ts`

### Page Wrapper
- Added configuration in `src/pages/page-wrapper/page-wrapper.tsx`
- Uses Fluxline logo for header image

### Components Used
- PageWrapper (layout with hero image)
- BaseCard (document list cards)
- Typography (themed text)
- Container (layout container)
- NavigationArrow (back navigation)
- PdfModal (PDF viewer)
- FluentSpinner (loading state)

## User Journey

1. User navigates to `/legal`
2. Sees list of 5 legal documents
3. Clicks on a markdown document (e.g., Terms of Use)
4. Views formatted document with proper styling
5. Clicks back arrow to return to list
6. Clicks on Articles of Conversion (PDF)
7. PDF modal opens with viewer and download option
8. Downloads or closes modal
9. Returns to legal list or navigates elsewhere
