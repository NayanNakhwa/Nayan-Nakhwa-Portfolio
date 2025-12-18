# Developer Log

## [Init] Project Initialization & Planning
**Date:** Day 1
**Status:** Planning

**Accomplished:**
1.  Analyzed Nayan Nakhwa's resume (QA Engineer, IoT background).
2.  Established "Engineering Precision" as the design language.
3.  Defined the Tech Stack: React, Vite, Tailwind, Framer Motion.
4.  Created architectural documentation.

## [MVP] Core Build & Features
**Date:** Current
**Status:** Implemented

**Accomplished:**
1.  **Structure:** Built the full single-page application structure with `App.tsx` and layout components.
2.  **Navigation:** Implemented a fixed, glassmorphism Navbar with programmatic smooth scrolling (offset handling).
3.  **Data:** Migrated all resume content into a structured `resume.ts` file.
4.  **Skills Graph:** 
    *   Designed a custom **Force-Directed Graph** using HTML5 Canvas.
    *   Implemented node dragging, hover effects, and spring physics.
    *   Fixed label visibility issues by adding contrast backdrops to text.
5.  **Sections:** Completed Hero, About (Bento), Experience, Projects, Certifications (with Modal), and Contact.
6.  **Styles:** Applied the "Dark/Slate" theme with Sky Blue and Emerald accents.

## [Phase 3] The "Awwwards" Polish
**Date:** Day 5-6
**Status:** Implemented

**Accomplished:**
1.  **Scroll Animations:** Created reusable `FadeIn` component using `framer-motion` to cascade content as it enters the viewport. Applied to all major sections.
2.  **Spotlight Effect:** Developed `SpotlightCard` component to track mouse movement and create a dynamic radial gradient glow on card borders. Applied to About, Projects, and Certifications.
3.  **Visual Refinements:**
    *   Enhanced Progress Bar visibility with gradient and glow effect.
    *   Ensured consistent staggering of animations across the application.
    *   Refined hover states for interactive elements.

**Next Steps:**
- Finalize mobile responsiveness tweaks.
- Conduct performance audit (Lighthouse).
- Prepare for deployment.