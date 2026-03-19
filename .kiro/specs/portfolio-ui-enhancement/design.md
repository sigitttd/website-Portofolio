# Dokumen Desain: Portfolio UI Enhancement

## Ikhtisar

Enhancement ini bersifat additive terhadap website portofolio yang sudah ada (Next.js 16 + React 19 + Tailwind CSS v4 + Framer Motion v12). Tujuan utamanya adalah memperkuat kesan pertama, menambah dua section konten baru (Projects dan Organizations), memperbaiki navigasi, dan menyatukan sistem animasi.

Stack yang digunakan:
- **Next.js 16** dengan App Router — `app/page.tsx` tetap sebagai Server Component
- **React 19** — Client Components menggunakan direktif `'use client'`
- **Tailwind CSS v4** — utility-first, konfigurasi via `@theme` di CSS
- **Framer Motion v12** — animasi, `useReducedMotion()` untuk aksesibilitas
- **fast-check v4** — property-based testing
- **Vitest v4 + @testing-library/react** — unit dan integration testing

Pendekatan desain: semua komponen interaktif (yang membutuhkan state, event handler, atau browser API) adalah Client Components dengan direktif `'use client'`. Komponen yang hanya merender data statis bisa tetap sebagai Server Components atau diimpor dari Server Components.

---

## Arsitektur

### Component Tree

```
app/page.tsx (Server Component)
├── Navbar (Client Component) ← dimodifikasi
│   └── [mobile menu state, useActiveSection, useScrollPosition]
├── HeroSection (Client Component) ← dimodifikasi
│   ├── ScrollIndicator (inline / sub-component)
│   └── SkillBadge (existing, reused)
├── ExperienceSection (Server Component) ← tidak berubah
│   └── ExperienceCard (Client Component) ← tidak berubah
├── SkillBridgeSection (Client Component) ← tidak berubah
│   └── SkillBadge (Client Component) ← tidak berubah
├── ProjectsSection (Client Component) ← BARU
│   └── ProjectCard (Client Component) ← BARU
├── OrganizationalSection (Client Component) ← BARU
│   └── OrgCard (Client Component) ← BARU
└── Footer (Client Component) ← BARU
```

### Alur Data

```
lib/data.ts (static data + animation variants)
    │
    ├── projects[]          → ProjectsSection → ProjectCard
    ├── orgExperiences[]    → OrganizationalSection → OrgCard
    ├── experiences[]       → ExperienceSection → ExperienceCard (existing)
    ├── skills[]            → SkillBridgeSection → SkillBadge (existing)
    └── animation variants  → semua komponen animasi
```

### Hook Baru

```
hooks/useActiveSection.ts
    ├── Input: sectionIds[] (string[])
    ├── Mekanisme: IntersectionObserver
    └── Output: activeSection (string | null)
```

---

## Komponen dan Antarmuka

### File yang Dimodifikasi

| File | Perubahan |
|------|-----------|
| `components/Navbar.tsx` | Tambah hamburger menu, active indicator, scroll threshold 50px |
| `components/HeroSection.tsx` | Nama lengkap, ScrollIndicator, dual CTA, skill badges |
| `lib/data.ts` | Interface + data baru, animation variants baru |
| `app/page.tsx` | Import komponen baru |

### File Baru

| File | Deskripsi |
|------|-----------|
| `hooks/useActiveSection.ts` | Hook IntersectionObserver untuk active nav |
| `components/ProjectsSection.tsx` | Section grid proyek |
| `components/ProjectCard.tsx` | Card individual proyek |
| `components/OrganizationalSection.tsx` | Section pengalaman organisasi |
| `components/OrgCard.tsx` | Card individual organisasi |
| `components/Footer.tsx` | Footer dengan social links |

### Interface Komponen

#### Navbar
```tsx
// Tidak ada props eksternal — mengonsumsi useScrollPosition dan useActiveSection secara internal
// State internal: isMenuOpen (boolean)
```

#### ProjectCard
```tsx
interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  date: string;
  link?: string;
}
```

#### OrgCard
```tsx
interface OrgCardProps {
  id: string;
  role: string;
  organization: string;
  dateRange: string;
  description: string;
}
```

#### Footer
```tsx
// Tidak ada props — data social links didefinisikan sebagai konstanta internal
```

### useActiveSection Hook

```tsx
// hooks/useActiveSection.ts
// Menggunakan IntersectionObserver dengan threshold 0.5
// Mengembalikan id section yang paling banyak terlihat di viewport
// Hanya satu section aktif pada satu waktu
function useActiveSection(sectionIds: string[]): string | null
```

Keputusan desain: menggunakan `IntersectionObserver` dengan `threshold: 0.5` dan `rootMargin: '-20% 0px -60% 0px'` agar section yang "paling dominan" di viewport yang dianggap aktif. Ini lebih akurat dibanding pendekatan berbasis `scrollY` manual.

---

## Data Models

### Interface Baru di `lib/data.ts`

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];   // minimal satu elemen
  date: string;
  link?: string;         // opsional
}

export interface OrgExperience {
  id: string;
  role: string;
  organization: string;
  dateRange: string;
  description: string;
}
```

### Data Statis: `projects[]` (7 item)

| id | title | date |
|----|-------|------|
| `sentiment-sna` | Sentiment & Social Network Analysis | 2024 |
| `citation-network` | Citation Network Analysis | 2024 |
| `dashboard-location` | Dashboard Location Segmentation | 2024 |
| `asset-monitoring` | Asset Monitoring Dashboard | 2023 |
| `kim-mayangsari` | Business Case Website KIM Mayangsari | 2023 |
| `data-warehouse` | Data Warehouse Design | 2023 |
| `umkm-east-java` | Strategies Analysis UMKM East Java | 2022 |

### Data Statis: `orgExperiences[]` (3 item)

| id | role | organization |
|----|------|--------------|
| `dssu-chairman` | Chairman | Data Science Student Union |
| `mdt-digital` | Digital Team & Study Program Branding | MDT |
| `pkkmb-dewangkara` | Publicity Documentation & Design | PKKMB Dewangkara Maetala 2022 |

### Animation Variants Baru di `lib/data.ts`

```typescript
// Fade + slide-up untuk ProjectCard dan OrgCard (scroll-triggered)
export const projectCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Identik dengan projectCardVariants — dipisah untuk keterbacaan dan traceability
export const orgCardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Fade sederhana untuk elemen yang tidak perlu slide (ScrollIndicator, Footer items)
export const scrollFadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// Stagger container untuk ProjectsSection (delay 100ms, dalam rentang 80–150ms)
export const projectStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Stagger container untuk OrganizationalSection (delay 120ms, dalam rentang 80–150ms)
export const orgStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
```

Keputusan desain: `projectCardVariants` dan `orgCardVariants` didefinisikan terpisah meskipun nilainya sama, agar setiap komponen memiliki variants yang bisa diubah secara independen di masa depan tanpa efek samping.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Toggle hamburger menu mengubah state

*For any* state awal menu (terbuka atau tertutup), mengklik tombol HamburgerMenu harus menghasilkan state yang berlawanan.

**Validates: Requirements 1.3**

---

### Property 2: aria-expanded mencerminkan state menu

*For any* state menu (isOpen: boolean), atribut `aria-expanded` pada tombol HamburgerMenu harus selalu sama dengan nilai string dari state tersebut (`"true"` jika terbuka, `"false"` jika tertutup).

**Validates: Requirements 1.4, 1.5**

---

### Property 3: Class navbar sesuai threshold scroll

*For any* nilai `scrollY`, jika `scrollY > 50` maka Navbar harus memiliki class backdrop-blur dan background semi-transparan; jika `scrollY <= 50` maka Navbar harus memiliki background transparan.

**Validates: Requirements 1.6, 1.7**

---

### Property 4: Tepat satu nav link aktif

*For any* section yang terdeteksi aktif oleh `useActiveSection`, tepat satu nav link harus memiliki status aktif, dan nav link tersebut harus sesuai dengan id section yang aktif.

**Validates: Requirements 1.9, 1.10**

---

### Property 5: Durasi animasi headline tidak melebihi 2000ms

*For any* headline dengan panjang antara 1 hingga 50 kata, total durasi animasi text reveal (dihitung sebagai `(jumlah_kata - 1) * delay + duration_per_kata`) harus tidak melebihi 2000ms.

**Validates: Requirements 2.5**

---

### Property 6: Semua field ProjectCard dirender tanpa undefined

*For any* objek `Project` yang valid, merender `ProjectCard` dengan data tersebut harus menghasilkan DOM yang mengandung teks dari field `title`, `description`, `date`, dan semua elemen `techStack` — tidak ada yang kosong atau undefined.

**Validates: Requirements 3.6, 3.7**

---

### Property 7: Semua field OrgCard dirender tanpa undefined

*For any* objek `OrgExperience` yang valid, merender `OrgCard` dengan data tersebut harus menghasilkan DOM yang mengandung teks dari field `role`, `organization`, `dateRange`, dan `description` — tidak ada yang kosong atau undefined.

**Validates: Requirements 4.3, 4.4**

---

### Property 8: Stagger delay dalam rentang 80–150ms

*For any* stagger container variant yang diekspor dari `lib/data.ts`, nilai `staggerChildren` harus berada dalam rentang `[0.08, 0.15]` (dalam satuan detik).

**Validates: Requirements 3.4, 5.3**

---

### Property 9: Durasi hover transition tidak melebihi 200ms

*For any* card interaktif (ProjectCard, OrgCard, ExperienceCard), nilai `duration` pada konfigurasi `whileHover` harus tidak melebihi `0.2` detik.

**Validates: Requirements 3.5, 5.4**

---

### Property 10: Social links memiliki href dan aria-label yang valid

*For any* social link yang dirender oleh Footer, atribut `href` harus tidak kosong dan atribut `aria-label` harus tidak kosong.

**Validates: Requirements 6.3**

---

### Property 11: External links membuka di tab baru dengan aman

*For any* social link eksternal yang dirender oleh Footer, atribut `target` harus bernilai `"_blank"` dan atribut `rel` harus mengandung `"noopener"` dan `"noreferrer"`.

**Validates: Requirements 6.4**

---

### Property 12: techStack setiap Project minimal satu elemen

*For any* `Project` dalam konstanta `projects` yang diekspor dari `lib/data.ts`, field `techStack` harus berupa array dengan panjang minimal 1.

**Validates: Requirements 7.5**

---

### Property 13: Semua animation variants memiliki opacity yang benar

*For any* animation variant yang diekspor dari `lib/data.ts` (termasuk yang baru: `projectCardVariants`, `orgCardVariants`, `scrollFadeVariants`), state `hidden` harus memiliki `opacity: 0` dan state `visible` harus memiliki `opacity: 1`.

**Validates: Requirements 7.7**

---

## Error Handling

### Data Layer
- Semua data statis (`projects`, `orgExperiences`) didefinisikan sebagai konstanta TypeScript dengan tipe eksplisit. TypeScript compiler menjamin kelengkapan field pada compile time.
- Field opsional (`link?: string` pada Project) harus selalu dicek sebelum dirender: `{project.link && <a href={project.link}>...</a>}`.

### IntersectionObserver (useActiveSection)
- Hook harus mengecek ketersediaan `IntersectionObserver` di environment (SSR-safe): `if (typeof IntersectionObserver === 'undefined') return;`
- Cleanup observer wajib dilakukan di return function `useEffect` untuk mencegah memory leak.

### Animasi dan ReducedMotion
- Setiap komponen yang menggunakan Framer Motion harus memanggil `useReducedMotion()` dan merender konten statis (tanpa `motion.*` variants) jika hasilnya `true`.
- Pola yang digunakan konsisten: `if (prefersReducedMotion) return <StaticVersion />; return <AnimatedVersion />;`

### External Links
- Semua link eksternal (social links di Footer) wajib menggunakan `target="_blank" rel="noopener noreferrer"` untuk mencegah tabnapping.

---

## Testing Strategy

### Pendekatan Dual Testing

Testing menggunakan dua pendekatan yang saling melengkapi:
- **Unit tests** (Vitest + @testing-library/react): memverifikasi contoh spesifik, edge case, dan kondisi error
- **Property-based tests** (Vitest + fast-check v4): memverifikasi properti universal di berbagai input yang di-generate secara acak

### Unit Tests (Contoh Spesifik)

Fokus pada:
- Keberadaan elemen DOM yang diharapkan (id, teks, atribut)
- Jumlah data yang dirender (7 projects, 3 orgExperiences)
- Keberadaan ekspor dari `lib/data.ts`
- Edge case ReducedMotion (mock `useReducedMotion` → `true`)

Contoh test cases:
```
- Navbar merender logo "RSH" dan 6 nav links
- HeroSection merender nama "Rahmat Sigit Hidayat"
- HeroSection merender minimal 2 CTA button dengan href yang benar
- ProjectsSection merender tepat 7 ProjectCard
- OrganizationalSection merender tepat 3 OrgCard
- Footer merender elemen dengan id="contact"
- Footer merender 4 social links
- Footer merender teks copyright
- lib/data.ts mengekspor projects dengan length 7
- lib/data.ts mengekspor orgExperiences dengan length 3
- lib/data.ts mengekspor projectCardVariants, orgCardVariants, scrollFadeVariants
```

### Property-Based Tests (fast-check v4)

Library: **fast-check v4** (sudah tersedia di devDependencies)
Konfigurasi: minimum **100 iterasi** per property test.
Tag format: `// Feature: portfolio-ui-enhancement, Property {N}: {deskripsi}`

Setiap Correctness Property di atas diimplementasikan sebagai satu property-based test:

**Property 1** — Toggle hamburger:
```
// Feature: portfolio-ui-enhancement, Property 1: Toggle hamburger menu mengubah state
fc.property(fc.boolean(), (initialOpen) => {
  // render Navbar dengan state awal, klik tombol, verifikasi state berubah
})
```

**Property 2** — aria-expanded:
```
// Feature: portfolio-ui-enhancement, Property 2: aria-expanded mencerminkan state menu
fc.property(fc.boolean(), (isOpen) => {
  // render dengan isOpen, verifikasi aria-expanded === String(isOpen)
})
```

**Property 3** — Class navbar scroll:
```
// Feature: portfolio-ui-enhancement, Property 3: Class navbar sesuai threshold scroll
fc.property(fc.integer({ min: 0, max: 2000 }), (scrollY) => {
  // mock useScrollPosition dengan scrollY, verifikasi class yang diterapkan
})
```

**Property 5** — Durasi animasi headline:
```
// Feature: portfolio-ui-enhancement, Property 5: Durasi animasi headline tidak melebihi 2000ms
fc.property(fc.array(fc.string(), { minLength: 1, maxLength: 50 }), (words) => {
  // hitung total durasi berdasarkan textRevealVariants config, assert <= 2000
})
```

**Property 6** — ProjectCard fields:
```
// Feature: portfolio-ui-enhancement, Property 6: Semua field ProjectCard dirender tanpa undefined
fc.property(arbitraryProject, (project) => {
  // render ProjectCard, verifikasi semua field ada di DOM
})
```

**Property 7** — OrgCard fields:
```
// Feature: portfolio-ui-enhancement, Property 7: Semua field OrgCard dirender tanpa undefined
fc.property(arbitraryOrgExperience, (org) => {
  // render OrgCard, verifikasi semua field ada di DOM
})
```

**Property 8** — Stagger delay:
```
// Feature: portfolio-ui-enhancement, Property 8: Stagger delay dalam rentang 80–150ms
// Test deterministik: iterasi semua stagger variants yang diekspor
// Verifikasi staggerChildren >= 0.08 && staggerChildren <= 0.15
```

**Property 9** — Hover duration:
```
// Feature: portfolio-ui-enhancement, Property 9: Durasi hover transition tidak melebihi 200ms
// Test deterministik: verifikasi konfigurasi whileHover pada semua card variants
```

**Property 10** — Social links href dan aria-label:
```
// Feature: portfolio-ui-enhancement, Property 10: Social links memiliki href dan aria-label yang valid
// Test deterministik: render Footer, iterasi semua link, verifikasi atribut
```

**Property 11** — External links keamanan:
```
// Feature: portfolio-ui-enhancement, Property 11: External links membuka di tab baru dengan aman
// Test deterministik: render Footer, verifikasi target="_blank" dan rel mengandung noopener noreferrer
```

**Property 12** — techStack minimal satu elemen:
```
// Feature: portfolio-ui-enhancement, Property 12: techStack setiap Project minimal satu elemen
// Test deterministik: iterasi projects[], verifikasi techStack.length >= 1
```

**Property 13** — Animation variants opacity:
```
// Feature: portfolio-ui-enhancement, Property 13: Semua animation variants memiliki opacity yang benar
// Test deterministik: iterasi semua variants yang diekspor, verifikasi hidden.opacity === 0 dan visible.opacity === 1
```

### Catatan Implementasi Testing

- Property 4 (active section) memerlukan mock `IntersectionObserver` — gunakan `vi.stubGlobal('IntersectionObserver', MockIO)` di Vitest.
- Property 1, 2, 3 memerlukan mock hooks internal Navbar — gunakan `vi.mock('@/hooks/useScrollPosition')` dan `vi.mock('@/hooks/useActiveSection')`.
- Untuk property yang bersifat deterministik (8, 9, 10, 11, 12, 13), fast-check tetap digunakan dengan `fc.constant()` atau loop sederhana untuk konsistensi framework, namun bisa juga ditulis sebagai unit test biasa.
