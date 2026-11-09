# Portfolio Carson Roderick (Vite + React + React Bits + Tailwind CSS)

Website personal portfolio modern, minimalis, dan berkinerja tinggi yang ditenagai oleh **Vite.js**, **Tailwind CSS**, dan komponen animasi interaktif dari **React Bits**.

---

## 🛠️ Pusat Pengaturan Isi Website (Configuration File)

Seluruh konten website (nama, bio, nomor WhatsApp, email, pengalaman kerja, proyek, keahlian, dan statistik) telah dipusatkan ke dalam **satu file konfigurasi**:

👉 **[`src/data/portfolioData.js`](file:///c:/Users/Carso/Downloads/Company%20Profile/src/data/portfolioData.js)**

Anda tidak perlu menyentuh kode React yang rumit untuk mengubah isi web. Cukup edit file tersebut:
- **`personal`**: Mengubah nama, greeting, role typewriter, bio, lokasi, dan status pill.
- **`contact`**: Mengubah nomor WhatsApp (`whatsappNumber`), email, dan link media sosial.
- **`about`**: Mengubah narasi diri, statistik pengalaman, dan prinsip rekayasa.
- **`skills`**: Menambah atau mengurangi keahlian (Frontend, Backend, Tools).
- **`experiences`**: Mengatur riwayat karir dan timeline pengalaman kerja.
- **`projects`**: Menambahkan portofolio karya, deskripsi, tech stack, dan arsitektur proyek.

### Opsi Tambahan: Menggunakan File `.env`
Tersedia juga file [`.env.example`](file:///c:/Users/Carso/Downloads/Company%20Profile/.env.example). Jika Anda ingin mengganti nomor WhatsApp atau Email secara cepat via environment variable:
1. Salin file `.env.example` menjadi `.env`.
2. Ubah nilai `VITE_WHATSAPP_PHONE=6281234567890` dan `VITE_CONTACT_EMAIL=emailanda@domain.com`.

---

## 🔄 Cara Menyinkronkan Perubahan ke GitHub & Vercel

Setelah Anda selesai mengedit file di Antigravity / komputer lokal Anda, lakukan langkah-langkah berikut di **Command Prompt (cmd)** atau terminal:

### 1. Perintah Git untuk Push ke GitHub
Buka folder proyek ini di Command Prompt, lalu jalankan:

```cmd
git add .
git commit -m "Update isi konten website"
git push origin main
```

*(Catatan: Jangan tambahkan tanda backslash `\` di akhir kata `main`)*

---

### 2. Cara Mengatasi Error 403 (`Permission denied to carsorods`)
Jika saat menjalankan `git push origin main` muncul error:
> `remote: Permission to carson1385/portofolio-carson.git denied to carsorods.`  
> `fatal: unable to access ... The requested URL returned error: 403`

Hal ini terjadi karena Windows menyimpan login akun GitHub lama Anda (**carsorods**) di Credential Manager.

**Solusi Mudah (Hapus Kredensial Lama di Windows):**
1. Buka menu Windows / Search di laptop Anda.
2. Ketik **`Credential Manager`** (atau *Pengelola Kredensial*) lalu buka.
3. Pilih tab **`Windows Credentials`** (Kredensial Windows).
4. Gulir ke bawah ke bagian **Generic Credentials**, cari entri bernama **`git:https://github.com`**.
5. Klik pada entri tersebut lalu klik **`Remove`** (Hapus).
6. Kembali ke Command Prompt dan jalankan kembali:
   ```cmd
   git push origin main
   ```
7. Browser atau pop-up GitHub akan muncul secara otomatis. Masuk (*Sign in*) menggunakan akun **`carson1385`**. Selesai!

---

### 3. Otomatis Terhubung ke Vercel (Auto-Deploy)
Ketika repository GitHub Anda (`carson1385/portofolio-carson`) sudah terhubung dengan Vercel:
- Setiap kali Anda menjalankan `git push origin main`, Vercel akan **langsung mendeteksi commit baru secara otomatis**.
- Vercel akan menjalankan `npm run build` dan memperbarui website live Anda dalam hitungan detik tanpa perlu melakukan apa pun lagi!

---

## ⚡ Menjalankan Mode Development Lokal

```bash
npm run dev
```
Akses di browser: **`http://localhost:3000/`**

---

## 📦 Membangun Versi Produksi (*Build*)

```bash
npm run build
```
File siap saji akan dibuat di folder **`dist/`**.
