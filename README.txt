WEBSITE RT 01 KAMPUNG CISEUPAN — PANDUAN PEMASANGAN

ISI PAKET
- index.html, style.css, script.js: tampilan website.
- .pages.yml: konfigurasi Pages CMS termasuk Media dan Galeri Foto.
- content/: data profil, pengumuman, agenda, program kerja, dan galeri.
- media/: folder tujuan upload gambar.

PEMASANGAN DI GITHUB
1. Buat repository GitHub baru (Public).
2. Ekstrak ZIP ini di komputer.
3. Unggah semua ISI folder hasil ekstrak ke halaman utama/root repository.
   PENTING: unggah file .pages.yml (file diawali titik) dan folder content serta media.
4. Commit perubahan.
5. Aktifkan GitHub Pages: Settings > Pages > Deploy from a branch > main > /(root) > Save.
6. Buka https://app.pagescms.org/ dan hubungkan repository yang sama.
7. Muat ulang Pages CMS. Menu Profil Website, Pengumuman Warga, Agenda Kegiatan,
   Program Kerja, dan Galeri Foto seharusnya tersedia.

CARA UPLOAD FOTO DAN MENAMPILKAN DI GALERI
1. Buka repository di Pages CMS.
2. Gunakan Media untuk mengunggah gambar. Folder tujuan di repository adalah media/.
3. Buka menu Galeri Foto, buat item baru.
4. Isi Judul foto, Tanggal kegiatan, pilih foto pada kolom Foto, dan isi Keterangan.
5. Simpan/commit perubahan di Pages CMS.
6. Tunggu GitHub Pages memperbarui situs, lalu muat ulang website.

CATATAN
- Upload melalui Media hanya menyimpan file gambar. Agar foto tampil di website,
  foto juga harus dipilih pada item di menu Galeri Foto.
- Menu Galeri Foto mengelola data galeri; tampilan website membaca content/galeri.json.
- Jika menu tidak muncul, pastikan .pages.yml berada di root repository (sejajar index.html),
  bukan di dalam folder content. Pastikan nama file tepat .pages.yml.
- Jangan unggah folder induk ZIP sebagai satu folder bertingkat. Unggah ISI paket ke root.
- Untuk perubahan website, lakukan commit ke branch main.
