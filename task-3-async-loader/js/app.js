'use strict';
const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');
function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}
async function ambilMateri() {
  // TODO: fetch data/materi.json.
  const response = await fetch('data/materi.json');
  // TODO: jika response.ok false, throw Error yang informatif.
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  // TODO: return hasil response.json().
  return response.json();
}
function renderMateri(data) {
  // TODO: kosongkan daftar dan buat kartu dengan createElement.
  daftar.replaceChildren();
  data.forEach((item) => {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.textContent = item.judul;
    p.textContent = `Durasi: ${item.durasi} menit`;
    article.append(h2, p);
    daftar.append(article);
  });
}
async function muatData() {
  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren();
  try {
    // TODO: await ambilMateri().
    const data = await ambilMateri();
    // TODO: bedakan array kosong dan data berisi.
    if (data.length === 0) {
      aturState('empty', 'Tidak ada materi.');
      return;
    }
    renderMateri(data);
    aturState('success', `${data.length} materi tampil.`);
  } catch (error) {
    console.error(error);
    // TODO: tampilkan state error dan pesan yang dapat dipahami.
    aturState('error', 'Gagal memuat materi. Silakan coba lagi.');
  } finally {
    // TODO: aktifkan kembali tombol Muat data.
    tombolMuat.disabled = false;
  }
}
tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);