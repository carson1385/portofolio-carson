# Portfolio Carson Roderick (Vite + React + React Bits + Tailwind CSS)

Website personal portfolio modern, minimalis, dan profesional yang diperkaya dengan komponen animasi interaktif terpopuler dari **[React Bits](https://reactbits.dev)**, dipadukan dengan **Vite.js** dan **Tailwind CSS**.

---

## ⚡ Cara Menjalankan di Komputer Lokal

Buka terminal di folder ini (`c:\Users\Carso\Downloads\Company Profile`), lalu jalankan:

```bash
npm run dev
```

Website akan langsung terbuka di browser Anda:
👉 **`http://localhost:3000/`**

---

## 📦 Cara Membangun Versi Produksi (*Build*)

Sebelum melakukan deploy manual, buat file produksi terbaru dengan menjalankan:

```bash
npm run build
```

Perintah ini akan mengompilasi seluruh kode React, Tailwind CSS, dan komponen React Bits menjadi file web statis berkecepatan tinggi di dalam folder **`dist/`**.

---

## 🚀 Cara Deploy Manual ke Vercel (Tanpa GitHub)

Ada 2 cara sangat mudah untuk deploy proyek ini langsung ke Vercel tanpa perlu menghubungkan ke GitHub:

### Cara 1: Menggunakan Vercel CLI (Paling Cepat & Praktis)

1. Buka terminal di folder ini (`c:\Users\Carso\Downloads\Company Profile`).
2. Jalankan perintah:
   ```bash
   npx vercel
   ```
3. Jika baru pertama kali, Anda akan diminta login ke akun Vercel (bisa via Google/Email).
4. Vercel akan menanyakan beberapa konfirmasi di terminal, cukup tekan **Enter** untuk setiap pertanyaan:
   - *Set up and deploy?* -> Tekan **Y** lalu Enter
   - *Which scope?* -> Tekan **Enter**
   - *Link to existing project?* -> Tekan **N** lalu Enter
   - *What's your project's name?* -> Tekan **Enter**
   - *In which directory is your code located?* -> Tekan **Enter**
5. Untuk deploy ke domain production resmi, jalankan:
   ```bash
   npx vercel --prod
   ```
Website Anda langsung live dengan URL publik resmi gratis dari Vercel!

---

### Cara 2: Drag & Drop Folder `dist` ke Vercel Dashboard (Tanpa CLI)

1. Pastikan Anda sudah menjalankan `npm run build` sehingga folder `dist` sudah terbuat.
2. Buka browser dan login ke akun Anda di: **[vercel.com](https://vercel.com)**.
3. Di dashboard Vercel, buka menu **Deployments** atau kunjungi link drop: **[vercel.com/new](https://vercel.com/new)**.
4. Tarik (*drag and drop*) folder **`dist`** dari File Explorer komputer Anda langsung ke area upload di browser.
5. Vercel akan langsung meng-hosting file Anda dalam hitungan detik!

---

## 🧭 Struktur Navigasi (Tepat 4 Navbar Utama)
1. **Home**: Hero section dengan Particles background, DecryptedText nama, dynamic typewriter role, TiltedCard profil 3D multi-layer, InteractiveTerminal, dan InfiniteMarquee tech ticker.
2. **About Me**: Profil, Squares interactive grid, TrueFocus prinsip kode, CountUp statistik, ExperienceTimeline riwayat karir, dan GithubHeatmap aktivitas kode.
3. **Projects**: Portofolio interaktif berfitur filter kategori, kartu SpotlightCard, ProjectModal detail arsitektur, dan animasi BorderBeam pada featured project.
4. **Contact**: Integrasi WhatsApp instan, WhatsAppPreview live bubble, kartu email dengan tombol salin (toast feedback), dan formulir pesan dengan efek konfeti.
