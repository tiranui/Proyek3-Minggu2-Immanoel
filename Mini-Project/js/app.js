'use strict';

const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');
const themeToggle = document.querySelector('#theme-toggle');
const daftarMateri = document.querySelector('#daftar-materi');
const filterMateri = document.querySelector('#filter-materi');
const statusMateri = document.querySelector('#status-materi');
const faqQuestions = document.querySelectorAll('.faq-question');
const formKontak = document.querySelector('#form-kontak');
const namaInput = document.querySelector('#nama');
const emailInput = document.querySelector('#email');
const pesanInput = document.querySelector('#pesan');
const errorNama = document.querySelector('#error-nama');
const errorEmail = document.querySelector('#error-email');
const errorPesan = document.querySelector('#error-pesan');
const pesanBerhasil = document.querySelector('#pesan-berhasil');
const backToTop = document.querySelector('#back-to-top');

const materi = [
    {
        judul: 'Dasar Sketsa',
        kategori: 'dasar',
        deskripsi: 'Belajar membuat bentuk dasar dan garis untuk memulai menggambar.'
    },
    {
        judul: 'Dasar Pewarnaan',
        kategori: 'dasar',
        deskripsi: 'Mengenal warna dan cara menggunakannya dalam gambar.'
    },
    {
        judul: 'Shadowing',
        kategori: 'lanjutan',
        deskripsi: 'Belajar membuat bayangan agar gambar terlihat lebih berdimensi.'
    }
];

function bukaMenu() {
    const terbuka = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(terbuka));
}
    
function ubahTema() {
    const aktif = document.body.classList.toggle('dark');
    themeToggle.setAttribute('aria-pressed', String(aktif));

    if (aktif) {
        themeToggle.textContent = 'Tema Terang';
    } else {
        themeToggle.textContent = 'Tema Gelap';
    }
}

function buatKartuMateri(item) {
    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    const kategori = document.createElement('p');
    const deskripsi = document.createElement('p');

    h3.textContent = item.judul;
    kategori.textContent = `Kategori: ${item.kategori}`;
    deskripsi.textContent = item.deskripsi;

    article.classList.add('card');
    article.append(h3, kategori, deskripsi);

    return article;
}

function renderMateri(data) {
    daftarMateri.replaceChildren();

    if (data.length === 0) {
        statusMateri.textContent = 'Materi tidak ditemukan.';
        return;
    }

    data.forEach((item) => {
        const kartu = buatKartuMateri(item);
        daftarMateri.append(kartu);
    });

    statusMateri.textContent = `${data.length} materi tampil.`;
}

function filterDaftarMateri() {
    const nilaiFilter = filterMateri.value;

    if (nilaiFilter === 'semua') {
        renderMateri(materi);
        return;
    }

    const hasilFilter = materi.filter((item) => {
        return item.kategori === nilaiFilter;
    });

    renderMateri(hasilFilter);
}

function toggleFaq(event) {
    const tombol = event.currentTarget;
    const jawaban = tombol.nextElementSibling;
    const sedangTerbuka = tombol.getAttribute('aria-expanded') === 'true';

    tombol.setAttribute('aria-expanded', String(!sedangTerbuka));
    jawaban.hidden = sedangTerbuka;
}

function validasiKontak() {
    let valid = true;

    errorNama.textContent = '';
    errorEmail.textContent = '';
    errorPesan.textContent = '';
    pesanBerhasil.textContent = '';

    if (namaInput.value.trim().length < 3) {
        errorNama.textContent = 'Nama minimal 3 karakter.';
        valid = false;
    }

    if (!emailInput.validity.valid) {
        errorEmail.textContent = 'Masukkan email yang valid.';
        valid = false;
    }

    if (pesanInput.value.trim().length < 10) {
        errorPesan.textContent = 'Pesan minimal 10 karakter.';
        valid = false;
    }

    namaInput.setAttribute('aria-invalid', String(errorNama.textContent !== ''));
    emailInput.setAttribute('aria-invalid', String(errorEmail.textContent !== ''));
    pesanInput.setAttribute('aria-invalid', String(errorPesan.textContent !== ''));

    return valid;
}

function kirimForm(event) {
    event.preventDefault();

    if (!validasiKontak()) {
        return;
    }

    pesanBerhasil.textContent = 'Pesan berhasil dikirim.';
    formKontak.reset();

    namaInput.setAttribute('aria-invalid', 'false');
    emailInput.setAttribute('aria-invalid', 'false');
    pesanInput.setAttribute('aria-invalid', 'false');
}

function tampilkanTombolAtas() {
    backToTop.hidden = window.scrollY < 300;
}

function kembaliKeAtas() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

menuToggle.addEventListener('click', bukaMenu);
themeToggle.addEventListener('click', ubahTema);
filterMateri.addEventListener('change', filterDaftarMateri);

faqQuestions.forEach((question) => {
    question.addEventListener('click', toggleFaq);
});

formKontak.addEventListener('submit', kirimForm);
window.addEventListener('scroll', tampilkanTombolAtas);
backToTop.addEventListener('click', kembaliKeAtas);

renderMateri(materi);