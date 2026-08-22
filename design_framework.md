# Premium UI/UX Design Framework

This document outlines the core design principles, architecture, and styling framework used to build this platform. It serves as a blueprint for adding new features or components while maintaining a deeply immersive, premium, and cohesive user experience.

> [!NOTE]
> This framework is **color-agnostic**. The principles rely on CSS variables and opacity layering rather than specific hex codes, allowing the platform to dynamically switch between Light and Dark modes seamlessly.

---

## 1. Core Philosophy: Depth, Motion, and Elegance
The UI is not built as a flat collection of boxes, but as a **dynamic, multi-layered environment**. Every component should feel like it occupies physical space, responds to interaction, and sits harmoniously within an ambient world.

- **Avoid Hard Opaque Backgrounds:** Never use completely solid background colors for cards or sections.
- **Fluidity:** Nothing should appear or change instantaneously. Use transitions for all state changes.
- **Elegance:** Rely on typography, generous whitespace, and subtle glows rather than heavy borders or shouting colors.

---

## 2. The Layered Background Architecture
The environment is constructed in three distinct layers to create depth.

### Layer 0: The Global Ambient Canvas (`<AmbientBackground />`)
- **Purpose:** A fixed (`z-index: -1`) background layer running infinitely behind the entire application.
- **Behavior:** Contains slowly falling particles, swaying elements, and subtle noise textures. 
- **Rule:** This layer must never be completely obscured by the layers above it.

### Layer 1: The Section Themes (`.section-theme-*`)
- **Purpose:** Wrappers for individual sections (e.g., Hero, Features, Solutions) that define the local mood.
- **Implementation:** Uses linear/radial gradients mapped to specific theme classes.
- **Critical Rule:** Section backgrounds MUST be slightly translucent (e.g., `85%` opacity or using `rgba()`). This allows the Layer 0 ambient animations to bleed through, creating a consistent environmental feel across the entire platform.

### Layer 2: The Content (Cards, Text, Images)
- **Purpose:** The foreground elements that the user actually interacts with.
- **Implementation:** Sat on top of Layer 1, utilizing glassmorphism to blend with the layers beneath it.

---

## 3. Glassmorphism & Component Architecture
Components (especially cards, dialogs, and floating menus) use a frosted-glass aesthetic.

### The `card-theme` / `bento-card-theme` Classes
When building a new container, always use the global card classes rather than writing custom utility strings. 

**What the theme classes handle automatically:**
- **Translucency:** Sets a semi-transparent `--card-bg` that adapts to light/dark mode.
- **Blur:** Injects heavy `backdrop-filter: blur(12px)` to frost the background layers.
- **Borders & Shadows:** Applies a subtle, 1px translucent border (`--card-border`) and an ambient shadow (`--card-shadow`).

> [!TIP]
> **Building a new card?** 
> Just add `className="card-theme rounded-2xl p-6"`. Do not hardcode `bg-white/50` or `backdrop-blur`. Trust the global class.

---

## 4. Typography System
The typography relies on contrast between a highly expressive display font and a highly legible body font.

- **Headings (Display Font):** Used for large impact. Often styled with `font-bold`, tracking adjustments, and occasionally `italic` for a sophisticated editorial look.
- **Body Text (Sans-Serif):** Clean, modern, and highly legible for long-form reading and UI elements.
- **Color Variables:** 
  - ALWAYS use `.text-theme-heading` for titles and bold elements.
  - ALWAYS use `.text-theme-body` for paragraphs and descriptions.
  - *Never hardcode `text-gray-800` or `text-white` on generic text.*

---

## 5. Animation and Motion Principles
Static interfaces feel dead. This framework relies heavily on continuous ambient motion and responsive interactions.

### Ambient Animations (Always Running)
- **`.animate-float`**: Use for decorative icons or floating UI elements. Creates a slow, breathing vertical oscillation.
- **`.animate-pulse-soft`**: Use on large, blurred background orbs (glows) to make the lighting feel alive.
- **`.animate-marquee`**: Used for infinite scrolling columns or rows (e.g., product displays, testimonials).

### Entrance Animations
- Elements should never just "appear".
- Wrap new components in the `<Reveal>` wrapper component (or use `.animate-fade-in-up`) so they elegantly slide and fade into view as the user scrolls.

### Hover States (Micro-interactions)
- **Translation:** Cards should lift up slightly on hover (`hover:-translate-y-1` or `-2`).
- **Shadow Expansion:** Use `hover:shadow-card-hover` to increase the glow/shadow when a card lifts.
- **Internal Elements:** When hovering a card, inner elements (like icons) should react (e.g., `group-hover:scale-110 group-hover:-rotate-3`).

---

## 6. Theming & Variable Strategy
To ensure Dark Mode and Light Mode work flawlessly without rewriting components:

1. **CSS Variables are King:** All structural colors are defined in `:root` and `[data-theme="dark"]` inside `globals.css`.
2. **Semantic Naming:** We use semantic roles (`--bg-base`, `--surface-border`, `--text-muted`) instead of literal colors (`--light-blue`).
3. **Accent Colors:** For brand-specific pops of color, use abstract Tailwind utility classes (e.g., `text-brand`, `bg-gold`, `text-coral`) which have their own light/dark variants, rather than hardcoded hex codes in the markup.

> [!IMPORTANT]
> **Checklist for New Components:**
> 1. Did I use `text-theme-heading` or `text-theme-body` instead of hardcoded text colors?
> 2. Is my card using `card-theme` instead of a solid background?
> 3. Does it animate in elegantly?
> 4. Do the interactive elements have smooth hover transitions (`transition-all duration-300`)?
