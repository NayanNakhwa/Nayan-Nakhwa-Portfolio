# Project Roadmap: Nayan Nakhwa Portfolio (MVP)

This roadmap outlines the transformation of your resume into a high-impact, "Awwwards-style" portfolio. The goal is to balance technical showcasing (React/TS) with visual storytelling.

## Phase 1: Foundation & Structure [COMPLETED]
*Goal: robust architecture and type safety.*

1.  **Project Initialization:** [DONE]
    *   Setup React 18 + TypeScript + Vite.
    *   Configure Tailwind CSS for utility-first styling.
    *   **Crucial:** Setup `framer-motion` for animations (essential for the "Awwwards" feel).
2.  **Data Modeling:** [DONE]
    *   Create a `constants.ts` file to hold your resume data (Experience, Skills, Certs) as structured JSON objects. This separates content from logic.
3.  **Routing & Layout:** [DONE]
    *   Implement a Single Page Application (SPA) structure with smooth scroll navigation (using `react-scroll` or custom hooks).
    *   Create the `App.tsx` shell with a persistent Navigation Bar and Footer.

## Phase 2: Component Development [COMPLETED]
*Goal: Translate PDF content into visual sections.*

1.  **Hero Section:** [DONE]
    *   **Content:** Name, Title ("Electronics & Telecommunication Engineer"), and a strong hook line about QA/Software Quality.
    *   **Visual:** Large typography, status pill.
2.  **About & Stats:** [DONE]
    *   **Content:** The "Summary" from your resume.
    *   **Visual:** A "Bento Grid" layout showing years of experience (3+), bugs tracked (450+), and core domain expertise.
3.  **Experience Timeline:** [DONE]
    *   **Content:** Globalstep experience.
    *   **Visual:** An interactive vertical timeline. When the user scrolls, the line fills up.
4.  **Skills Ecosystem:** [DONE]
    *   **Content:** Languages, Tools, Domains.
    *   **Visual:** **Force-Directed Graph (Obsidian Style)**. Replaced the tag cloud idea with a custom Canvas implementation where nodes react to physics.
5.  **Projects Showcase:** [DONE]
    *   **Content:** Wireless Network System for Anti-Poaching.
    *   **Visual:** Card layout with hover effects and lucide-react iconography.
6.  **The "Wall of Certifications":** [DONE]
    *   **Challenge:** You have *many* certifications.
    *   **Solution:** A preview grid for top certifications + a detailed Modal for the full list.

## Phase 3: The "Awwwards" Polish [COMPLETED]
*Goal: Add the "Wow" factor.*

1.  **Micro-Interactions:** [DONE]
    *   **Graph Physics:** Draggable nodes in the Skills section.
    *   **Spotlight Cards:** Mouse-tracking gradient borders on project and about cards.
    *   **Smooth Scroll:** Custom navigation logic with offset calculation.
2.  **Scroll Animations:** [DONE]
    *   Used `framer-motion` `whileInView` props to make text fade in and slide up as the user scrolls down.
3.  **Responsive Design:** [DONE]
    *   Ensure the "Bento Grid" collapses gracefully into a stack on mobile.

## Phase 4: Deployment & Review (Day 7)
1.  **Performance Audit:** Ensure Lighthouse score is 95+ (vital for a QA engineer's portfolio).
2.  **SEO:** Add meta tags for "QA Engineer", "React Developer", "Automation".
3.  **Deploy:** Vercel or Netlify.