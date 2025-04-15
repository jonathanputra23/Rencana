# Rencana Design Theme Guide

This document outlines the design system for the Rencana project management application to ensure consistency across all UI components and pages.

## 1. Color Palette

### Primary Colors

| Name | Hex Code | Usage |
|------|----------|-------|
| Primary Blue | `#3B82F6` | Primary buttons, links, active states |
| Primary Blue Light | `#93C5FD` | Hover states, backgrounds |
| Primary Blue Dark | `#1D4ED8` | Pressed states, text on light backgrounds |

### Secondary Colors

| Name | Hex Code | Usage |
|------|----------|-------|
| Secondary Gray | `#6B7280` | Secondary text, icons, borders |
| Secondary Gray Light | `#E5E7EB` | Backgrounds, dividers |
| Secondary Gray Dark | `#374151` | Secondary buttons, text |

### Accent Colors

| Name | Hex Code | Usage |
|------|----------|-------|
| Success Green | `#10B981` | Success messages, completed tasks |
| Warning Yellow | `#F59E0B` | Warnings, in-progress tasks |
| Error Red | `#EF4444` | Error messages, alerts, past due tasks |
| Info Blue | `#3B82F6` | Information messages |

### Neutral Colors

| Name | Hex Code | Usage |
|------|----------|-------|
| White | `#FFFFFF` | Card backgrounds, text on dark backgrounds |
| Light Gray | `#F9FAFB` | Page backgrounds |
| Dark Gray | `#111827` | Text, icons |
| Black | `#000000` | Headings, emphasis |

## 2. Typography

### Font Family

- Primary Font: `Inter, sans-serif`
- Monospace Font (for code): `JetBrains Mono, monospace`

### Font Sizes

| Name | Size | Usage |
|------|------|-------|
| xs | 0.75rem (12px) | Small labels, badges |
| sm | 0.875rem (14px) | Secondary text, captions |
| base | 1rem (16px) | Body text |
| lg | 1.125rem (18px) | Large body text |
| xl | 1.25rem (20px) | Subheadings |
| 2xl | 1.5rem (24px) | Section headings |
| 3xl | 1.875rem (30px) | Page headings |
| 4xl | 2.25rem (36px) | Large headings |

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 3. Spacing

The spacing system is based on a 4px grid, with the following scale:

| Name | Size | Usage |
|------|------|-------|
| px | 1px | Borders |
| 0.5 | 0.125rem (2px) | Tiny spacing |
| 1 | 0.25rem (4px) | Very small spacing |
| 2 | 0.5rem (8px) | Small spacing |
| 3 | 0.75rem (12px) | Medium-small spacing |
| 4 | 1rem (16px) | Medium spacing |
| 5 | 1.25rem (20px) | Medium-large spacing |
| 6 | 1.5rem (24px) | Large spacing |
| 8 | 2rem (32px) | Very large spacing |
| 10 | 2.5rem (40px) | Extra large spacing |
| 12 | 3rem (48px) | Huge spacing |

## 4. Border Radius

| Name | Size | Usage |
|------|------|-------|
| sm | 0.125rem (2px) | Small elements |
| md | 0.375rem (6px) | Buttons, inputs, cards |
| lg | 0.5rem (8px) | Large cards, modals |
| xl | 0.75rem (12px) | Extra large elements |
| full | 9999px | Pills, avatars |

## 5. Shadows

| Name | Value | Usage |
|------|-------|-------|
| sm | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Small elements |
| md | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` | Cards, buttons |
| lg | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` | Dropdowns, popovers |
| xl | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` | Modals, dialogs |
| 2xl | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` | Large modals |

## 6. Component Styles

### Buttons

#### Primary Button
- Background: Primary Blue
- Text: White
- Hover: Primary Blue Dark
- Border Radius: md
- Padding: 0.5rem 1rem (py-2 px-4)
- Font Weight: Medium

#### Secondary Button
- Background: White
- Text: Secondary Gray Dark
- Border: 1px solid Secondary Gray
- Hover: Secondary Gray Light
- Border Radius: md
- Padding: 0.5rem 1rem (py-2 px-4)
- Font Weight: Medium

#### Danger Button
- Background: Error Red
- Text: White
- Hover: Darker Red
- Border Radius: md
- Padding: 0.5rem 1rem (py-2 px-4)
- Font Weight: Medium

### Cards

- Background: White
- Border: 1px solid Secondary Gray Light
- Border Radius: lg
- Padding: 1.5rem (p-6)
- Shadow: md

### Inputs

- Background: White
- Border: 1px solid Secondary Gray
- Border Radius: md
- Padding: 0.5rem 0.75rem (py-2 px-3)
- Focus: Border Primary Blue, Ring 2px Primary Blue Light

### Alerts

#### Success Alert
- Background: Light Green
- Border: Success Green
- Icon: Check Circle
- Text: Dark Green

#### Warning Alert
- Background: Light Yellow
- Border: Warning Yellow
- Icon: Exclamation Triangle
- Text: Dark Yellow

#### Error Alert
- Background: Light Red
- Border: Error Red
- Icon: X Circle
- Text: Dark Red

#### Info Alert
- Background: Light Blue
- Border: Info Blue
- Icon: Information Circle
- Text: Dark Blue

## 7. Layout

### Container Widths

- Small: 640px
- Medium: 768px
- Large: 1024px
- Extra Large: 1280px
- 2X Large: 1536px

### Grid System

- Based on CSS Grid and Flexbox
- 12-column layout
- Responsive breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 8. Icons

- Use Lucide React icons for consistency
- Icon sizes:
  - sm: 16px
  - md: 20px
  - lg: 24px
  - xl: 32px

## 9. Animations and Transitions

- Default transition duration: 150ms
- Easing function: cubic-bezier(0.4, 0, 0.2, 1)
- Hover transitions: opacity, background-color, border-color
- Page transitions: fade in/out

## 10. Implementation

This design system is implemented using:

- Tailwind CSS for styling
- shadcn/ui for component library
- CSS variables for theme customization
- Dark mode support via next-themes

## 11. Accessibility

- Maintain minimum contrast ratio of 4.5:1 for text
- Support keyboard navigation
- Include focus states for all interactive elements
- Use semantic HTML elements
- Include ARIA attributes where necessary

---

This design guide should be followed for all UI development to ensure a consistent and professional look and feel across the Rencana application.