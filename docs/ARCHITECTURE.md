# Technical Architecture

## 1. Tech Stack Selection
To achieve a modern, performant, and type-safe application:

*   **Core:** React 18 (Client-side rendering for snappy transitions).
*   **Language:** TypeScript (Strict mode). *Why? It proves your coding discipline to recruiters.*
*   **Styling:** Tailwind CSS. *Why? Rapid development and easy implementation of complex layouts.*
*   **Animation Engine:** Framer Motion. *Why? Industry standard for complex React animations.*
*   **Icons:** Lucide-React (Clean, technical aesthetic).
*   **Fonts:** `Inter` (UI) + `JetBrains Mono` (Code/Technical accents).

## 2. Directory Structure
We will treat the root as `src/` conceptually.

```text
/
├── components/
│   ├── ui/                 # Reusable atoms (Buttons, Cards, Inputs)
│   ├── layout/             # Navbar, Footer, Container
│   └── sections/           # Major homepage sections
│       ├── Hero.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Certifications.tsx
│       └── Contact.tsx
├── hooks/
│   ├── useScrollProgress.ts  # For scroll bar animations
│   └── useMousePosition.ts   # For custom cursor logic
├── data/
│   └── resumeData.ts       # All text content from your PDF extracted here
├── types.ts                # TypeScript interfaces for Resume data
├── App.tsx                 # Main entry, composition of sections
└── index.css               # Tailwind directives & custom font imports
```

## 3. Key Component Designs

### A. The "Bento" Layout (Skills & About)
We will use CSS Grid via Tailwind to create a modular layout.
*   **Large Box:** Summary/About.
*   **Medium Box:** Core Tech Stack (Python, JS).
*   **Small Box:** Stats (3+ Years).
*   **Wide Box:** Domains (E-commerce, IoT).

### B. Experience Accordion
Instead of a wall of text for your Globalstep role:
*   **Header:** Role + Date (Always visible).
*   **Body:** The specific achievements (450+ bugs, WooCommerce) hidden inside an accordion that animates open on click or hover. This keeps the UI clean.

### C. Certification Marquee
*   Since you have ~15 certifications, listing them vertically takes too much space.
*   We will build a `Marquee` component that loops the certification providers (Google, AWS, Coursera logos) continuously.

## 4. State Management
*   **Local State:** `useState` for simple UI toggles (menu open/close, accordion).
*   **Context:** Not needed for MVP.
*   **Ref:** `useRef` heavily used for animation triggers.
