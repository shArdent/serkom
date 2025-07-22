# React + Vite + Bun Setup
Proyek ini menggunakan React sebagai library UI, Vite sebagai bundler modern, dan Bun sebagai runtime JavaScript yang super cepat.
🚀 Fitur
⚡ Super cepat dengan Bun
- ⚛️ React + JSX
- 🔥 Vite untuk hot module replacement
- 🎯 Siap untuk pengembangan dan produksi
# 📦 Prasyarat
Bun (v1.0+)
Install Bun:
curl -fsSL https://bun.sh/install | bash
#🛠️ Instalasi
1. Inisialisasi Project dengan Vite + React
bun create vite@latest my-react-app --template react
cd my-react-app
2. Install Dependency
bun install
3. Jalankan Development Server
bun run dev
Buka http://localhost:5173 di browser untuk melihat hasilnya.
#📂 Struktur Direktori

``` 
my-react-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── bun.lockb
```
#📜 Script Penting
- bun run dev — Menjalankan server pengembangan
- bun run build — Build untuk produksi
- bun run preview — Menjalankan hasil build secara lokal
