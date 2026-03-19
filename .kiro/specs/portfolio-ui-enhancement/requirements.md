# Dokumen Requirements: Portfolio UI Enhancement

## Pendahuluan

Enhancement pada website portofolio pribadi Rahmat Sigit Hidayat yang sudah ada (Next.js 16 + Tailwind CSS v4 + Framer Motion v12). Fitur ini mencakup redesign Navbar, peningkatan HeroSection, penambahan dua section baru (Projects dan Organizational Experience), penguatan animasi Framer Motion secara menyeluruh, dan penambahan Footer dengan social links.

Website saat ini memiliki: Navbar (sederhana), HeroSection (text reveal), ExperienceSection (work + education cards), dan SkillBridgeSection. Enhancement ini bersifat additive — tidak menghapus fungsionalitas yang sudah ada.

## Glosarium

- **Navbar**: Komponen navigasi tetap (fixed) di bagian atas halaman
- **HeroSection**: Section pertama halaman yang menampilkan identitas dan tagline utama
- **ProjectsSection**: Section baru yang menampilkan daftar proyek dari CV
- **OrganizationalSection**: Section baru yang menampilkan pengalaman organisasi
- **Footer**: Komponen di bagian bawah halaman dengan social links
- **ScrollIndicator**: Elemen visual di HeroSection yang mengarahkan pengguna untuk scroll ke bawah
- **HamburgerMenu**: Tombol toggle untuk membuka/menutup menu navigasi di perangkat mobile
- **ActiveIndicator**: Penanda visual pada nav link yang sesuai dengan section yang sedang terlihat di viewport
- **Project**: Data proyek dengan field title, description, techStack, date, dan opsional link
- **OrgExperience**: Data pengalaman organisasi dengan field role, organization, dateRange, dan description
- **ReducedMotion**: Preferensi aksesibilitas pengguna untuk meminimalkan animasi
- **StaggerAnimation**: Animasi berurutan pada sekumpulan elemen dengan delay antar elemen
- **ScrollTriggered**: Animasi yang dipicu saat elemen masuk ke dalam viewport
- **ViewportOnce**: Konfigurasi animasi yang hanya diputar sekali saat elemen pertama kali masuk viewport

---

## Requirements

### Requirement 1: Redesign Navbar

**User Story:** Sebagai pengunjung website, saya ingin navbar yang modern dan responsif, agar navigasi terasa nyaman di semua ukuran layar.

#### Acceptance Criteria

1. THE Navbar SHALL menampilkan logo/inisial "RSH" di sisi kiri dan daftar nav links di sisi kanan pada layar desktop (lebar ≥ 768px).
2. WHEN lebar viewport kurang dari 768px, THE Navbar SHALL menyembunyikan daftar nav links dan menampilkan HamburgerMenu.
3. WHEN HamburgerMenu diklik, THE Navbar SHALL menampilkan atau menyembunyikan menu navigasi mobile dengan toggle.
4. WHEN HamburgerMenu dalam keadaan terbuka, THE Navbar SHALL menetapkan atribut `aria-expanded="true"` pada tombol HamburgerMenu.
5. WHEN HamburgerMenu dalam keadaan tertutup, THE Navbar SHALL menetapkan atribut `aria-expanded="false"` pada tombol HamburgerMenu.
6. WHEN pengguna melakukan scroll melewati 50px dari atas halaman, THE Navbar SHALL menerapkan efek `backdrop-blur` dan background semi-transparan.
7. WHEN pengguna berada di posisi scroll 0–50px, THE Navbar SHALL menampilkan background transparan.
8. THE Navbar SHALL menampilkan nav links ke section: Hero, Experience, Skill Bridge, Projects, Organizations, dan Contact (Footer).
9. WHEN sebuah section masuk ke dalam viewport, THE Navbar SHALL menandai nav link yang sesuai sebagai aktif dengan visual indicator.
10. WHEN hanya satu section yang aktif pada satu waktu, THE Navbar SHALL memastikan hanya satu nav link yang memiliki status aktif.
11. IF preferensi ReducedMotion aktif, THEN THE Navbar SHALL menonaktifkan animasi transisi pada menu mobile.

---

### Requirement 2: Enhancement HeroSection

**User Story:** Sebagai pengunjung website, saya ingin HeroSection yang lebih impactful dan menarik, agar kesan pertama terhadap portofolio lebih kuat.

#### Acceptance Criteria

1. THE HeroSection SHALL menampilkan nama lengkap "Rahmat Sigit Hidayat" sebagai headline utama.
2. THE HeroSection SHALL menampilkan tagline profesi dan latar belakang pendidikan (Telkom University, GPA 3.96, Summa Cum Laude).
3. THE HeroSection SHALL menampilkan ScrollIndicator berupa ikon atau teks animasi yang mengarahkan pengguna untuk scroll ke bawah.
4. WHEN halaman pertama kali dimuat, THE HeroSection SHALL memainkan animasi text reveal word-by-word pada headline.
5. WHEN animasi text reveal selesai, THE HeroSection SHALL memastikan total durasi animasi tidak melebihi 2000ms untuk headline dengan panjang hingga 50 kata.
6. THE HeroSection SHALL menampilkan minimal dua CTA button: satu menuju section Projects dan satu menuju section Experience.
7. IF preferensi ReducedMotion aktif, THEN THE HeroSection SHALL merender konten tanpa animasi motion variants.
8. THE HeroSection SHALL menampilkan badge atau label yang mencantumkan minimal tiga skill utama (contoh: Python, SQL, Data Visualization).

---

### Requirement 3: ProjectsSection Baru

**User Story:** Sebagai pengunjung website, saya ingin melihat daftar proyek yang pernah dikerjakan, agar dapat menilai kemampuan teknis dan pengalaman praktis.

#### Acceptance Criteria

1. THE ProjectsSection SHALL menampilkan section dengan `id="projects"` yang berisi semua Project dari data statis.
2. THE ProjectsSection SHALL menampilkan tujuh Project sesuai data CV: Sentiment & Social Network Analysis, Citation Network Analysis, Dashboard Location Segmentation, Asset Monitoring Dashboard, Business Case Website KIM Mayangsari, Data Warehouse Design, dan Strategies Analysis UMKM East Java.
3. WHEN sebuah ProjectCard masuk ke dalam viewport, THE ProjectsSection SHALL memainkan animasi ScrollTriggered dengan konfigurasi ViewportOnce.
4. THE ProjectsSection SHALL menampilkan StaggerAnimation pada daftar ProjectCard dengan delay antar card antara 80ms hingga 150ms.
5. WHEN pengguna mengarahkan kursor ke ProjectCard, THE ProjectsSection SHALL menampilkan efek hover (scale atau shadow) dengan durasi transisi tidak melebihi 200ms.
6. THE ProjectCard SHALL menampilkan field: title, description, techStack (sebagai badge), dan date.
7. FOR ALL Project dalam data statis, THE ProjectCard SHALL merender semua field title, description, techStack, dan date tanpa ada yang kosong atau undefined.
8. IF preferensi ReducedMotion aktif, THEN THE ProjectsSection SHALL merender semua ProjectCard tanpa animasi ScrollTriggered dan StaggerAnimation.
9. THE ProjectsSection SHALL menggunakan layout grid responsif: satu kolom di mobile, dua kolom di tablet (≥ 768px), dan tiga kolom di desktop (≥ 1024px).

---

### Requirement 4: OrganizationalSection Baru

**User Story:** Sebagai pengunjung website, saya ingin melihat pengalaman organisasi, agar pengunjung dapat menilai kemampuan kepemimpinan dan kolaborasi.

#### Acceptance Criteria

1. THE OrganizationalSection SHALL menampilkan section dengan `id="organizations"` yang berisi semua OrgExperience dari data statis.
2. THE OrganizationalSection SHALL menampilkan tiga OrgExperience sesuai data CV: Chairman Data Science Student Union, Digital Team & Study Program Branding MDT, dan Publicity Documentation & Design PKKMB Dewangkara Maetala 2022.
3. THE OrgCard SHALL menampilkan field: role, organization, dateRange, dan description untuk setiap OrgExperience.
4. FOR ALL OrgExperience dalam data statis, THE OrgCard SHALL merender semua field role, organization, dateRange, dan description tanpa ada yang kosong atau undefined.
5. WHEN sebuah OrgCard masuk ke dalam viewport, THE OrganizationalSection SHALL memainkan animasi ScrollTriggered dengan konfigurasi ViewportOnce.
6. THE OrganizationalSection SHALL menggunakan layout responsif: satu kolom di mobile, tiga kolom di desktop (≥ 1024px).
7. IF preferensi ReducedMotion aktif, THEN THE OrganizationalSection SHALL merender semua OrgCard tanpa animasi ScrollTriggered.

---

### Requirement 5: Peningkatan Animasi Framer Motion

**User Story:** Sebagai pengunjung website, saya ingin animasi yang smooth dan powerful di seluruh halaman, agar pengalaman browsing terasa lebih hidup dan profesional.

#### Acceptance Criteria

1. THE AnimationSystem SHALL menggunakan konfigurasi `viewport={{ once: true }}` pada semua animasi ScrollTriggered di seluruh komponen.
2. THE AnimationSystem SHALL mendefinisikan semua animation variants di `lib/data.ts` sebagai konstanta yang dapat digunakan ulang.
3. WHEN komponen dengan StaggerAnimation dirender, THE AnimationSystem SHALL memastikan delay stagger berada dalam rentang 80ms hingga 150ms.
4. THE AnimationSystem SHALL menyediakan `whileHover` variants pada semua card interaktif (ProjectCard, OrgCard, ExperienceCard) dengan durasi transisi tidak melebihi 200ms.
5. IF preferensi ReducedMotion aktif, THEN THE AnimationSystem SHALL menonaktifkan semua motion variants di seluruh komponen yang menggunakan Framer Motion.
6. THE AnimationSystem SHALL menggunakan `useReducedMotion()` dari Framer Motion sebagai satu-satunya mekanisme deteksi preferensi ReducedMotion.

---

### Requirement 6: Footer dengan Social Links

**User Story:** Sebagai pengunjung website, saya ingin footer dengan tautan ke profil sosial dan kontak, agar dapat menghubungi atau mengikuti perkembangan portofolio dengan mudah.

#### Acceptance Criteria

1. THE Footer SHALL menampilkan elemen `<footer>` dengan `id="contact"` di bagian paling bawah halaman.
2. THE Footer SHALL menampilkan minimal empat social links: LinkedIn, GitHub, Tableau Public, dan email.
3. THE Footer SHALL memastikan setiap social link memiliki atribut `href` yang tidak kosong dan atribut `aria-label` yang deskriptif.
4. WHEN pengguna mengklik social link eksternal, THE Footer SHALL membuka link di tab baru menggunakan `target="_blank"` dan `rel="noopener noreferrer"`.
5. THE Footer SHALL menampilkan teks copyright dengan tahun dan nama pemilik portofolio.
6. WHEN pengguna mengarahkan kursor ke social link icon, THE Footer SHALL menampilkan efek hover visual dengan durasi transisi tidak melebihi 150ms.

---

### Requirement 7: Data Layer untuk Fitur Baru

**User Story:** Sebagai developer, saya ingin data statis untuk Projects dan OrgExperience terdefinisi dengan baik di `lib/data.ts`, agar komponen dapat mengonsumsi data secara konsisten.

#### Acceptance Criteria

1. THE DataLayer SHALL mendefinisikan TypeScript interface `Project` dengan field: `id: string`, `title: string`, `description: string`, `techStack: string[]`, `date: string`, dan `link?: string`.
2. THE DataLayer SHALL mendefinisikan TypeScript interface `OrgExperience` dengan field: `id: string`, `role: string`, `organization: string`, `dateRange: string`, dan `description: string`.
3. THE DataLayer SHALL mengekspor konstanta `projects` berisi tujuh Project sesuai data CV.
4. THE DataLayer SHALL mengekspor konstanta `orgExperiences` berisi tiga OrgExperience sesuai data CV.
5. FOR ALL Project dalam konstanta `projects`, THE DataLayer SHALL memastikan field `techStack` adalah array dengan minimal satu elemen.
6. THE DataLayer SHALL mengekspor animation variants baru: `projectCardVariants`, `orgCardVariants`, dan `scrollFadeVariants` untuk digunakan oleh komponen baru.
7. FOR ALL animation variants yang diekspor, THE DataLayer SHALL memastikan state `hidden` memiliki `opacity: 0` dan state `visible` memiliki `opacity: 1`.
