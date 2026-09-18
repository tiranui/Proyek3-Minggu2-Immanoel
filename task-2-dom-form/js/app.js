'use strict';
const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];
const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');
function validasiPeserta(calon) {
  // TODO: return object { valid, errorNama, errorProdi }.
  const hasil = {
    valid: true,
    errorNama: '',
    errorProdi: ''
  };
  if (calon.nama.trim().length < 3) {
    hasil.valid = false;
    hasil.errorNama = 'Nama minimal 3 karakter.';
  }
  if (calon.prodi.trim() === '') {
    hasil.valid = false;
    hasil.errorProdi = 'Program studi wajib dipilih.';
  }
  return hasil;
}
function buatKartuPeserta(item) {
  // TODO: buat article, h2, dan p dengan createElement.
  // Isi teks dengan textContent, lalu return article.
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = item.nama;
  const p = document.createElement('p');
  p.textContent = item.prodi;
  article.classList.add('kartu');
  article.append(h2, p);
  return article;
}
function renderPeserta(data) {
  // TODO: kosongkan daftar, tangani data kosong, lalu append kartu.
  daftar.replaceChildren();
  if (data.length === 0) {
    status.textContent = 'Tidak ada peserta';
    return;
  }
  data.forEach((item) => {
    const kartu = buatKartuPeserta(item);
    daftar.append(kartu);
  });
  status.textContent = `${data.length} peserta tampil.`;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO: baca nilai, validasi, atur aria-invalid dan pesan error.
  // Jika valid, push object baru dengan id unik, reset, dan render.
  const nama = namaInput.value.trim();
  const prodi = prodiInput.value;
  const calon = {
    nama: nama,
    prodi: prodi
  };
  const hasil = validasiPeserta(calon);
  namaInput.setAttribute('aria-invalid', String(hasil.errorNama !== ''));
  prodiInput.setAttribute('aria-invalid', String(hasil.errorProdi !== ''));
  errorNama.textContent = hasil.errorNama;
  errorProdi.textContent = hasil.errorProdi;
  if (!hasil.valid) {
    return;
  }
  const pesertaBaru = {
    id: peserta.length > 0
      ? Math.max(...peserta.map(item => item.id)) + 1
      : 1,
    nama: nama,
    prodi: prodi
  };
  peserta.push(pesertaBaru);
  form.reset();
  namaInput.setAttribute('aria-invalid', 'false');
  prodiInput.setAttribute('aria-invalid', 'false');
  errorNama.textContent = '';
  errorProdi.textContent = '';
  renderPeserta(peserta);
});
filterInput.addEventListener('change', () => {
  // TODO: jika 'semua' gunakan seluruh peserta; selain itu filter.
  if (filterInput.value === 'semua') {
    renderPeserta(peserta);
    return;
  }
  const hasilFilter = peserta.filter((item) => {
    return item.prodi === filterInput.value;
  });
  renderPeserta(hasilFilter);
});
renderPeserta(peserta);