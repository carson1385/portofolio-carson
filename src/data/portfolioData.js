/**
 * ==============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * File ini adalah pusat pengaturan seluruh isi website portofolio Anda.
 * Anda dapat mengubah teks, nama, role, kontak, WhatsApp, proyek, dan keahlian
 * langsung dari sini tanpa perlu mengubah kode komponen React.
 *
 * Tips:
 * - Simpan perubahan file ini.
 * - Website akan otomatis terupdate jika mode development berjalan (npm run dev).
 * - Jalankan perintah git push untuk mengupdate tampilan di GitHub & Vercel.
 * ==============================================================================
 */

export const portfolioData = {
  // ==========================================
  // 1. DATA PRIBADI & HERO SECTION
  // ==========================================
  personal: {
    name: "Carson Roderick",
    initials: "CR",
    terminalUser: "carson@dev:~$ status",
    statusBadge: "Available for new projects & opportunities",
    heroGreeting: "Halo, Saya",

    // Role dinamis yang bergantian diketik (Typewriter Effect)
    typewriterRoles: [
      "Software Engineer",
      "Full-Stack Builder",
      "Problem Solver",
      "System Architect"
    ],

    // Bio / Deskripsi singkat di bagian Hero
    bio: "Berfokus pada arsitektur perangkat lunak modern yang bersih, efisien, dan memiliki skalabilitas tinggi. Mengubah konsep kompleks menjadi produk digital berkinerja maksimal.",

    // Lokasi & Spesialisasi (Muncul di kartu avatar terminal)
    location: "Jakarta, Indonesia",
    timeZone: "WIB / GMT+7",
    focusArea: "Full-Stack & Arch",

    // Badge melayang di kartu avatar
    cardBadges: {
      topRight: "Clean Code",
      bottomLeft: "Ultra Fast"
    }
  },

  // ==========================================
  // 2. KONTAK, SOSIAL MEDIA & WHATSAPP
  // ==========================================
  contact: {
    // Alamat email yang tampil di website dan tujuan copy clipboard
    email: "carsonrods01@gmail.com",

    // Nomor WhatsApp (Format: kode negara tanpa tanda '+', contoh: 6281234567890)
    whatsappNumber: "6283164537261",

    // Tampilan nomor telepon yang rapi di kartu kontak
    whatsappDisplay: "+62 831-6453-7261",

    // Pesan default saat tombol WhatsApp ditekan
    whatsappDefaultMessage: "Halo Carson Roderick, saya tertarik untuk mendiskusikan peluang proyek.",

    // Tautan Akun Sosial Media
    socialLinks: {
      github: "https://github.com/carson1385",
      linkedin: "https://linkedin.com/CARSON",
      twitter: "https://twitter.com"
    }
  },

  // ==========================================
  // 3. TENTANG SAYA (ABOUT ME)
  // ==========================================
  about: {
    sectionNumber: "02. Mengenal Saya",
    title: "About Me",
    heading: "Membangun Solusi Digital dengan Presisi, Efisiensi, & Dedikasi",
    paragraphs: [
      "Saya adalah seorang Software Engineer dan Coder yang bersemangat dalam merancang sistem yang elegan, terstruktur, dan mudah dipelihara. Ketertarikan saya pada dunia pemrograman berawal dari rasa ingin tahu tentang bagaimana baris kode dapat memecahkan masalah nyata dan memberikan dampak langsung pada jutaan pengguna.",
      "Dengan perpaduan pemahaman arsitektur perangkat lunak yang kokoh serta perhatian tinggi terhadap estetika antarmuka, saya selalu berorientasi pada penyampaian produk yang tidak hanya berfungsi secara sempurna, tetapi juga memberikan pengalaman pengguna yang mulus dan memuaskan."
    ],

    // Kata-kata prinsip rekayasa yang beranimasi (TrueFocus)
    engineeringPrinciples: "Clean-Architecture Scalable High-Performance Modularity Security",

    // Metrik / Statistik Pengalaman
    stats: [
      { value: 3, suffix: "+", label: "Tahun Pengalaman" },
      { value: 25, suffix: "+", label: "Proyek Selesai" },
      { value: 99, suffix: "%", label: "Komitmen Kualitas" }
    ],

    // Nilai / Pilar Utama Rekayasa
    pillars: [
      {
        title: "Clean Architecture",
        description: "Kode modular, teruji (testable), mudah dikembangkan, dan sesuai standar industri."
      },
      {
        title: "Performance-First",
        description: "Optimasi waktu pemuatan kilat, rendering responsif, dan alokasi memori efisien."
      }
    ]
  },

  // ==========================================
  // 4. DAFTAR KEAHLIAN / SKILLS
  // ==========================================
  skills: {
    frontend: [
      "HTML5 & CSS3",
      "Tailwind CSS",
      "JavaScript ES6+",
      "TypeScript",
      "React.js",
      "Next.js"
    ],
    backend: [
      "Node.js",
      "Express",
      "RESTful API",
      "PostgreSQL",
      "MongoDB",
      "Redis"
    ],
    tools: [
      "Git & GitHub",
      "Docker",
      "Vite",
      "Linux / DevOps"
    ]
  },

  // ==========================================
  // 5. RIWAYAT KARIR & PENGALAMAN (TIMELINE)
  // ==========================================
  experiences: [
    {
      role: "Senior Full-Stack Engineer & Architect",
      period: "2024 – Sekarang",
      company: "Tech Solutions Studio",
      type: "Full-time / Lead",
      description: "Memimpin perancangan arsitektur microservices terdistribusi, migrasi Next.js App Router, dan peningkatan skor performa hingga 99+ di Google Lighthouse.",
      highlights: [
        "Merancang arsitektur sistem dengan latensi <80ms untuk 100k+ request harian",
        "Mengimplementasikan CI/CD pipeline otomatis dengan Docker dan GitHub Actions"
      ],
      skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Redis"]
    },
    {
      role: "Backend & API Engineer",
      period: "2023 – 2024",
      company: "Fintech Scale-Up Lab",
      type: "Full-time",
      description: "Mengembangkan high-throughput API gateway, modul otentikasi JWT terenkripsi, serta caching Redis berkecepatan tinggi.",
      highlights: [
        "Optimasi query database PostgreSQL yang mengurangi beban server hingga 40%",
        "Integrasi webhook pembayaran real-time dan notifikasi otomatis"
      ],
      skills: ["Node.js", "Express", "Redis", "PostgreSQL", "RESTful API"]
    },
    {
      role: "Frontend Web Developer",
      period: "2022 – 2023",
      company: "Digital Creative Agency",
      type: "Full-time",
      description: "Membangun antarmuka web interaktif yang modern, responsif, dan kaya animasi mikro untuk klien berskala enterprise.",
      highlights: [
        "Mengembangkan 15+ landing page dan aplikasi web berskala enterprise",
        "Menerapkan standardisasi UI/UX dengan Tailwind CSS dan reusable components"
      ],
      skills: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Vite", "Git"]
    }
  ],

  // ==========================================
  // 6. DAFTAR PROYEK / PORTFOLIO KARYA
  // ==========================================
  projects: [
    {
      id: 1,
      title: "SaaS Analytics & Monitoring Platform",
      category: "fullstack",
      categoryLabel: "Full-Stack Application",
      year: "2026",
      desc: "Platform pemantauan performa bisnis real-time dengan visualisasi data interaktif, autentikasi multi-tenant, dan webhook notification.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      featured: true,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      architectureDetails: {
        problem: "Monitoring metrik performa aplikasi berskala besar secara real-time dengan latensi rendah.",
        solution: "Membangun sistem micro-frontend dengan event-driven WebSocket pipeline dan time-series database caching.",
        keyFeatures: [
          "Real-time websocket streaming untuk visualisasi chart tanpa reload",
          "Multi-tenant data isolation dengan PostgreSQL Row Level Security (RLS)",
          "Automated alerting ke Slack & Email saat terjadi anomali latensi"
        ],
        results: "Mengurangi mean-time-to-detect (MTTD) insiden sistem sebesar 65% dan mampu menangani 2.5 juta event/hari."
      }
    },
    {
      id: 2,
      title: "Minimalist E-Commerce Storefront",
      category: "frontend",
      categoryLabel: "Frontend & UI/UX",
      year: "2025",
      desc: "Toko online modern dengan kecepatan loading kilat (<1s), instant cart management, filter produk dinamis, dan checkout mulus.",
      tech: ["React", "Tailwind CSS", "Zustand", "Vite"],
      featured: false,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      architectureDetails: {
        problem: "Bounce rate tinggi pada toko online tradisional akibat bundle size berat dan loading lambat.",
        solution: "Arsitektur frontend headless dengan caching data lokal di Zustand dan code splitting dinamis.",
        keyFeatures: [
          "Skor Google Lighthouse 100/100 pada Mobile & Desktop",
          "Optimistic UI updates saat menambah produk ke keranjang",
          "Pencarian produk instan berkecepatan 5ms"
        ],
        results: "Meningkatkan rasio konversi checkout pelanggan hingga 32%."
      }
    },
    {
      id: 3,
      title: "High-Throughput Microservice API Gateway",
      category: "backend",
      categoryLabel: "Microservice & API",
      year: "2025",
      desc: "Gateway API terdistribusi dengan token bucket rate-limiting, otentikasi JWT terenkripsi, dan caching terpusat menggunakan Redis.",
      tech: ["Node.js", "Express", "Redis", "Docker"],
      featured: false,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      architectureDetails: {
        problem: "Lonjakan beban trafik tak terduga yang berisiko menumbangkan downstream microservices.",
        solution: "Menerapkan gateway terisolasi berbasis sliding-window rate limiter dan reverse proxy failover.",
        keyFeatures: [
          "Rate limiter multi-tier berbasis user subscription plan",
          "Zero-downtime healthcheck monitoring dengan auto-routing",
          "Logging terpusat dan tracing audit transaksi"
        ],
        results: "Menjaga uptime sistem pada level 99.99% di bawah beban stress test 15.000 RPS."
      }
    },
    {
      id: 4,
      title: "Real-time Markdown Workspace",
      category: "fullstack",
      categoryLabel: "Collaborative App",
      year: "2024",
      desc: "Aplikasi kolaborasi dokumen real-time dengan sinkronisasi multi-pengguna via WebSockets, markdown rendering instan, dan revision history.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      featured: false,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      architectureDetails: {
        problem: "Konflik pengeditan saat banyak pengguna menyunting dokumen teks yang sama secara bersamaan.",
        solution: "Penerapan algoritma Conflict-free Replicated Data Type (CRDT) melalui saluran WebSocket stabil.",
        keyFeatures: [
          "Live presence indicator (melihat posisi kursor pengguna lain)",
          "Export instan ke PDF, HTML, dan file Markdown bersih",
          "Riwayat revisi per-karakter dengan opsi rollback cepat"
        ],
        results: "Sinkronisasi antar pengguna tercapai dalam waktu di bawah 40 milidetik."
      }
    }
  ],

  // ==========================================
  // 7. TECH TICKER (MARQUEE BERGERAK DI BAWAH HERO)
  // ==========================================
  techTicker: [
    { name: "TypeScript", icon: "⚡" },
    { name: "React.js", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Redis", icon: "🔥" },
    { name: "Docker", icon: "🐳" },
    { name: "Express.js", icon: "🚀" },
    { name: "MongoDB", icon: "🍃" },
    { name: "GraphQL", icon: "◈" },
    { name: "Linux / DevOps", icon: "🐧" }
  ]
};

export default portfolioData;

