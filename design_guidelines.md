# Vita Studios Website Design Guidelines

## Design Approach
**Reference-Based**: Apple HIG-inspired premium minimalism with cinematic gaming aesthetics. Drawing from Apple's effortless sophistication, combined with high-end game studio presentation (similar to Naughty Dog, Remedy Entertainment).

## Core Design Principles
- **Premium Minimalism**: Everything should feel expensive through restraint and precision
- **Cinematic Experience**: Treat each section as a scene with breathing room
- **Effortless Sophistication**: Clean, spacious, with subtle depth through shadows
- **Futuristic yet Accessible**: Modern without being cold

## Color Palette

**Light Mode (Primary)**
- Background: 0 0% 100% (pure white)
- Primary Text: 0 0% 0% (pure black)
- Secondary Text: 0 0% 40% (medium gray)
- Dividers: 0 0% 90% (soft gray)
- Accent/Hover: 210 100% 60% (celestial blue)
- Shadow: 0 0% 0% at 3-5% opacity (subtle depth)

## Typography
**Font Stack**: System fonts for crispness
- Headings: -apple-system, BlinkMacSystemFont, "Segoe UI" - 600 weight
- Body: Same stack - 400 weight
- Hero Title: 64-72px desktop, 36-42px mobile
- Section Headings: 36-42px
- Body Text: 16-18px with 1.6 line-height
- Bios/Captions: 14px

## Layout System
**Spacing Units**: Use Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Section Padding: py-20 to py-32 desktop, py-12 mobile
- Container: max-w-7xl with px-6 to px-12
- Element Spacing: Generous gaps (12-16 units between major elements)

## Component Library

### Hero Section
- Full viewport height with cinematic still background image
- Centered layout with "A Better Tomorrow" title
- Tagline below: "Crafting worlds beyond imagination"
- Vita Studios logo positioned top-left
- Smooth fade-in animation on load (1.2s duration)
- Image overlay: subtle black gradient (0-20% opacity) for text legibility

### About Section
- Two-column grid (text left, image right) on desktop, stacked on mobile
- max-w-6xl container
- Text column: max-w-prose for readability
- Image: rounded corners (8px), subtle shadow
- Thin divider below section (1px, gray)

### Projects Section
- Card grid layout: 1 column mobile, 2-3 columns desktop
- A Better Tomorrow featured larger/first
- Sharp edges on cards, soft shadow on hover (0 4px 16px rgba(0,0,0,0.08))
- Large visuals with 16:9 aspect ratio
- Minimal text overlay: project title + one-line description
- Hover transition: transform scale(1.02) with 0.3s ease

### Team Section
- Founders: 3 circular portraits in a row, 160px diameter
- Developers: 6 portraits below in 2-3 column grid, 120px diameter
- Names below each portrait (16px bold)
- One-line bios (14px gray text)
- Subtle shadow on portraits (0 2px 8px rgba(0,0,0,0.06))

### Contact Section
- Centered form, max-w-lg
- Input fields: thin borders (1px gray), minimal padding
- Celestial blue accent on focus (border color transition)
- Labels above inputs (14px, gray)
- Submit button: filled celestial blue, white text
- Form spacing: generous vertical gaps (8 units)

## Animations
- Page load: Fade-in hero content (opacity 0 to 1, 1.2s)
- Section reveals: Gentle fade-up on scroll (20px translateY to 0)
- Parallax: Subtle hero image shift on scroll (0.3 speed)
- Transitions: All 0.3s ease for hovers and interactions
- NO harsh or distracting animations

## Images
**Large Hero Image**: Yes - cinematic still from "A Better Tomorrow" as full-viewport hero background
**About Section**: Studio workspace or creative process image (right side)
**Projects Section**: Game screenshots/key art for each project card
**Team Section**: Professional circular portraits for all team members

## Accessibility
- Maintain WCAG AA contrast ratios (black text on white ensures this)
- Ensure celestial blue accent meets contrast requirements on white
- Form inputs clearly labeled and focusable
- Smooth scroll behavior for section navigation