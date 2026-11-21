const $ = (id) => document.getElementById(id);
const safe = (value, fallback = "") => value == null || value === "" ? fallback : String(value);
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value + (String(value).length === 10 ? "T00:00:00" : ""));
  return isNaN(d) ? value : new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"long",year:"numeric"}).format(d);
};
async function readJSON(path, fallback) {
  try { const response = await fetch(path, {cache:"no-store"}); if (!response.ok) return fallback; return await response.json(); }
  catch (error) { console.warn("Tidak dapat membaca", path, error); return fallback; }
}
function renderAnnouncements(items) {
  const root = $("announcementList");
  if (!Array.isArray(items) || !items.length) { root.innerHTML = '<div class="empty-state">Belum ada pengumuman yang ditambahkan melalui admin.</div>'; return; }
  root.innerHTML = items.map(item => `<article class="info-card"><span class="card-tag">${escapeHTML(safe(item.status,"INFORMASI"))}</span><h3>${escapeHTML(safe(item.judul,"Pengumuman"))}</h3><p>${escapeHTML(safe(item.isi,""))}</p><time>${escapeHTML(formatDate(item.tanggal))}</time></article>`).join("");
}
function renderAgenda(items) {
  const root = $("agendaList");
  if (!Array.isArray(items) || !items.length) { root.innerHTML = '<div class="empty-state">Belum ada agenda kegiatan.</div>'; return; }
  root.innerHTML = items.map(item => {
    const d = item.tanggal ? new Date(item.tanggal + "T00:00:00") : null;
    const day = d && !isNaN(d) ? d.toLocaleDateString("id-ID",{day:"2-digit"}) : "—";
    const month = d && !isNaN(d) ? d.toLocaleDateString("id-ID",{month:"short"}) : "AGENDA";
    return `<article class="agenda-item"><div class="date-box"><b>${day}</b><small>${month}</small></div><div><h3>${escapeHTML(safe(item.nama,"Kegiatan warga"))}</h3><p>${escapeHTML(safe(item.keterangan,""))}</p></div><div class="agenda-place">${escapeHTML([item.waktu,item.tempat].filter(Boolean).join(" · "))}</div></article>`;
  }).join("");
}
function renderPrograms(items) {
  const root = $("programList");
  if (!Array.isArray(items) || !items.length) { root.innerHTML = '<div class="empty-state dark-empty">Program kerja akan ditampilkan di sini.</div>'; return; }
  root.innerHTML = items.map((item,i) => `<article class="program-card"><span class="number">PROGRAM ${(i+1).toString().padStart(2,"0")}</span><h3>${escapeHTML(safe(item.nama,"Program warga"))}</h3><p>${escapeHTML(safe(item.keterangan,""))}</p></article>`).join("");
}
function normalizeImage(path) {
  if (!path) return "";
  const value = String(path).trim();
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  return value.startsWith("/") ? "." + value : value;
}
function renderGallery(items) {
  const root = $("galleryList");
  const valid = Array.isArray(items) ? items.filter(item => item && item.foto) : [];
  if (!valid.length) { root.innerHTML = '<div class="empty-state">Foto kegiatan belum ditambahkan. Unggah foto melalui Media di Pages CMS, lalu pilih foto pada menu Galeri.</div>'; return; }
  root.innerHTML = valid.map(item => `<article class="gallery-card"><img loading="lazy" src="${escapeHTML(normalizeImage(item.foto))}" alt="${escapeHTML(safe(item.judul,"Foto kegiatan"))}" onerror="this.style.display='none'"><div class="gallery-caption"><h3>${escapeHTML(safe(item.judul,"Dokumentasi kegiatan"))}</h3><p>${escapeHTML(safe(item.keterangan,""))}</p><small>${escapeHTML(formatDate(item.tanggal))}</small></div></article>`).join("");
}
async function init() {
  $("year").textContent = new Date().getFullYear();
  const [site, announcements, agenda, programs, gallery] = await Promise.all([
    readJSON("content/site.json",{}), readJSON("content/pengumuman.json",[]),
    readJSON("content/agenda.json",[]), readJSON("content/program.json",[]),
    readJSON("content/galeri.json",[])
  ]);
  $("heroTitle").innerHTML = `${escapeHTML(safe(site.judul,"Bersama Membangun"))}<br><em>Kampung Ciseupan</em>`;
  $("heroDesc").textContent = safe(site.deskripsi,"Media informasi, komunikasi, dan kebersamaan warga RT 01 Kampung Ciseupan, RW 14.");
  $("profileDescription").textContent = safe(site.deskripsi,"Membangun lingkungan yang aman, nyaman, bersih, dan harmonis melalui kebersamaan seluruh warga.");
  $("siteNama").textContent = safe(site.nama,"RT 01 Kampung Ciseupan");
  $("siteKetua").textContent = safe(site.ketua_rt,"Belum diperbarui");
  $("siteAlamat").textContent = safe(site.alamat,"Kampung Ciseupan, RW 14");
  $("siteTelepon").textContent = safe(site.telepon,"—");
  $("contactPhone").textContent = safe(site.telepon,"Belum tersedia");
  $("contactEmail").textContent = safe(site.email,"—");
  renderAnnouncements(announcements); renderAgenda(agenda); renderPrograms(programs); renderGallery(gallery);
}
const toggle = $("menuToggle");
toggle.addEventListener("click", () => { const nav = $("mainNav"); const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded",String(open)); });
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click",() => $("mainNav").classList.remove("open")));
init();
