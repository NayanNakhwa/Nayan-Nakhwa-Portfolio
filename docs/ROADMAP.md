# Project Roadmap: Nayan Nakhwa Portfolio (MVP)

This roadmap outlines the transformation of your resume into a high-impact, "Awwwards-style" portfolio. The goal is to balance technical showcasing (React/TS) with visual storytelling.

## Phase 1: Foundation & Structure (Days 1-2)
*Goal: robust architecture and type safety.*

1.  **Project Initialization:**
    *   Setup React 18 + TypeScript + Vite.
    *   Configure Tailwind CSS for utility-first styling.
    *   **Crucial:** Setup `framer-motion` for animations (essential for the "Awwwards" feel).
2.  **Data Modeling:**
    *   Create a `constants.ts` file to hold your resume data (Experience, Skills, Certs) as structured JSON objects. This separates content from logic.
3.  **Routing & Layout:**
    *   Implement a Single Page Application (SPA) structure with smooth scroll navigation (using `react-scroll` or custom hooks).
    *   Create the `App.tsx` shell with a persistent Navigation Bar and Footer.

## Phase 2: Component Development (Days 3-4)
*Goal: Translate PDF content into visual sections.*

1.  **Hero Section:**
    *   **Content:** Name, Title ("Electronics & Telecommunication Engineer"), and a strong hook line about QA/Software Quality.
    *   **Visual:** Large typography, perhaps a subtle 3D or particle background element representing "Networks/IoT".
2.  **About & Stats:**
    *   **Content:** The "Summary" from your resume.
    *   **Visual:** A "Bento Grid" layout showing years of experience (3+), bugs tracked (450+), and core domain expertise.
3.  **Experience Timeline:**
    *   **Content:** Globalstep experience.
    *   **Visual:** An interactive vertical timeline. When the user scrolls, the line fills up. Hovering over "Software Tester" expands the details about WooCommerce/API testing.
4.  **Skills Ecosystem:**
    *   **Content:** Languages, Tools, Domains.
    *   **Visual:** Instead of a boring list, use a floating tag cloud or a physics-based interactive grid where elements react to the mouse.
5.  **Projects Showcase:**
    *   **Content:** Wireless Network System for Anti-Poaching.
    *   **Visual:** A dedicated card with a schematic-style illustration (SVG) of the IoT system.
6.  **The "Wall of Certifications":**
    *   **Challenge:** You have *many* certifications.
    *   **Solution:** An infinite horizontal scroll marquee (auto-scrolling) for logos (Google, AWS, Huawei), with a "View All" modal for the detailed list.

## Phase 3: The "Awwwards" Polish (Days 5-6)
*Goal: Add the "Wow" factor.*

1.  **Micro-Interactions:**
    *   Custom cursor (a small circle that expands when hovering over clickable elements).
    *   Magnetic buttons (buttons that slightly stick to your mouse cursor).
2.  **Scroll Animations:**
    *   Use `framer-motion` `whileInView` props to make text fade in and slide up as the user scrolls down.
3.  **Responsive Design:**
    *   Ensure the "Bento Grid" collapses gracefully into a stack on mobile.

## Phase 4: Deployment & Review (Day 7)
1.  **Performance Audit:** Ensure Lighthouse score is 95+ (vital for a QA engineer's portfolio).
2.  **SEO:** Add meta tags for "QA Engineer", "React Developer", "Automation".
3.  **Deploy:** Vercel or Netlify.
