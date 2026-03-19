# Requirements Document

## Introduction

Website portofolio pribadi untuk Rahmat Sigit Hidayat, seorang Data Analyst/Scientist yang sedang bertransisi menjadi Web Developer. Website dibangun menggunakan Next.js (App Router, TypeScript), Tailwind CSS, dan Framer Motion. Tujuan utama adalah menampilkan profil profesional secara modern dan tech-forward, menonjolkan jembatan antara keahlian data yang sudah ada dengan tech stack web development yang sedang dipelajari, serta menarik perhatian rekruter atau klien potensial.

Website terdiri dari tiga section utama: Hero Section, Experience Section, dan Skill Bridge Section, semuanya dalam satu halaman (single-page).

## Glossary

- **Portfolio_Website**: Aplikasi web single-page yang menampilkan profil, pengalaman, dan keahlian pemilik.
- **Hero_Section**: Bagian pertama halaman yang menampilkan headline, sub-headline, dan animasi text reveal.
- **Experience_Section**: Bagian yang menampilkan kartu-kartu riwayat pengalaman kerja dan pendidikan.
- **Skill_Bridge_Section**: Bagian yang memisahkan secara visual antara keahlian lama (data) dan tech stack baru (web).
- **Experience_Card**: Komponen kartu individual yang menampilkan satu entri pengalaman kerja atau pendidikan.
- **Text_Reveal_Animation**: Animasi Framer Motion di mana teks muncul secara bertahap per kata atau per baris.
- **Scroll_Animation**: Animasi yang dipicu ketika elemen memasuki viewport saat pengguna melakukan scroll.
- **Staggered_Animation**: Animasi di mana beberapa elemen muncul secara berurutan dengan jeda waktu antar elemen.
- **Skill_Badge**: Komponen visual yang menampilkan satu nama keahlian atau teknologi.
- **Viewport**: Area layar yang terlihat oleh pengguna pada satu waktu.

---

## Requirements

### Requirement 1: Hero Section dengan Text Reveal Animation

**User Story:** As a visitor, I want to see an animated headline when I first land on the page, so that I immediately understand who Rahmat is and what his career transition is about.

#### Acceptance Criteria

1. THE `Hero_Section` SHALL display a primary headline that communicates Rahmat's career transition from Data Analyst to Web Developer.
2. THE `Hero_Section` SHALL display a sub-headline with a brief description of his background (Data Science graduate, Telkom University, GPA 3.96).
3. WHEN the `Hero_Section` mounts in the browser, THE `Text_Reveal_Animation` SHALL animate the headline text into view word-by-word or line-by-line using Framer Motion.
4. THE `Text_Reveal_Animation` SHALL complete within 2000ms from the time the page first loads.
5. THE `Hero_Section` SHALL display a call-to-action button that scrolls the user to the `Experience_Section` when clicked.
6. IF the user's device has the `prefers-reduced-motion` media query set to `reduce`, THEN THE `Portfolio_Website` SHALL display the `Hero_Section` content without motion animations.

---

### Requirement 2: Experience Section dengan Scroll Animation

**User Story:** As a recruiter, I want to browse Rahmat's work history in a structured card layout, so that I can quickly assess his professional background.

#### Acceptance Criteria

1. THE `Experience_Section` SHALL display an `Experience_Card` for each of the following entries, in reverse-chronological order:
   - Junior Business Intelligence, Marketing Agency (Nov 2025 – Mar 2026)
   - Freelance Data Analyst
   - Internship, Kuanta Indonesia
   - Teaching Assistant, Telkom University
   - Bachelor of Data Science, Telkom University (2021–2025, GPA 3.96, Summa Cum Laude)
2. THE `Experience_Card` SHALL display the job title, organization name, date range, and a brief description for each entry.
3. WHEN an `Experience_Card` enters the `Viewport` during scroll, THE `Scroll_Animation` SHALL animate the card scaling from 95% to 100% size and fading in from 0 to full opacity using Framer Motion.
4. WHEN a user hovers over an `Experience_Card`, THE `Experience_Card` SHALL apply a hover effect (e.g., subtle border highlight or shadow elevation) within 150ms.
5. IF an `Experience_Card` has already been animated into view, THEN THE `Scroll_Animation` SHALL NOT replay the animation when the user scrolls back up.

---

### Requirement 3: Skill Bridge Section dengan Staggered Animation

**User Story:** As a visitor, I want to see a clear visual separation between Rahmat's existing data skills and his new web development stack, so that I understand his unique value as a developer with a data background.

#### Acceptance Criteria

1. THE `Skill_Bridge_Section` SHALL display two distinct columns or groups: "Existing Skills" and "New Tech Stack".
2. THE `Skill_Bridge_Section` SHALL include the following items in the "Existing Skills" group: Python, Pandas, NumPy, SQL, Tableau, Looker Studio, Power Query, Machine Learning, Data Visualization.
3. THE `Skill_Bridge_Section` SHALL include the following items in the "New Tech Stack" group: Next.js, React, TypeScript, Tailwind CSS, Framer Motion.
4. WHEN the `Skill_Bridge_Section` enters the `Viewport` during scroll, THE `Staggered_Animation` SHALL animate each `Skill_Badge` into view sequentially with a delay of 80ms to 120ms between each badge.
5. THE `Staggered_Animation` SHALL animate "Existing Skills" badges first, followed by "New Tech Stack" badges.
6. IF the user's device has the `prefers-reduced-motion` media query set to `reduce`, THEN THE `Portfolio_Website` SHALL display all `Skill_Badge` items without stagger or motion animations.

---

### Requirement 4: Navigasi dan Struktur Halaman

**User Story:** As a visitor, I want to navigate the single-page portfolio smoothly, so that I can jump to any section without losing context.

#### Acceptance Criteria

1. THE `Portfolio_Website` SHALL render as a single-page application with all three sections (`Hero_Section`, `Experience_Section`, `Skill_Bridge_Section`) on one page.
2. THE `Portfolio_Website` SHALL include a navigation bar that displays links to each section by name.
3. WHEN a navigation link is clicked, THE `Portfolio_Website` SHALL scroll smoothly to the corresponding section.
4. WHILE the user scrolls past the top of the `Hero_Section`, THE `Portfolio_Website` SHALL display the navigation bar with a background color or blur effect to maintain readability.

---

### Requirement 5: Responsivitas dan Aksesibilitas

**User Story:** As a visitor on any device, I want the portfolio to display correctly on mobile, tablet, and desktop, so that I can view it regardless of my screen size.

#### Acceptance Criteria

1. THE `Portfolio_Website` SHALL render all sections correctly on viewport widths of 375px (mobile), 768px (tablet), and 1280px (desktop).
2. THE `Experience_Section` SHALL display `Experience_Card` items in a single-column layout on viewport widths below 768px, and in a two-column or grid layout on viewport widths of 768px and above.
3. THE `Skill_Bridge_Section` SHALL display the two skill groups stacked vertically on viewport widths below 768px, and side-by-side on viewport widths of 768px and above.
4. THE `Portfolio_Website` SHALL use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`) for all major structural components.
5. THE `Portfolio_Website` SHALL provide descriptive `alt` text for all images and icons.
6. THE `Portfolio_Website` SHALL ensure all interactive elements (buttons, links) have a visible focus indicator for keyboard navigation.

---

### Requirement 6: Performa dan Tech Stack

**User Story:** As a visitor, I want the portfolio to load quickly, so that I don't abandon the page before seeing the content.

#### Acceptance Criteria

1. THE `Portfolio_Website` SHALL be built using Next.js with the App Router and TypeScript.
2. THE `Portfolio_Website` SHALL use Tailwind CSS for all styling.
3. THE `Portfolio_Website` SHALL use Framer Motion for all animations defined in Requirements 1, 2, and 3.
4. THE `Portfolio_Website` SHALL achieve a Lighthouse Performance score of 90 or above on desktop.
5. WHEN the `Portfolio_Website` is built for production, THE `Portfolio_Website` SHALL use Next.js static generation (`generateStaticParams` or default static export) for the main page since all content is static.
