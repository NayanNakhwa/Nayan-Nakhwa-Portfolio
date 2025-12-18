# Technical Architecture

## 1. Tech Stack Selection
To achieve a modern, performant, and type-safe application:

*   **Core:** React 18 (Client-side rendering for snappy transitions).
*   **Language:** TypeScript (Strict mode). *Why? It proves your coding discipline to recruiters.*
*   **Styling:** Tailwind CSS. *Why? Rapid development and easy implementation of complex layouts.*
*   **Animation Engine:** Framer Motion. *Why? Industry standard for complex React animations.*
*   **Graphics:** HTML5 Canvas API. *Why? High-performance rendering for the Skills Graph.*
*   **Icons:** Lucide-React (Clean, technical aesthetic).
*   **Fonts:** `Inter` (UI) + `JetBrains Mono` (Code/Technical accents).

## 2. Directory Structure
We will treat the current directory as project root.

```text
/
├── components/
│   ├── ui/                 # Reusable atoms (SkillGraph, FadeIn, SpotlightCard)
│   ├── layout/             # Navbar, Footer
│   └── sections/           # Major homepage sections
│       ├── Hero.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Certifications.tsx
│       └── Contact.tsx
├── data/
│   └── resume.ts           # All text content from your PDF extracted here
├── types.ts                # TypeScript interfaces for Resume data
├── App.tsx                 # Main entry, composition of sections
└── index.css               # Tailwind directives & custom font imports
```

## 3. Key Component Designs

### A. The "Bento" Layout (About)
We use CSS Grid via Tailwind to create a modular layout.
*   **Large Box:** Summary/About.
*   **Medium Box:** Core Tech Stack.
*   **Small Box:** Stats (3+ Years).

### B. Skills Ecosystem (Force-Directed Graph)
Instead of a static list, we implemented a physics-simulation engine:
*   **Canvas API:** Renders nodes (Skills) and edges (Categories).
*   **Physics:** Nodes have repulsion forces (don't overlap) and spring forces (stay connected to parent).
*   **Interactivity:** Users can drag nodes to rearrange the graph, "Obsidian-style".

### C. Experience Timeline
*   **Header:** Role + Date (Always visible).
*   **Body:** Vertical line visualization with distinct markers for each role.

### D. Certification Modal
*   **Preview:** Displays the top 5 certifications in a grid.
*   **Modal:** A "View All" action triggers a `framer-motion` overlay to show the complete list without cluttering the main page.

### E. Spotlight Card (Micro-Interaction)
*   **Concept:** A reusable wrapper that adds a high-end feel.
*   **Tech:** Uses mouse coordinate tracking to update a radial gradient position, creating a "flashlight" effect on the card borders and background.

### F. Scroll Animations
*   **Implementation:** A `FadeIn` wrapper component using Framer Motion's `whileInView` hook.
*   **Behavior:** Elements slide up and fade in as they enter the viewport, with staggered delays for lists/grids.

## 4. State Management
*   **Local State:** `useState` for UI toggles (Cert Modal).
*   **Refs:** `useRef` heavily used for Canvas manipulation and animation loops in the Skill Graph.