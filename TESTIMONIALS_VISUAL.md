# Testimonials Page - Visual Description

## Page Layout Overview

### Header Section
```
┌─────────────────────────────────────────────────────────────┐
│                    What Our Clients Say                     │
│                                                             │
│  Hear from the businesses and individuals we've helped      │
│  transform through strategic consulting, training, and      │
│           development services.                             │
└─────────────────────────────────────────────────────────────┘
```

### Featured Testimonials Carousel
```
┌─────────────────────────────────────────────────────────────┐
│ Featured Testimonials                                       │
│                                                             │
│  ◄  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ►│
│     │ ╭────────╮   │  │ ╭────────╮   │  │ ╭────────╮   │   │
│     │ │ Avatar │   │  │ │ Avatar │   │  │ │ Avatar │   │   │
│     │ │  [★]   │   │  │ │  [★]   │   │  │ │  [★]   │   │   │
│     │ ╰────────╯   │  │ ╰────────╯   │  │ ╰────────╯   │   │
│     │              │  │              │  │              │   │
│     │ "Quote..."   │  │ "Quote..."   │  │ "Quote..."   │   │
│     │              │  │              │  │              │   │
│     │ John Doe     │  │ Jane Smith   │  │ Bob Wilson   │   │
│     │ CEO, Acme    │  │ CTO, Beta    │  │ VP, Gamma    │   │
│     │ ★★★★★        │  │ ★★★★★        │  │ ★★★★★        │   │
│     │ [View Full]  │  │ [View Full]  │  │ [View Full]  │   │
│     └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### All Testimonials Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col)
```
┌─────────────────────────────────────────────────────────────┐
│ All Testimonials                                            │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ ○ Avatar │  │ ○ Avatar │  │ ○ Avatar │                │
│  │          │  │          │  │          │                │
│  │ Name     │  │ Name     │  │ Name     │                │
│  │ Title    │  │ Title    │  │ Title    │                │
│  │          │  │          │  │          │                │
│  │ "Quote"  │  │ "Quote"  │  │ "Quote"  │                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ ○ Avatar │  │ ○ Avatar │  │ ○ Avatar │                │
│  │          │  │          │  │          │                │
│  │ Name     │  │ Name     │  │ Name     │                │
│  │ Title    │  │ Title    │  │ Title    │                │
│  │          │  │          │  │          │                │
│  │ "Quote"  │  │ "Quote"  │  │ "Quote"  │                │
│  └──────────┘  └──────────┘  └──────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Browse Testimonials Carousel (Bottom)
```
┌─────────────────────────────────────────────────────────────┐
│ Browse Testimonials                                         │
│                                                             │
│  ◄  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ►    │
│     │ Avatar │  │ Avatar │  │ Avatar │  │ Avatar │        │
│     │ Name   │  │ Name   │  │ Name   │  │ Name   │        │
│     │ Quote  │  │ Quote  │  │ Quote  │  │ Quote  │        │
│     └────────┘  └────────┘  └────────┘  └────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Modal View (When Card Clicked)

```
┌───────────────────────────────────────────────────────────────┐
│                                                          [X]  │
│                                                               │
│    ╭──────────╮                                              │
│    │          │      John Doe                                │
│    │  Avatar  │      Chief Technology Officer                │
│    │          │      Acme Corporation                        │
│    ╰──────────╯      Services: Strategic Consulting, Dev    │
│                                                               │
│    ┌────────────────────────────────────────────────────┐   │
│    │ "Working with Fluxline transformed our entire      │   │
│    │  approach to digital strategy."                    │   │
│    └────────────────────────────────────────────────────┘   │
│                                                               │
│    The expertise demonstrated by the Fluxline team exceeded  │
│    all expectations. Our productivity increased significantly│
│    after implementing their recommendations. They provided   │
│    invaluable insights that made a real difference to our    │
│    business operations...                                    │
│                                                               │
│    ★★★★★ 5/5                                                │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Mobile View (< 768px)

```
┌──────────────────┐
│ What Our Clients │
│      Say         │
│                  │
│ Description text │
│ about services   │
└──────────────────┘

┌──────────────────┐
│ Featured         │
│ Testimonials     │
│                  │
│ ┌──────────────┐ │
│ │  ╭────────╮  │ │
│ │  │ Avatar │  │ │  ← Swipe
│ │  │  [★]   │  │ │
│ │  ╰────────╯  │ │
│ │              │ │
│ │  "Quote..."  │ │
│ │              │ │
│ │  John Doe    │ │
│ │  CEO, Acme   │ │
│ │  ★★★★★       │ │
│ │  [View Full] │ │
│ └──────────────┘ │
└──────────────────┘

┌──────────────────┐
│ All Testimonials │
│                  │
│ ┌──────────────┐ │
│ │ ○ Avatar     │ │
│ │              │ │
│ │ Name         │ │
│ │ Title        │ │
│ │              │ │
│ │ "Quote..."   │ │
│ └──────────────┘ │
│                  │
│ ┌──────────────┐ │
│ │ ○ Avatar     │ │
│ │              │ │
│ │ Name         │ │
│ │ Title        │ │
│ │              │ │
│ │ "Quote..."   │ │
│ └──────────────┘ │
│                  │
│      [...]       │
└──────────────────┘
```

## Interaction Flow

1. **Page Load**
   - Header fades in
   - Featured carousel loads with 2 featured testimonials
   - Grid displays remaining 10 testimonials
   - Bottom carousel shows all 12 for browsing

2. **Card Click**
   - Fade in dark overlay (85% opacity)
   - Modal scales in from 95% to 100%
   - Body scroll locks
   - Focus moves to modal

3. **Modal Interactions**
   - ESC key closes modal
   - Click outside modal closes it
   - Click X button closes it
   - Modal fades out
   - Body scroll unlocks

4. **Carousel Navigation**
   - **Desktop**: Arrow buttons visible when can scroll
   - **Mobile/Tablet**: Swipe gesture, no arrows
   - Smooth scroll animation
   - Snap to card positions

5. **Responsive Behavior**
   - **Desktop (>1024px)**: 3 grid columns, 3 carousel cards
   - **Tablet (768-1024px)**: 2 grid columns, 2 carousel cards
   - **Mobile (<768px)**: 1 grid column, 1 carousel card

## Color Scheme

- **Primary**: Theme primary color (blues/purples per theme)
- **Background**: neutralLighterAlt for containers
- **Text**: neutralPrimary for main text
- **Text Secondary**: neutralSecondary for subtitles
- **Stars**: themePrimary when filled, neutralLight when empty
- **Borders**: themePrimary for featured items
- **Hover**: neutralLighter for buttons

## Typography

- **Page Title**: h1, clamp8 (mobile) / clamp8 (desktop)
- **Section Titles**: h2, clamp6
- **Client Names**: h2 (modal) / h3 (featured) / title (cards)
- **Job Titles**: p, clamp3-4
- **Quotes**: p, italic style, clamp4-5
- **Body Text**: p, clamp3

## Spacing

- **Section Gap**: xxl (theme.spacing.xxl)
- **Card Gap**: 1.5rem (grid), m (carousel)
- **Internal Padding**: l (mobile), xl (desktop)
- **Modal Padding**: l (mobile), xl (desktop)

## Animations

- **Page Sections**: FadeUp with staggered delays (0ms, 200ms, 400ms)
- **Modal**: fadeIn (0.3s ease-in-out)
- **Cards**: Scale on hover (1.02), smooth transition
- **Carousel**: Smooth scroll behavior with snap points
- **Buttons**: Transform scale(1.1) on hover
