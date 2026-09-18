'use strict';
const status = document.querySelector('#status');
const cobaLagi = document.querySelector('#coba-lagi');
const tombolTema = document.querySelector('#tema');
const nama = document.querySelector('#nama');
const jabatan = document.querySelector('#jabatan');
const deskripsi = document.querySelector('#deskripsi');
const email = document.querySelector('#email');
const tombolDetail = document.querySelector('#detail');
const detailProfil = document.querySelector('#detail-profil');
const formKeterampilan = document.querySelector('#form-keterampilan');
const inputKeterampilan = document.querySelector('#keterampilan');
const errorKeterampilan = document.querySelector('#error-keterampilan');
const daftarKeterampilan = document.querySelector('#daftar-keterampilan');
let profil = null;
function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
    cobaLagi.hidden = state !== 'error';
}
async function ambilProfil() {
    const response = await fetch('data/profile.json');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}
function renderProfil(data) {
    nama.textContent = data.nama;
    jabatan.textContent = data.jabatan;
    deskripsi.textContent = data.deskripsi;
    email.textContent = data.email;
    renderKeterampilan(data.keterampilan);
}
function renderKeterampilan(data) {
    daftarKeterampilan.replaceChildren();
    data.forEach((skill, index) => {
        const item = document.createElement('li');
        const teks = document.createElement('span');
        teks.textContent = skill;
        const tombolHapus = document.createElement('button');
        tombolHapus.textContent = 'Hapus';
        tombolHapus.addEventListener('click', () => {
            hapusKeterampilan(index);
        });
        item.append(teks, tombolHapus);
        daftarKeterampilan.appendChild(item);
    });
}
async function muatProfil() {
    aturState('loading', 'Memuat profil...');
    cobaLagi.disabled = true;
    try {
        const data = await ambilProfil();
        if (!Array.isArray(data.keterampilan)) {
            throw new Error('Data keterampilan tidak valid');
        }
        profil = data;
        renderProfil(profil);
        if (profil.keterampilan.length === 0) {
            aturState('empty', 'Belum ada keterampilan.');
        } else {
            aturState('success', 'Profil berhasil dimuat.');
        }
    } catch (error) {
        console.error(error);
        aturState('error', 'Gagal memuat profil. Silakan coba lagi.');
    } finally {
        cobaLagi.disabled = false;
    }
}
tombolDetail.addEventListener('click', () => {
    const terbuka = tombolDetail.getAttribute('aria-expanded') === 'true';
    tombolDetail.setAttribute('aria-expanded', String(!terbuka));
    detailProfil.hidden = terbuka;
    tombolDetail.textContent = terbuka ? 'Tampilkan Detail' : 'Sembunyikan Detail';
});
tombolTema.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
formKeterampilan.addEventListener('submit', (event) => {
    event.preventDefault();
    const skill = inputKeterampilan.value.trim();
    errorKeterampilan.textContent = '';
    if (skill === '') {
        errorKeterampilan.textContent = 'Keterampilan tidak boleh kosong.';
        return;
    }
    profil.keterampilan.push(skill);
    renderKeterampilan(profil.keterampilan);
    inputKeterampilan.value = '';
    aturState('success', 'Keterampilan berhasil ditambahkan.');
});
function hapusKeterampilan(index) {
    profil.keterampilan.splice(index, 1);
    renderKeterampilan(profil.keterampilan);
    if (profil.keterampilan.length === 0) {
        aturState('empty', 'Belum ada keterampilan.');
    } else {
        aturState('success', 'Keterampilan berhasil dihapus.');
    }
}
cobaLagi.addEventListener('click', muatProfil);
muatProfil();