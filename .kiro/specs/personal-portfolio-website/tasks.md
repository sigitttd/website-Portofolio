# Implementation Plan: Personal Portfolio Website

## Overview

Implementasi website portofolio single-page untuk Rahmat Sigit Hidayat menggunakan Next.js 14+ (App Router, TypeScript), Tailwind CSS, dan Framer Motion. Pendekatan incremental: setup proyek → data layer → komponen statis → animasi → testing.

## Tasks

- [x] 1. Setup proyek dan struktur dasar
  - Inisialisasi Next.js 14+ dengan App Router dan TypeScript
  - Install dependencies: `framer-motion`, `tailwindcss`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`, `jsdom`
  - Konfigurasi `vitest.config.ts` dengan environment jsdom dan setup file untuk `@testing-library/jest-dom`
  - Buat struktur direktori: `app/`, `components/`, `lib/`, `hooks/`
  - Konfigurasi `tailwind.config.ts` dan `globals.css` dengan Tailwind base styles
  - Tambahkan `scroll-behavior: smooth` pada `html` element di `globals.css`
  - _Requirements: 6.1, 6.2, 4.3_

- [x] 2. Buat data layer di `lib/data.ts`
  - [x] 2.1 Definisikan TypeScript interfaces `Experience` dan `Skill`
    - Interface `Experience`: `id`, `title`, `organization`, `dateRange`, `description`, `type: "work" | "education"`, `order`
    - Interface `Skill`: `name`, `category: "existing" | "new"`, `order`
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3_

  - [x] 2.2 Isi konstanta `experiences` dan `skills` dengan data statis
    - 5 entri experience sesuai requirements (reverse-chronological via `order`)
    - 9 existing skills (order 1–9) dan 5 new tech stack (order 10–14)
    - _Requirements: 2.1, 3.2, 3.3_

  - [x] 2.3 Tulis property test untuk Property 9: Existing skills order < new tech stack order
    - **Property 9: Existing Skills Animate Before New Tech Stack**
    - **Validates: Requirements 3.5**
    - Verifikasi `max(existing.order) < min(new.order)` untuk semua skill di `skills` array

  - [x] 2.4 Definisikan Framer Motion animation variants di `lib/data.ts`
    - `textRevealVariants`, `cardVariants`, `staggerContainer`, `badgeVariants`
    - _Requirements: 1.3, 2.3, 3.4_

  - [x] 2.5 Tulis property test untuk Property 5: Experience card animation variants
    - **Property 5: Experience Card Animation Variants**
    - **Validates: Requirements 2.3**
    - Verifikasi `cardVariants.hidden = { opacity: 0, scale: 0.95 }` dan `cardVariants.visible = { opacity: 1, scale: 1 }`

  - [x] 2.6 Tulis property test untuk Property 8: Stagger delay within 80–120ms
    - **Property 8: Stagger Delay Within Bounds**
    - **Validates: Requirements 3.4**
    - Verifikasi `staggerContainer.visible.transition.staggerChildren >= 0.08 && <= 0.12`

- [x] 3. Buat `hooks/useScrollPosition.ts`
  - Implementasi hook yang mengembalikan `scrollY: number`
  - Return `0` sebagai default pada SSR (tidak ada `window`)
  - _Requirements: 4.4_

- [x] 4. Buat komponen `Navbar`
  - [x] 4.1 Implementasi `components/Navbar.tsx`
    - Gunakan `useScrollPosition` hook untuk deteksi scroll
    - Terapkan `backdrop-blur` atau `bg-*` class saat `scrollY > 0`
    - Render link navigasi ke `#hero`, `#experience`, `#skill-bridge`
    - Gunakan `<nav>` dan `<header>` semantic HTML
    - Tandai `"use client"`
    - _Requirements: 4.2, 4.3, 4.4, 5.4_

  - [x] 4.2 Tulis property test untuk Property 10: Navbar background applied on scroll
    - **Property 10: Navbar Background Applied on Scroll**
    - **Validates: Requirements 4.4**
    - Untuk setiap `scrollY > 0`, verifikasi elemen `<nav>` memiliki class background/blur yang tidak ada saat `scrollY === 0`

- [x] 5. Buat komponen `HeroSection`
  - [x] 5.1 Implementasi `components/HeroSection.tsx`
    - Render `<section id="hero">` dengan headline dan sub-headline dari `lib/data.ts`
    - Implementasi text reveal animation word-by-word menggunakan `textRevealVariants`
    - Gunakan `useReducedMotion()` dari Framer Motion; jika `true`, render tanpa motion
    - Render CTA button dengan `href="#experience"` untuk smooth scroll
    - Tandai `"use client"`
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 5.4_

  - [x] 5.2 Tulis property test untuk Property 1: Animation completion time bound
    - **Property 1: Animation Completion Time Bound**
    - **Validates: Requirements 1.4**
    - Untuk sembarang array kata (panjang 1–50), verifikasi `(lastIndex * 0.1 + 0.5) * 1000 <= 2000`

  - [x] 5.3 Tulis property test untuk Property 2: Reduced motion disables animations (HeroSection)
    - **Property 2: Reduced Motion Disables Animations**
    - **Validates: Requirements 1.6**
    - Mock `useReducedMotion()` = `true`, verifikasi komponen render konten tanpa motion variants aktif

  - [x] 5.4 Tulis unit tests untuk HeroSection
    - Verifikasi `<h1>` heading ter-render
    - Verifikasi sub-headline dengan info Telkom University dan GPA 3.96
    - Verifikasi CTA button dengan `href="#experience"`
    - _Requirements: 1.1, 1.2, 1.5_

- [x] 6. Buat komponen `ExperienceCard` dan `ExperienceSection`
  - [x] 6.1 Implementasi `components/ExperienceCard.tsx`
    - Terima props: `title`, `organization`, `dateRange`, `description`, `type`
    - Gunakan `<article>` semantic HTML
    - Implementasi `whileInView` animation dengan `cardVariants` dan `viewport={{ once: true }}`
    - Implementasi `whileHover` dengan transition duration ≤ 150ms (border highlight atau shadow)
    - Tandai `"use client"`
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 5.4_

  - [x] 6.2 Tulis property test untuk Property 4: Experience card displays all required fields
    - **Property 4: Experience Card Displays All Required Fields**
    - **Validates: Requirements 2.2**
    - Untuk sembarang `Experience` object, verifikasi `title`, `organization`, `dateRange`, `description` semua ter-render

  - [x] 6.3 Tulis property test untuk Property 6: Experience card hover transition ≤ 150ms
    - **Property 6: Experience Card Hover Transition Duration**
    - **Validates: Requirements 2.4**
    - Verifikasi `whileHover` transition duration * 1000 ≤ 150

  - [x] 6.4 Tulis property test untuk Property 7: Experience card animation plays once
    - **Property 7: Experience Card Animation Plays Once**
    - **Validates: Requirements 2.5**
    - Verifikasi semua `ExperienceCard` menggunakan `viewport={{ once: true }}`

  - [x] 6.5 Implementasi `components/ExperienceSection.tsx`
    - Render `<section id="experience">` dengan grid layout
    - Map `experiences` dari `lib/data.ts` ke `ExperienceCard` components
    - Single-column di mobile (`grid-cols-1`), dua kolom di tablet+ (`md:grid-cols-2`)
    - _Requirements: 2.1, 5.1, 5.2_

  - [x] 6.6 Tulis property test untuk Property 3: Experience cards count and order
    - **Property 3: Experience Cards Count and Order**
    - **Validates: Requirements 2.1**
    - Untuk sembarang array `Experience`, verifikasi jumlah card = `experiences.length` dan urutan sesuai field `order`

  - [x] 6.7 Tulis unit tests untuk ExperienceSection
    - Verifikasi render 5 `<article>` elements
    - Verifikasi grid class responsive (`grid-cols-1`, `md:grid-cols-2`)
    - _Requirements: 2.1, 5.2_

- [x] 7. Checkpoint — Pastikan semua tests pass
  - Pastikan semua tests pass, tanyakan kepada user jika ada pertanyaan.

- [x] 8. Buat komponen `SkillBadge` dan `SkillBridgeSection`
  - [x] 8.1 Implementasi `components/SkillBadge.tsx`
    - Terima props: `name`, `category: "existing" | "new"`
    - Render badge dengan styling berbeda per kategori
    - Gunakan `badgeVariants` untuk animasi masuk
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 8.2 Implementasi `components/SkillBridgeSection.tsx`
    - Render `<section id="skill-bridge">` dengan dua kolom/grup
    - Gunakan `staggerContainer` variant pada wrapper, `badgeVariants` pada setiap badge
    - Existing skills group dirender sebelum new tech stack group
    - Gunakan `useReducedMotion()` — jika `true`, render tanpa stagger/motion
    - Stacked vertical di mobile, side-by-side di tablet+ (`md:flex-row`)
    - Tandai `"use client"`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1, 5.3_

  - [x] 8.3 Tulis property test untuk Property 2: Reduced motion disables animations (SkillBridgeSection)
    - **Property 2: Reduced Motion Disables Animations**
    - **Validates: Requirements 3.6**
    - Mock `useReducedMotion()` = `true`, verifikasi badges render tanpa stagger motion variants

  - [x] 8.4 Tulis unit tests untuk SkillBridgeSection
    - Verifikasi label "Existing Skills" dan "New Tech Stack" ter-render
    - Verifikasi semua 9 existing skills dan 5 new tech stack badges ter-render
    - Verifikasi layout class responsive
    - _Requirements: 3.1, 3.2, 3.3, 5.3_

- [x] 9. Buat `app/layout.tsx` dan `app/page.tsx`
  - [x] 9.1 Implementasi `app/layout.tsx`
    - Root layout dengan metadata (title, description)
    - Import font dan `globals.css`
    - Gunakan `<html>` dan `<body>` dengan semantic structure
    - _Requirements: 5.4, 6.1_

  - [x] 9.2 Implementasi `app/page.tsx`
    - Server Component (tidak ada `"use client"`)
    - Render `<main>` yang berisi `Navbar`, `HeroSection`, `ExperienceSection`, `SkillBridgeSection`
    - Static generation default (tidak ada `getServerSideProps`)
    - _Requirements: 4.1, 5.4, 6.1, 6.5_

  - [x] 9.3 Tulis property test untuk Property 11: All images have non-empty alt text
    - **Property 11: All Images Have Non-Empty Alt Text**
    - **Validates: Requirements 5.5**
    - Render full page, query semua `<img>` elements, verifikasi `alt !== ""`

  - [x] 9.4 Tulis unit tests untuk page structure
    - Verifikasi `<main>` element ter-render
    - Verifikasi ketiga section (`#hero`, `#experience`, `#skill-bridge`) ada di DOM
    - Verifikasi tidak ada `getServerSideProps` (static generation)
    - _Requirements: 4.1, 6.5_

- [x] 10. Final checkpoint — Pastikan semua tests pass
  - Pastikan semua tests pass, tanyakan kepada user jika ada pertanyaan.

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk traceability
- Property tests menggunakan fast-check dengan minimum 100 iterasi per property
- Unit tests menggunakan Vitest + React Testing Library
- Semua komponen interaktif/animasi ditandai `"use client"`, `page.tsx` dan `layout.tsx` tetap Server Component
