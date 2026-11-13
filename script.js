/* =========================================================
   JAVASCRIPT - KAFE OKSIGEN CIREBON
   Mengelola 3 Filter Interaktif:
   1. Filter Pencarian Nama (Input Text)
   2. Filter Kategori (Tombol Kategori)
   3. Filter Batas Harga Maksimal (Range Slider)
   ========================================================= */

// 1. Data Menu Kafe Oksigen Cirebon
const daftarMenu = [
  {
    id: 1,
    nama: "Kopi Susu Oksigen",
    kategori: "kopi",
    harga: 18000,
    deskripsi: "Menu andalan! Perpaduan espresso robusta lokal, susu segar, dan manisnya gula aren asli.",
    gambar: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    nama: "Americano Ice Ciremai",
    kategori: "kopi",
    harga: 16000,
    deskripsi: "Espresso dingin tanpa gula dari biji kopi lereng Gunung Ciremai dengan rasa segar buah.",
    gambar: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    nama: "Kopi Tubruk Robusta",
    kategori: "kopi",
    harga: 12000,
    deskripsi: "Seduhan kopi hitam klasik tradisional, beraroma pekat dan pas untuk teman ngobrol santai.",
    gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    nama: "Matcha Latte Dingin",
    kategori: "non-kopi",
    harga: 20000,
    deskripsi: "Minuman bubuk teh hijau Jepang dipadukan susu creamy segar yang lembut dan manis seimbang.",
    gambar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    nama: "Es Teh Lemon Mint",
    kategori: "non-kopi",
    harga: 14000,
    deskripsi: "Teh melati wangi dengan perasan lemon segar dan daun mint asli, pereda dahaga siang hari.",
    gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    nama: "Cokelat Susu Hangat",
    kategori: "non-kopi",
    harga: 18000,
    deskripsi: "Cokelat bubuk pekat diseduh susu murni hangat, pas dinikmati saat malam sejuk di kafe.",
    gambar: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    nama: "Cireng Bumbu Rujak Cirebon",
    kategori: "camilan",
    harga: 15000,
    deskripsi: "Cireng goreng renyah di luar kenyal di dalam, dicocol sambal rujak gula merah pedas manis.",
    gambar: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    nama: "Tahu Gejrot Oksigen",
    kategori: "camilan",
    harga: 14000,
    deskripsi: "Kuliner khas Cirebon! Tahu goreng kopong disiram kuah asam jawa pedas bawang cabai rawit.",
    gambar: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    nama: "Pisang Goreng Keju",
    kategori: "camilan",
    harga: 16000,
    deskripsi: "Pisang kepok manis digoreng tepung garing, ditaburi parutan keju cheddar dan susu kental.",
    gambar: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    nama: "Kentang Goreng Gurih",
    kategori: "camilan",
    harga: 15000,
    deskripsi: "French fries renyah bertabur bumbu gurih, disajikan dengan saus cabai dan tomat.",
    gambar: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 11,
    nama: "Nasi Goreng Kampung Oksigen",
    kategori: "makanan",
    harga: 25000,
    deskripsi: "Nasi goreng bumbu terasi khas Cirebon dengan suwiran ayam, telur ceplok, acar, dan kerupuk.",
    gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    nama: "Mie Rebus Telur Sayur",
    kategori: "makanan",
    harga: 20000,
    deskripsi: "Mie kuah gurih hangat bertabur sayuran segar, telur rebus, dan irisan cabai rawit pedas.",
    gambar: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80"
  }
];

// 2. Variabel State Filter
let teksCari = "";
let kategoriTerpilih = "all";
let hargaMaksimal = 30000;

// 3. Mengambil Elemen DOM
const inputCari = document.getElementById("inputCari");
const kategoriContainer = document.getElementById("kategoriContainer");
const tombolKategori = kategoriContainer.querySelectorAll(".btn-kat");
const sliderHarga = document.getElementById("sliderHarga");
const labelHarga = document.getElementById("labelHarga");
const menuGrid = document.getElementById("menuGrid");
const teksJumlahMenu = document.getElementById("teksJumlahMenu");
const pesanKosong = document.getElementById("pesanKosong");
const btnResetFilter = document.getElementById("btnResetFilter");
const btnResetKosong = document.getElementById("btnResetKosong");

// 4. Fungsi Format Rupiah Sederhana
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// 5. Fungsi Utama: Menyaring & Menampilkan Menu Berdasarkan 3 Filter
function terapkanFilter() {
  const query = teksCari.toLowerCase().trim();

  // Proses filter menggunakan Array.prototype.filter()
  const hasilFilter = daftarMenu.filter(function (menu) {
    // Filter 1: Cek Nama atau Deskripsi
    const cocokNama =
      query === "" ||
      menu.nama.toLowerCase().includes(query) ||
      menu.deskripsi.toLowerCase().includes(query);

    // Filter 2: Cek Kategori
    const cocokKategori =
      kategoriTerpilih === "all" || menu.kategori === kategoriTerpilih;

    // Filter 3: Cek Harga Maksimal
    const cocokHarga = menu.harga <= hargaMaksimal;

    // Semua kondisi harus terpenuhi (AND)
    return cocokNama && cocokKategori && cocokHarga;
  });

  // Tampilkan hasil ke halaman
  renderMenu(hasilFilter);
}

// 6. Fungsi Render Kartu Menu ke HTML
function renderMenu(data) {
  // Kosongkan grid terlebih dahulu
  menuGrid.innerHTML = "";

  // Jika tidak ada data yang cocok
  if (data.length === 0) {
    menuGrid.style.display = "none";
    pesanKosong.style.display = "block";
    teksJumlahMenu.textContent = "Tidak ada menu yang sesuai.";
    return;
  }

  // Jika ada data
  menuGrid.style.display = "grid";
  pesanKosong.style.display = "none";
  teksJumlahMenu.textContent = "Menampilkan " + data.length + " dari " + daftarMenu.length + " menu";

  // Loop setiap menu dan buat elemennya
  data.forEach(function (menu) {
    const card = document.createElement("div");
    card.className = "menu-item";

    card.innerHTML = `
      <div class="menu-img-wrap">
        <img src="${menu.gambar}" alt="${menu.nama}" loading="lazy">
        <span class="menu-kat-tag">${menu.kategori}</span>
      </div>
      <div class="menu-body">
        <h4>${menu.nama}</h4>
        <p class="menu-deskripsi">${menu.deskripsi}</p>
        <div class="menu-footer">
          <span class="menu-harga">${formatRupiah(menu.harga)}</span>
          <span class="menu-status">Tersedia</span>
        </div>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

// =========================================================
// 7. EVENT LISTENER UNTUK 3 FILTER INTERAKTIF
// =========================================================

// --- FILTER 1: Pencarian Kata Kunci (Input text) ---
inputCari.addEventListener("input", function (e) {
  teksCari = e.target.value;
  terapkanFilter();
});

// --- FILTER 2: Kategori Menu (Tombol Pill) ---
kategoriContainer.addEventListener("click", function (e) {
  const tombol = e.target.closest(".btn-kat");
  if (!tombol) return;

  // Ubah status tombol aktif
  tombolKategori.forEach(function (btn) {
    btn.classList.remove("active");
  });
  tombol.classList.add("active");

  // Simpan kategori yang dipilih lalu filter
  kategoriTerpilih = tombol.getAttribute("data-kat");
  terapkanFilter();
});

// --- FILTER 3: Batas Harga Maksimal (Range Slider) ---
sliderHarga.addEventListener("input", function (e) {
  hargaMaksimal = parseInt(e.target.value, 10);
  labelHarga.textContent = formatRupiah(hargaMaksimal);
  terapkanFilter();
});

// --- FUNGSI RESET FILTER ---
function resetSemuaFilter() {
  teksCari = "";
  kategoriTerpilih = "all";
  hargaMaksimal = 30000;

  // Kembalikan form ke nilai awal
  inputCari.value = "";
  sliderHarga.value = 30000;
  labelHarga.textContent = formatRupiah(30000);

  // Setel ulang tombol kategori ke "Semua"
  tombolKategori.forEach(function (btn) {
    if (btn.getAttribute("data-kat") === "all") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  terapkanFilter();
}

btnResetFilter.addEventListener("click", resetSemuaFilter);
btnResetKosong.addEventListener("click", resetSemuaFilter);

// Inisialisasi awal saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  terapkanFilter();
});

