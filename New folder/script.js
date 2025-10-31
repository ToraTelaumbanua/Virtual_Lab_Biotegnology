// === STATE MANAGEMENT ===
let currentModule = ""; // 'kultur', 'bioplastik', 'bioremediasi'
let currentTab = "materi"; // 'materi', 'prosedur', 'simulator'
let kulturSimStep = 0; // Melacak progres simulator kultur
let bioplastikSimStep = 0; // Melacak progres simulator bioplastik

// === DATABASE KONTEN ===
// Semua teks dari PDF disimpan di sini
const contentStore = {
  kultur: {
    title: "Kultur Jaringan",
    materi: `
                      <h2>Pengertian Kultur Jaringan</h2>
                      <p>Kultur jaringan adalah suatu metode mengisolasi bagian tanaman seperti sekelompok sel atau jaringan (daun, akar, batang, tunas, dan sebagainya) serta membudidayakan dalam lingkungan yang terkendali secara in-vitro dan aseptik sehingga bagian tanaman tersebut dapat beregenerasi menjadi tanaman lengkap.</p>
                      <p>Dasar dari kultur jaringan adalah totipotensi, yang berarti kemampuan total suatu sel tumbuhan untuk dapat meregenerasi dirinya menjadi individu tanaman utuh jika ditempatkan pada media dan kondisi yang tepat.</p>
                      
                      <h3>Syarat Utama Kultur Jaringan</h3>
                      <p>Kultur jaringan memerlukan kondisi aseptik (bebas kontaminasi), media yang mengandung nutrisi lengkap seperti gula, mineral, vitamin, serta hormon tumbuh, dan ruang tumbuh dengan cahaya dan suhu yang terkontrol.</p>
                      
                      <h3>Media Kultur</h3>
                      <p>Media kultur merupakan faktor utama dalam keberhasilan kultur jaringan. Komponen penting media kultur:</p>
                      <ul>
                          <li><b>Air:</b> pelarut semua zat.</li>
                          <li><b>Garam mineral:</b> unsur hara makro (N, P, K, Ca, Mg) dan mikro (Fe, Zn, Mn, B).</li>
                          <li><b>Sumber Karbon:</b> sukrosa atau glukosa sebagai energi.</li>
                          <li><b>Vitamin:</b> misalnya B1, asam nikotinat, piridoksin.</li>
                          <li><b>Zat Pengatur Tumbuh:</b> Auksin (Pert. Akar) & Sitokinin (Pert. Tunas).</li>
                          <li><b>Pemadat:</b> (Contoh: Agar-agar).</li>
                      </ul>

                      <h3>Tahapan Proses</h3>
                      <ol>
                          <li><b>Inisiasi:</b> eksplan diambil dari bagian tanaman sehat lalu disterilkan.</li>
                          <li><b>Multiplikasi:</b> eksplan mulai membentuk banyak tunas.</li>
                          <li><b>Elongasi / Shooting:</b> tunas yang terbentuk diperpanjang pertumbuhannya.</li>
                          <li><b>Perakaran:</b> hormon auksin ditambahkan untuk merangsang akar.</li>
                          <li><b>Aklimatisasi:</b> tanaman hasil kultur dipindahkan ke lingkungan luar.</li>
                      </ol>

                      <h3>Keuntungan & Kekurangan</h3>
                      <p><b>Keuntungan:</b> Mampu menghasilkan bibit dalam jumlah sangat banyak dalam waktu singkat, bibit seragam secara genetik, bebas hama penyakit, dan dapat dilakukan sepanjang tahun.</p>
                      <p><b>Kekurangan:</b> (Teks kekurangan di PDF sama dengan keuntungan, ini mungkin error di PDF. Saya akan isi dengan kekurangan umum) Biaya awal yang tinggi, memerlukan keahlian khusus, dan risiko kontaminasi yang tinggi jika tidak aseptik.</p>
                  `,
    prosedur: `
                      <h2>Alat</h2>
                      <ul>
                          <li>Botol kultur</li>
                          <li>Erlenmeyer</li>
                          <li>Pipet</li>
                          <li>Gelas piala</li>
                          <li>Autoklaf</li>
                          <li>Cawan petridish</li>
                          <li>Gelas ukur</li>
                          <li>Alumunium foil</li>
                          <li>pH meter</li>
                          <li>Gunting, Pisau (skalpel), Pinset</li>
                          <li>Bunsen (Lampu Spiritus)</li>
                          <li>Laminar Air Flow (LAF)</li>
                      </ul>

                      <h2>Bahan</h2>
                      <ul>
                          <li>Eksplan (bagian tanaman, misal: daun)</li>
                          <li>Media Kultur (misal: Murashige & Skoog)</li>
                          <li>Agar</li>
                          <li>Aquades</li>
                          <li>Makronutrien & Mikronutrien</li>
                          <li>Glukosa / Sukrosa</li>
                          <li>Vitamin (B1, B6, dll)</li>
                          <li>Zat Pengatur Tumbuh (Auksin, Sitokinin)</li>
                          <li>Alkohol 70%</li>
                      </ul>

                      <h2>Prosedur Kerja (Inokulasi)</h2>
                      <ol>
                          <li>Siapkan alat dan bahan yang akan digunakan.</li>
                          <li>Sterilisasi alat: Masukkan botol kultur dan alat logam ke autoklaf.</li>
                          <li>Persiapan media: Siapkan media agar-agar dalam botol kultur (sudah disterilkan).</li>
                          <li>Persiapan eksplan: Potong jaringan tanaman, cuci, dan sterilkan (misal dengan alkohol/pemutih).</li>
                          <li><b>Inokulasi (dilakukan di dalam LAF):</b></li>
                          <li>Sterilkan alat (pinset, skalpel) dengan alkohol dan api bunsen.</li>
                          <li>Ambil eksplan (potongan daun) dengan pinset.</li>
                          <li>Panaskan bibir botol kultur yang berisi media.</li>
                          <li>Masukkan eksplan ke media agar.</li>
                          <li>Tutup rapat botol kultur.</li>
                          <li>Penyimpanan: Simpan botol kultur dalam ruang kultur dengan suhu dan cahaya terkontrol.</li>
                      </ol>
                  `,
  },
  bioplastik: {
    title: "Bioplastik",
    materi: `
                      <h2>Pengertian Bioplastik</h2>
                      <p>Bioplastik atau yang sering disebut plastik biodegradabel, merupakan salah satu jenis plastik yang hampir keseluruhannya terbuat dari bahan yang dapat diperbarui, seperti pati, minyak nabati, dan mikrobiota.</p>
                      
                      <h3>Jenis Bioplastik</h3>
                      <ul>
                          <li><b>Berbasis Pati (Starch-Based):</b> Dibuat dari jagung, singkong, atau kentang. Mudah terurai.</li>
                          <li><b>Berbasis Asam Polilaktat (PLA):</b> Hasil fermentasi gula tanaman. Bening dan ringan.</li>
                          <li><b>Berbasis PHA (Polyhydroxyalkanoates):</b> Diproduksi oleh bakteri, sangat biodegradable.</li>
                      </ul>

                      <h3>Komponen Bioplastik</h3>
                      <ol>
                          <li><b>Hidrokoloid:</b> Protein (kasein, kedelai) dan karbohidrat (pati, gum, pektin).</li>
                          <li><b>Lipida:</b> Wax, asam lemak, monogliserida. Berfungsi sebagai penghambat uap air.</li>
                          <li><b>Komposit:</b> Gabungan hidrokoloid dan lipida.</li>
                      </ol>

                      <h3>Keuntungan & Kekurangan</h3>
                      <p><b>Keuntungan:</b> Sumber bahan baku terbarukan, biodegradabilitas (dapat terurai), pengurangan emisi karbon.</p>
                      <p><b>Kekurangan:</b> (PDF tidak menyebutkan secara spesifik) Dapat bersaing dengan sumber pangan, memerlukan kondisi khusus untuk terurai, terkadang kekuatan mekaniknya lebih rendah dari plastik konvensional.</p>
                  `,
    prosedur: `
                      <h2>Alat</h2>
                      <ul>
                          <li>Neraca (Timbangan)</li>
                          <li>Kompor listrik / pemanas</li>
                          <li>Gelas ukur</li>
                          <li>Gelas piala / kimia</li>
                          <li>Pipet tetes</li>
                          <li>Spatula / Pengaduk</li>
                          <li>Aluminium foil atau kertas roti</li>
                      </ul>

                      <h2>Bahan</h2>
                      <ul>
                          <li>Aquades (Air)</li>
                          <li>Gliserol</li>
                          <li>Tepung maizena (Pati jagung)</li>
                          <li>Asam asetat 5% (Cuka)</li>
                          <li>Pewarna makanan (Opsional)</li>
                      </ul>

                      <h2>Prosedur Kerja</h2>
                      <ol>
                          <li>Timbang tepung maizena (misal: 4,5 gr) dan gliserol (misal: 2 gr), masukkan ke gelas piala.</li>
                          <li>Tambahkan aquades (misal: 60 ml) dan aduk sampai larut.</li>
                          <li>Tambahkan asam asetat 5% (misal: 3 ml) dan 2-3 tetes pewarna makanan.</li>
                          <li>Letakkan gelas piala di atas pemanas listrik. Aduk terus sampai campuran memanas dan tergelatinisasi (menjadi bening dan mengental). Aduk selama 10 menit.</li>
                          <li>Angkat campuran dari pemanas.</li>
                          <li>Tuang campuran ke atas aluminium foil atau kertas roti.</li>
                          <li>Ratakan campuran yang masih panas.</li>
                          <li>Biarkan plastik mengering setidaknya 2 hari di tempat teduh dan kering.</li>
                          <li>Lepaskan plastik dari alasnya secara perlahan.</li>
                      </ol>
                  `,
  },
  bioremediasi: {
    title: "Bioremediasi",
    materi: `
                      <h2>Pengertian Bioremediasi</h2>
                      <p>Bioremediasi adalah proses pemanfaatan mikroorganisme (seperti bakteri, jamur, atau alga) untuk menguraikan, menetralkan, atau menghilangkan zat pencemar di lingkungan, baik di tanah, air, maupun udara.</p>
                      
                      <h3>Faktor yang Mempengaruhi</h3>
                      <ul>
                          <li><b>Suhu:</b> Umumnya efektif pada 25-35°C.</li>
                          <li><b>pH:</b> Mikroba tumbuh optimal pada pH netral (6-8).</li>
                          <li><b>Oksigen (O2):</b> Dibutuhkan untuk dekomposisi aerobik.</li>
                          <li><b>Nutrien:</b> Ketersediaan N, P, K, dll.</li>
                      </ul>

                      <h3>Jenis-Jenis Bioremediasi</h3>
                      <ul>
                          <li><b>In-situ:</b> Dilakukan langsung di lokasi tercemar tanpa memindahkan material.</li>
                          <li><b>Ex-situ:</b> Material tercemar dipindahkan ke reaktor atau kolam khusus untuk diolah.</li>
                      </ul>

                      <h3>Mikroorganisme yang Digunakan</h3>
                      <ul>
                          <li><b>Pseudomonas sp.:</b> Mengurai minyak bumi & hidrokarbon.</li>
                          <li><b>Bacillus sp.:</b> Mengurai limbah organik & pestisida.</li>
                          <li><b>Cupriavidus sp.:</b> Mengurai logam berat (Pb, Cd, Hg).</li>
                          <li><b>Aspergillus niger (Jamur):</b> Mengurai limbah industri.</li>
                      </ul>
                      
                      <h3>Kelebihan & Keterbatasan</h3>
                      <p><b>Kelebihan:</b> Ramah lingkungan, biaya rendah, dapat diterapkan langsung di lokasi.</p>
                      <p><b>Keterbatasan:</b> Proses relatif lambat, tidak semua polutan bisa diurai, tergantung kondisi lingkungan.</p>
                  `,
    prosedur: `
                      <h2>Alat</h2>
                      <ul>
                          <li>Erlenmeyer</li>
                          <li>Pipet tetes</li>
                          <li>Cawan petridish</li>
                          <li>Gelas ukur</li>
                          <li>Alumunium foil / Kertas pembungkus</li>
                          <li>Bunsen (Lampu Spiritus)</li>
                          <li>Pinset</li>
                          <li>Jarum Ose</li>
                          <li>Inkubator</li>
                      </ul>

                      <h2>Bahan</h2>
                      <ul>
                          <li>Kertas Saring Steril</li>
                          <li>Aquades Steril</li>
                          <li>Alkohol 70%</li>
                          <li>Limbah minyak / oli</li>
                          <li>Suspensi bakteri / Isolat (kultur murni)</li>
                      </ul>

                      <h2>Prosedur Kerja (Uji Degradasi)</h2>
                      <ol>
                          <li>Siapkan alat dan bahan.</li>
                          <li>Tuangkan aquades steril (misal: 30 ml) ke dalam cawan petri.</li>
                          <li>Tuangkan limbah minyak (misal: 10 ml) ke dalam cawan petri yang berisi aquades.</li>
                          <li>Ambil Jarum ose dan sterilkan di atas api bunsen, lalu dinginkan.</li>
                          <li>Ambil 1 ose bakteri dari suspensi/isolat.</li>
                          <li>Ambil kertas saring steril dengan pinset (yang sudah disterilkan).</li>
                          <li>Oleskan bakteri dari jarum ose ke permukaan kertas saring.</li>
                          <li>Masukkan kertas saring yang sudah tersuspensi bakteri ke dalam cawan petri berisi limbah minyak.</li>
                          <li>Bungkus cawan petri dan berikan label.</li>
                          <li>Masukkan ke dalam inkubator pada suhu dan waktu tertentu (misal: 30°C selama 7 hari) untuk mengembangbiakkan bakteri dan melihat proses degradasi minyak.</li>
                      </ol>
                  `,
  },
};

// === FUNGSI NAVIGASI ===

// Menampilkan halaman utama
function showHome() {
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("lab-module").classList.add("hidden");
}

// Menampilkan modul yang dipilih
function showModule(moduleName) {
  currentModule = moduleName;
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("lab-module").classList.remove("hidden");

  // Set judul lab
  document.getElementById("lab-title").innerText =
    contentStore[moduleName].title;

  // Reset ke tab materi
  showTab("materi");
}

// Menampilkan tab konten (Materi, Prosedur, Simulator)
function showTab(tabName) {
  currentTab = tabName;

  // Sembunyikan semua konten
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.add("hidden"));
  // Reset semua tombol tab
  document
    .querySelectorAll(".tab-button")
    .forEach((el) => el.classList.remove("active"));

  // Tampilkan konten yang dipilih
  document.getElementById(`content-${tabName}`).classList.remove("hidden");
  // Aktifkan tombol tab yang dipilih
  document.getElementById(`tab-btn-${tabName}`).classList.add("active");

  const contentDiv = document.getElementById(`content-${tabName}`);

  // Muat konten berdasarkan modul dan tab
  if (tabName === "materi") {
    contentDiv.innerHTML = contentStore[currentModule].materi;
  } else if (tabName === "prosedur") {
    contentDiv.innerHTML = contentStore[currentModule].prosedur;
  } else if (tabName === "simulator") {
    initSimulator(currentModule);
  }
}

// === FUNGSI SIMULATOR ===

// --- 1. SIMULATOR KULTUR JARINGAN ---

// Data langkah-langkah untuk simulator Kultur Jaringan
// Ini adalah versi sederhana dari PDF
const kulturSimSteps = [
  {
    prompt:
      "Halo! Siap untuk praktikum kultur jaringan? Pertama, mari gunakan Alat Pelindung Diri (APD). Klik item di sebelah kanan untuk mengenakannya pada karakter.",
    ui: `
                  <div class="flex flex-col md:flex-row gap-8 items-start">
                      <!-- Karakter SVG -->
                      <div class="sim-figure flex-1">
                          <svg viewBox="0 0 200 280" class="w-full max-w-[250px] h-auto" aria-label="Karakter laboran wanita">
                              <!-- Base Body -->
                              <path d="M100 110 C 60 110, 60 60, 100 60 C 140 60, 140 110, 100 110 Z" fill="#fde6d8"/> <!-- Wajah -->
                              <path d="M100 110 C 90 130, 70 140, 70 160 L 70 220 L 130 220 L 130 160 C 130 140, 110 130, 100 110 Z" fill="#e2e8f0"/> <!-- Baju -->
                              <path d="M70 160 L 60 160 L 50 210 L 60 210 L 70 160 Z" fill="#e2e8f0"/> <!-- Lengan Kiri -->
                              <path d="M130 160 L 140 160 L 150 210 L 140 210 L 130 160 Z" fill="#e2e8f0"/> <!-- Lengan Kanan -->
                              <path d="M50 210 L 50 220 L 60 220 L 60 210 Z" fill="#fde6d8"/> <!-- Tangan Kiri -->
                              <path d="M140 210 L 140 220 L 150 220 L 150 210 Z" fill="#fde6d8"/> <!-- Tangan Kanan -->
                              <ellipse cx="85" cy="85" rx="4" ry="6" fill="#4a2c2a"/> <!-- Mata Kiri -->
                              <ellipse cx="115" cy="85" rx="4" ry="6" fill="#4a2c2a"/> <!-- Mata Kanan -->
                              <path d="M90 100 C 95 105, 105 105, 110 100" stroke="#4a2c2a" fill="none" stroke-width="2"/> <!-- Mulut -->
                              <path d="M100 60 C 70 60, 60 30, 100 20 C 140 30, 130 60, 100 60" fill="#4a2c2a"/> <!-- Rambut -->

                              <!-- APD (Tersembunyi) -->
                              <path id="svg-coat" class="svg-char-component" d="M70 155 L 60 155 L 50 270 L 150 270 L 140 155 L 130 155 C 130 145, 70 145, 70 155 Z" fill="white" stroke="#94a3b8" stroke-width="2"/> <!-- Jas Lab -->
                              <path id="svg-gloves" class="svg-char-component" d="M50 210 L 50 220 L 60 220 L 60 210 Z M 140 210 L 140 220 L 150 220 L 150 210 Z" fill="#60a5fa"/> <!-- Sarung Tangan (mengganti tangan) -->
                              <path id="svg-mask" class="svg-char-component" d="M80 95 L 120 95 L 120 110 L 80 110 Z" fill="#93c5fd"/> <!-- Masker -->
                              <path id="svg-goggles" class="svg-char-component" d="M75 80 C 70 80, 65 85, 65 90 L 95 90 C 95 85, 90 80, 85 80 Z M 125 80 C 130 80, 135 85, 135 90 L 105 90 C 105 85, 110 80, 115 80 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/> <!-- Kacamata -->
                          </svg>
                      </div>
                      <div class="flex-1">
                          <p class="mb-4 text-lg">Klik item untuk menggunakannya:</p>
                          <div class="space-y-3" id="ppe-list">
                              <button data-item="mask" class="ppe-item w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">1. Masker</button>
                              <button data-item="goggles" class="ppe-item w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">2. Kacamata Google</button>
                              <button data-item="gloves" class="ppe-item w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">3. Sarung Tangan</button>
                              <button data-item="coat" class="ppe-item w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">4. Jas Lab</button>
                          </div>
                          <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" id="ppe-next" onclick="nextKulturStep()">Lanjut</button>
                      </div>
                  </div>
              `,
    setup: () => {
      let ppeDone = {
        mask: false,
        goggles: false,
        gloves: false,
        coat: false,
      };
      document.querySelectorAll(".ppe-item").forEach((btn) => {
        btn.onclick = () => {
          const item = btn.dataset.item;
          ppeDone[item] = true;
          btn.classList.add("bg-green-200", "text-green-800", "font-medium");
          btn.innerHTML = `✓ ${btn.innerText}`;
          btn.disabled = true;

          // Tampilkan komponen SVG
          const svgElement = document.getElementById(`svg-${item}`);
          if (svgElement) {
            svgElement.classList.add("visible");
          }

          // Cek apakah semua sudah
          if (Object.values(ppeDone).every(Boolean)) {
            document.getElementById("ppe-next").classList.remove("hidden");
          }
        };
      });
    },
  },
  {
    prompt:
      "Bagus! Sekarang, mari kita siapkan alat dan media. Kita perlu mensterilkan botol kultur di dalam Autoclave.",
    ui: `
                  <div class="text-center">
                      <div class="sim-figure mb-6 mx-auto">
                          <!-- SVG Autoclave -->
                          <svg viewBox="0 0 200 200" class="w-full max-w-[250px] h-auto">
                              <title>Autoclave</title>
                              <!-- Body -->
                              <rect x="40" y="50" width="120" height="130" rx="10" fill="#d1d5db"/>
                              <!-- Tutup -->
                              <rect x="30" y="40" width="140" height="20" rx="5" fill="#9ca3af"/>
                              <!-- Panel -->
                              <rect x="70" y="60" width="60" height="20" fill="#f3f4f6" rx="3"/>
                              <circle cx="100" cy="30" r="10" fill="#4b5563"/>
                              <!-- Botol di dalam (tersembunyi) -->
                              <rect id="svg-autoclave-bottle" x="80" y="90" width="40" height="60" fill="#e0f2fe" class="svg-char-component" rx="5"/>
                              <!-- Pintu (tersembunyi) -->
                              <rect id="svg-autoclave-door-open" x="30" y="60" width="10" height="120" fill="#9ca3af" class="svg-char-component" rx="3"/>
                              <!-- Api/Heat (tersembunyi) -->
                              <path id="svg-autoclave-heat" class="svg-char-component" d="M40 185 Q 60 175, 80 185 T 120 185 T 160 185" stroke="#f97316" fill="none" stroke-width="3"/>
                          </svg>
                      </div>
                      <button id="autoclave-btn" class="bg-blue-600 text-white py-3 px-8 text-lg rounded-lg font-semibold" onclick="runAutoclave()">1. Buka Autoclave</button>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" onclick="nextKulturStep()">Lanjut</button>
                  </div>
              `,
    setup: () => {
      window.runAutoclave = () => {
        const btn = document.getElementById("autoclave-btn");
        const door = document.getElementById("svg-autoclave-door-open");
        const bottle = document.getElementById("svg-autoclave-bottle");
        const heat = document.getElementById("svg-autoclave-heat");

        if (btn.innerText.includes("Buka")) {
          door.classList.add("visible");
          btn.innerText = "2. Masukkan Botol Kultur";
        } else if (btn.innerText.includes("Masukkan")) {
          bottle.classList.add("visible");
          btn.innerText = "3. Tutup dan Nyalakan Autoclave";
        } else if (btn.innerText.includes("Tutup")) {
          door.classList.remove("visible");
          heat.classList.add("visible");
          btn.innerText = "Sterilisasi Selesai!";
          btn.disabled = true;
          btn.classList.add("bg-green-600");
          document
            .querySelector(
              '#content-simulator button[onclick="nextKulturStep()"]'
            )
            .classList.remove("hidden");
        }
      };
    },
  },
  {
    prompt:
      "Sekarang kita bekerja di Laminar Air Flow (LAF) yang steril. Nyalakan lampu UV dulu (simulasi).",
    ui: `
                  <div class="text-center">
                      <div class="sim-figure mb-6 mx-auto">
                          <!-- SVG LAF -->
                          <svg viewBox="0 0 300 250" class="w-full max-w-[400px] h-auto">
                              <title>Laminar Air Flow</title>
                              <!-- Box -->
                              <path d="M20 20 L 280 20 L 280 230 L 20 230 Z" fill="#f3f4f6" stroke="#9ca3af" stroke-width="2"/>
                              <!-- Kaca Depan -->
                              <path d="M20 20 L 280 20 L 280 150 L 20 150 Z" fill="#e0f2fe" opacity="0.6"/>
                              <!-- Meja Kerja -->
                              <rect x="20" y="150" width="260" height="80" fill="#e5e7eb"/>
                              <!-- Lampu UV (tersembunyi) -->
                              <rect id="svg-laf-uv" x="50" y="30" width="200" height="15" fill="#a855f7" class="svg-char-component" rx="5"/>
                              <!-- Bunsen (tersembunyi) -->
                              <g id="svg-laf-bunsen" class="svg-char-component">
                                  <rect x="140" y="130" width="20" height="20" fill="#f59e0b"/>
                                  <path d="M150 130 Q 145 110, 150 90 T 150 130" fill="#f97316"/>
                              </g>
                          </svg>
                      </div>
                      <p class="mb-4 text-lg" id="laf-status">LAF Mati. Sterilkan area kerja.</p>
                      <button id="laf-btn-uv" class="bg-purple-600 text-white py-2 px-6 rounded-lg font-semibold" onclick="runLAF('uv')">Nyalakan Lampu UV</button>
                      <button id="laf-btn-flow" class="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold ml-4 hidden" onclick="runLAF('flow')">Nyalakan Aliran Udara & Bunsen</button>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" onclick="nextKulturStep()">Lanjut ke Inokulasi</button>
                  </div>
              `,
    setup: () => {
      window.runLAF = (type) => {
        const uv = document.getElementById("svg-laf-uv");
        const bunsen = document.getElementById("svg-laf-bunsen");

        if (type === "uv") {
          uv.classList.add("visible");
          document.getElementById("laf-status").innerText =
            "Lampu UV menyala... (Tunggu 30 menit...)";
          document.getElementById("laf-btn-uv").disabled = true;
          setTimeout(() => {
            uv.classList.remove("visible");
            document.getElementById("laf-status").innerText =
              "Sterilisasi UV Selesai. Matikan UV dan nyalakan aliran udara.";
            document.getElementById("laf-btn-uv").classList.add("hidden");
            document.getElementById("laf-btn-flow").classList.remove("hidden");
          }, 1500); // Simulasi tunggu
        } else if (type === "flow") {
          bunsen.classList.add("visible");
          document.getElementById("laf-status").innerText =
            "LAF siap untuk inokulasi. Api bunsen menyala.";
          document.getElementById("laf-btn-flow").disabled = true;
          document.getElementById("laf-btn-flow").classList.add("bg-green-600");
          document
            .querySelector(
              '#content-simulator button[onclick="nextKulturStep()"]'
            )
            .classList.remove("hidden");
        }
      };
    },
  },
  {
    prompt:
      "Waktunya Inokulasi! Sterilkan pinset & skalpel di api bunsen, ambil eksplan (daun), dan masukkan ke botol media.",
    ui: `
                  <div class="text-center">
                       <div class="sim-figure mb-6 mx-auto">
                           <!-- SVG Inokulasi -->
                           <svg viewBox="0 0 300 200" class="w-full max-w-[400px] h-auto">
                               <title>Proses Inokulasi</title>
                               <!-- Bunsen -->
                               <g id="svg-inok-bunsen">
                                   <rect x="20" y="130" width="20" height="20" fill="#f59e0b"/>
                                   <path d="M30 130 Q 25 110, 30 90 T 30 130" fill="#f97316"/>
                               </g>
                               <!-- Petri Dish (Eksplan) -->
                               <g id="svg-inok-petri">
                                   <ellipse cx="100" cy="150" rx="40" ry="15" fill="#e0f2fe"/>
                                   <ellipse cx="100" cy="148" rx="40" ry="15" fill="none" stroke="#0284c7" stroke-width="1"/>
                                   <path d="M90 148 L 95 145 L 100 149" fill="#166534"/> <!-- Eksplan -->
                               </g>
                               <!-- Botol Media -->
                               <g id="svg-inok-bottle">
                                   <rect x="180" y="100" width="50" height="50" fill="#f0f9ff" rx="5"/>
                                   <rect x="190" y="80" width="30" height="20" fill="#f0f9ff"/>
                                   <rect x="180" y="130" width="50" height="20" fill="#a3e635" opacity="0.7"/> <!-- Media -->
                               </g>
                               <!-- Pinset (tersembunyi) -->
                               <g id="svg-inok-pinset" class="svg-char-component">
                                   <line x1="40" y1="100" x2="100" y2="140" stroke="#71717a" stroke-width="3"/>
                                   <line x1="45" y1="100" x2="100" y2="145" stroke="#71717a" stroke-width="3"/>
                               </g>
                               <!-- Eksplan di pinset (tersembunyi) -->
                               <path id="svg-inok-eksplan" class="svg-char-component" d="M90 148 L 95 145 L 100 149" fill="#166534" transform="translate(-50, -45)"/>
                           </svg>
                       </div>
                      <p class="mb-4 text-lg" id="inokulasi-status">Siap memulai.</p>
                      <div class="flex flex-wrap justify-center gap-2">
                          <button class="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold" onclick="runInokulasi('alat')">1. Sterilkan Alat</button>
                          <button class="bg-gray-400 text-white py-2 px-6 rounded-lg font-semibold" disabled onclick="runInokulasi('eksplan')">2. Ambil Eksplan</button>
                          <button class="bg-gray-400 text-white py-2 px-6 rounded-lg font-semibold" disabled onclick="runInokulasi('tanam')">3. Masukkan ke Media</button>
                      </div>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" onclick="nextKulturStep()">Selesai</button>
                  </div>
              `,
    setup: () => {
      window.runInokulasi = (step) => {
        const status = document.getElementById("inokulasi-status");
        const buttons = document.querySelectorAll(
          '#content-simulator button[onclick^="runInokulasi"]'
        );
        const pinset = document.getElementById("svg-inok-pinset");
        const eksplan = document.getElementById("svg-inok-eksplan");

        if (step === "alat") {
          status.innerText = "Pinset disterilkan di atas api bunsen...";
          pinset.classList.add("visible");
          // Simulasi gerakan ke api
          pinset.style.transform = "translate(-10px, -10px)";
          setTimeout(() => {
            pinset.style.transform = "none";
          }, 500);

          buttons[0].disabled = true;
          buttons[0].classList.add("bg-green-600");
          buttons[1].disabled = false;
          buttons[1].classList.remove("bg-gray-400");
          buttons[1].classList.add("bg-blue-600");
        } else if (step === "eksplan") {
          status.innerText = "Eksplan (daun) diambil dengan pinset steril...";
          eksplan.classList.add("visible"); // Tampilkan eksplan menempel di pinset (pinset sudah visible)
          document.getElementById("svg-inok-petri").style.opacity = "0.5"; // Tanda sudah diambil

          buttons[1].disabled = true;
          buttons[1].classList.add("bg-green-600");
          buttons[2].disabled = false;
          buttons[2].classList.remove("bg-gray-400");
          buttons[2].classList.add("bg-blue-600");
        } else if (step === "tanam") {
          status.innerText =
            "Eksplan dimasukkan ke botol media. Botol ditutup.";
          // Pindahkan pinset & eksplan ke botol
          pinset.style.transform = "translate(110px, -40px)";
          eksplan.style.transform = "translate(60px, -85px)"; // Sesuaikan posisi

          setTimeout(() => {
            // Sembunyikan eksplan (ceritanya sudah di dalam)
            eksplan.classList.remove("visible");
            // Tanamannya tumbuh sedikit di botol
            const bottle = document.getElementById("svg-inok-bottle");
            bottle.innerHTML +=
              '<path d="M205 130 L 200 120 L 205 110" stroke="#16a34a" stroke-width="2" fill="none"/>';
          }, 1000);

          buttons[2].disabled = true;
          buttons[2].classList.add("bg-green-600");
          document
            .querySelector(
              '#content-simulator button[onclick="nextKulturStep()"]'
            )
            .classList.remove("hidden");
        }
      };
    },
  },
  {
    prompt:
      "Kerja bagus! Praktikum kultur jaringan selesai. Botol kultur sekarang disimpan di ruang inkubasi.",
    ui: `
                  <div class="text-center">
                      <div class="sim-figure mb-6 mx-auto">
                          <!-- SVG Selesai -->
                          <svg viewBox="0 0 200 200" class="w-full max-w-[250px] h-auto">
                              <title>Botol Kultur Tumbuh</title>
                              <rect x="70" y="80" width="60" height="70" fill="#f0f9ff" rx="5"/>
                              <rect x="80" y="60" width="40" height="20" fill="#f0f9ff"/>
                              <rect x="70" y="130" width="60" height="20" fill="#a3e635" opacity="0.7"/> <!-- Media -->
                              <!-- Tanaman Tumbuh -->
                              <path d="M100 130 Q 95 100, 100 80" stroke="#16a34a" stroke-width="3" fill="none"/>
                              <path d="M98 100 L 85 95" stroke="#16a34a" stroke-width="2" fill="none"/>
                              <path d="M102 110 L 115 105" stroke="#16a34a" stroke-width="2" fill="none"/>
                          </svg>
                      </div>
                      <h3 class="text-2xl font-bold text-green-700">Simulasi Selesai!</h3>
                      <p class="mt-4 text-lg">Anda telah menyelesaikan dasar-dasar kultur jaringan.</p>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold" onclick="initSimulator('kultur')">Ulangi Simulator</button>
                  </div>
              `,
    setup: () => {},
  },
];

// Fungsi untuk merender langkah simulator Kultur Jaringan saat ini
function renderKulturStep() {
  const simContent = document.getElementById("content-simulator");
  const stepData = kulturSimSteps[kulturSimStep];

  simContent.innerHTML = `
          <div class="mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
              <p class="font-semibold">PROMPT:</p>
              <p>${stepData.prompt}</p>
          </div>
          <div class="mt-8 p-6 border rounded-lg bg-gray-50 min-h-[300px]">
              ${stepData.ui}
          </div>
      `;
  // Jalankan fungsi setup khusus untuk langkah ini (jika ada)
  if (stepData.setup) {
    stepData.setup();
  }
}

// Fungsi untuk lanjut ke langkah simulator berikutnya
function nextKulturStep() {
  if (kulturSimStep < kulturSimSteps.length - 1) {
    kulturSimStep++;
    renderKulturStep();
  }
}

// --- 2. SIMULATOR BIOPLASTIK ---

const bioplastikSimSteps = [
  {
    prompt:
      "Halo! Siap membuat bioplastik? Pertama, gunakan Alat Pelindung Diri (APD). Klik item untuk mengenakannya.",
    ui: `
                  <div class="flex flex-col md:flex-row gap-8 items-start">
                      <!-- Karakter SVG -->
                      <div class="sim-figure flex-1">
                          <svg viewBox="0 0 200 280" class="w-full max-w-[250px] h-auto" aria-label="Karakter laboran wanita">
                              <!-- Base Body (sama seperti kultur) -->
                              <path d="M100 110 C 60 110, 60 60, 100 60 C 140 60, 140 110, 100 110 Z" fill="#fde6d8"/> <path d="M100 110 C 90 130, 70 140, 70 160 L 70 220 L 130 220 L 130 160 C 130 140, 110 130, 100 110 Z" fill="#e2e8f0"/> <path d="M70 160 L 60 160 L 50 210 L 60 210 L 70 160 Z" fill="#e2e8f0"/> <path d="M130 160 L 140 160 L 150 210 L 140 210 L 130 160 Z" fill="#e2e8f0"/> <path d="M50 210 L 50 220 L 60 220 L 60 210 Z" fill="#fde6d8"/> <path d="M140 210 L 140 220 L 150 220 L 150 210 Z" fill="#fde6d8"/> <ellipse cx="85" cy="85" rx="4" ry="6" fill="#4a2c2a"/> <ellipse cx="115" cy="85" rx="4" ry="6" fill="#4a2c2a"/> <path d="M90 100 C 95 105, 105 105, 110 100" stroke="#4a2c2a" fill="none" stroke-width="2"/> <path d="M100 60 C 70 60, 60 30, 100 20 C 140 30, 130 60, 100 60" fill="#4a2c2a"/>
                              <!-- APD (Tersembunyi) -->
                              <path id="svg-b-coat" class="svg-char-component" d="M70 155 L 60 155 L 50 270 L 150 270 L 140 155 L 130 155 C 130 145, 70 145, 70 155 Z" fill="white" stroke="#94a3b8" stroke-width="2"/> <!-- Jas Lab -->
                              <path id="svg-b-gloves" class="svg-char-component" d="M50 210 L 50 220 L 60 220 L 60 210 Z M 140 210 L 140 220 L 150 220 L 150 210 Z" fill="#60a5fa"/> <!-- Sarung Tangan -->
                              <path id="svg-b-mask" class="svg-char-component" d="M80 95 L 120 95 L 120 110 L 80 110 Z" fill="#93c5fd"/> <!-- Masker -->
                          </svg>
                      </div>
                      <div class="flex-1">
                          <p class="mb-4 text-lg">Klik item untuk menggunakannya (sesuai PDF hlm 30):</p>
                          <div class="space-y-3" id="ppe-list-b">
                              <button data-item="coat" class="ppe-item-b w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">1. Jas Lab</button>
                              <button data-item="mask" class="ppe-item-b w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">2. Masker</button>
                              <button data-item="gloves" class="ppe-item-b w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">3. Sarung Tangan</button>
                          </div>
                          <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" id="ppe-next-b" onclick="nextBioplastikStep()">Lanjut</button>
                      </div>
                  </div>
              `,
    setup: () => {
      let ppeDone = { coat: false, mask: false, gloves: false };
      document.querySelectorAll(".ppe-item-b").forEach((btn) => {
        btn.onclick = () => {
          const item = btn.dataset.item;
          ppeDone[item] = true;
          btn.classList.add("bg-green-200", "text-green-800", "font-medium");
          btn.innerHTML = `✓ ${btn.innerText}`;
          btn.disabled = true;
          document.getElementById(`svg-b-${item}`).classList.add("visible");
          if (Object.values(ppeDone).every(Boolean)) {
            document.getElementById("ppe-next-b").classList.remove("hidden");
          }
        };
      });
    },
  },
  {
    prompt:
      "Siapkan bahan. Timbang 4.5g Tepung Maizena dan 2g Gliserol, masukkan ke Gelas Piala.",
    ui: `
                  <div class="flex flex-col md:flex-row gap-8 items-center">
                      <!-- SVG Timbangan -->
                      <div class="sim-figure flex-1">
                          <svg viewBox="0 0 300 200" class="w-full max-w-[400px] h-auto">
                              <title>Neraca Digital dan Gelas Piala</title>
                              <!-- Neraca -->
                              <rect x="20" y="150" width="160" height="30" fill="#e5e7eb" rx="5"/>
                              <rect x="30" y="100" width="140" height="50" fill="#f9fafb" stroke="#9ca3af" rx="5"/>
                              <rect x="40" y="115" width="50" height="20" fill="#374151" rx="2"/>
                              <text id="scale-display" x="65" y="130" font-size="12" fill="lime" font-family="monospace" text-anchor="middle">0.0 g</text>
                              <!-- Gelas Piala -->
                              <g id="svg-beaker">
                                  <path d="M200 50 L 200 170 L 280 170 L 280 50" fill="#e0f2fe" opacity="0.5" stroke="#0284c7" stroke-width="2"/>
                                  <path d="M198 50 L 282 50" stroke="#0284c7" stroke-width="2" fill="none"/>
                                  <!-- Isi Beaker (tersembunyi) -->
                                  <rect id="svg-beaker-maizena" x="202" y="140" width="76" height="28" fill="#fefce8" class="svg-char-component" rx="2"/>
                                  <rect id="svg-beaker-gliserol" x="202" y="120" width="76" height="20" fill="#f3f4f6" opacity="0.8" class="svg-char-component" rx="2"/>
                              </g>
                          </svg>
                      </div>
                      <!-- Tombol Aksi -->
                      <div class="flex-1">
                          <p class="mb-4 text-lg">Klik untuk menimbang:</p>
                          <div class="space-y-3">
                              <button id="btn-weigh-maizena" class="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200" onclick="runWeigh('maizena')">1. Timbang 4.5g Maizena</button>
                              <button id="btn-weigh-gliserol" class="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200" disabled onclick="runWeigh('gliserol')">2. Timbang 2g Gliserol</button>
                          </div>
                          <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" id="weigh-next" onclick="nextBioplastikStep()">Lanjut</button>
                      </div>
                  </div>
              `,
    setup: () => {
      window.runWeigh = (item) => {
        const display = document.getElementById("scale-display");
        if (item === "maizena") {
          display.textContent = "4.5 g";
          document
            .getElementById("svg-beaker-maizena")
            .classList.add("visible");
          document.getElementById("btn-weigh-maizena").disabled = true;
          document
            .getElementById("btn-weigh-maizena")
            .classList.add("bg-green-200");
          document.getElementById("btn-weigh-gliserol").disabled = false;
        } else if (item === "gliserol") {
          display.textContent = "2.0 g";
          document
            .getElementById("svg-beaker-gliserol")
            .classList.add("visible");
          document.getElementById("btn-weigh-gliserol").disabled = true;
          document
            .getElementById("btn-weigh-gliserol")
            .classList.add("bg-green-200");
          document.getElementById("weigh-next").classList.remove("hidden");
        }
      };
    },
  },
  {
    prompt:
      "Tambahkan 60ml Aquades, 3ml Asam Asetat 5%, dan 2-3 tetes Pewarna.",
    ui: `
                  <div class="flex flex-col md:flex-row gap-8 items-center">
                      <!-- SVG Campuran -->
                      <div class="sim-figure flex-1">
                          <svg viewBox="0 0 300 200" class="w-full max-w-[400px] h-auto">
                              <title>Mencampur Bahan</title>
                              <!-- Gelas Piala dengan isi -->
                              <g id="svg-beaker-mix">
                                  <path d="M100 20 L 100 180 L 250 180 L 250 20" fill="#e0f2fe" opacity="0.5" stroke="#0284c7" stroke-width="2"/>
                                  <path d="M98 20 L 252 20" stroke="#0284c7" stroke-width="2" fill="none"/>
                                  <!-- Maizena & Gliserol (dari step sblmnya) -->
                                  <rect x="102" y="150" width="146" height="28" fill="#fefce8" rx="2"/>
                                  <rect x="102" y="130" width="146" height="20" fill="#f3f4f6" opacity="0.8" rx="2"/>
                                  <!-- Cairan (tersembunyi) -->
                                  <rect id="svg-liquid-aquades" x="102" y="80" width="146" height="50" fill="#93c5fd" class="svg-char-component" rx="2"/>
                                  <rect id="svg-liquid-color" x="102" y="80" width="146" height="98" fill="#4ade80" class="svg-char-component" rx="2"/>
                              </g>
                          </svg>
                      </div>
                      <!-- Tombol Aksi -->
                      <div class="flex-1">
                          <p class="mb-4 text-lg">Klik untuk menambahkan:</p>
                          <div class="space-y-3">
                              <button id="btn-add-aquades" class="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200" onclick="runMix('aquades')">1. Tambahkan 60ml Aquades</button>
                              <button id="btn-add-asetat" class="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200" disabled onclick="runMix('asetat')">2. Tambahkan 3ml Asam Asetat</button>
                              <button id="btn-add-color" class="w-full text-left p-3 bg-gray-100 rounded-lg hover:bg-gray-200" disabled onclick="runMix('color')">3. Tambahkan Pewarna (Hijau)</button>
                          </div>
                          <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" id="mix-next" onclick="nextBioplastikStep()">Lanjut</button>
                      </div>
                  </div>
              `,
    setup: () => {
      window.runMix = (item) => {
        const btnAquades = document.getElementById("btn-add-aquades");
        const btnAsetat = document.getElementById("btn-add-asetat");
        const btnColor = document.getElementById("btn-add-color");

        if (item === "aquades") {
          document
            .getElementById("svg-liquid-aquades")
            .classList.add("visible");
          btnAquades.disabled = true;
          btnAquades.classList.add("bg-green-200");
          btnAsetat.disabled = false;
        } else if (item === "asetat") {
          btnAsetat.disabled = true;
          btnAsetat.classList.add("bg-green-200");
          btnColor.disabled = false;
        } else if (item === "color") {
          document
            .getElementById("svg-liquid-aquades")
            .classList.remove("visible");
          document.getElementById("svg-liquid-color").classList.add("visible");
          btnColor.disabled = true;
          btnColor.classList.add("bg-green-200");
          document.getElementById("mix-next").classList.remove("hidden");
        }
      };
    },
  },
  {
    prompt:
      "Letakkan di atas pemanas listrik. Aduk terus sampai campuran memanas dan mengental (tergelatinisasi).",
    ui: `
                  <div class="text-center">
                      <div class="sim-figure mb-6 mx-auto">
                          <!-- SVG Pemanas -->
                          <svg viewBox="0 0 300 200" class="w-full max-w-[400px] h-auto">
                              <title>Memanaskan Campuran</title>
                              <!-- Kompor Listrik -->
                              <rect x="50" y="170" width="200" height="20" fill="#4b5563" rx="5"/>
                              <rect id="svg-hotplate" x="70" y="160" width="160" height="10" fill="#9ca3af" rx="3"/>
                              <!-- Gelas Piala dengan isi -->
                              <g id="svg-beaker-heat">
                                  <path d="M80 30 L 80 160 L 220 160 L 220 30" fill="#e0f2fe" opacity="0.5" stroke="#0284c7" stroke-width="2"/>
                                  <path d="M78 30 L 222 30" stroke="#0284c7" stroke-width="2" fill="none"/>
                                  <!-- Cairan -->
                                  <rect id="svg-liquid-final" x="82" y="50" width="136" height="108" fill="#4ade80" rx="2"/>
                                  <!-- Spatula (tersembunyi) -->
                                  <line id="svg-spatula" x1="150" y1="40" x2="150" y2="140" stroke="#71717a" stroke-width="4" class="svg-char-component"/>
                              </g>
                          </svg>
                      </div>
                      <p class="mb-4 text-lg" id="heat-status">Siap dipanaskan.</p>
                      <div class="space-x-4">
                          <button id="btn-heat-on" class="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold" onclick="runHeat('on')">1. Nyalakan Pemanas</button>
                          <button id="btn-heat-stir" class="bg-gray-400 text-white py-2 px-6 rounded-lg font-semibold" disabled onclick="runHeat('stir')">2. Aduk Campuran</button>
                      </div>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" id="heat-next" onclick="nextBioplastikStep()">Lanjut</button>
                  </div>
              `,
    setup: () => {
      window.runHeat = (step) => {
        const status = document.getElementById("heat-status");
        const btnOn = document.getElementById("btn-heat-on");
        const btnStir = document.getElementById("btn-heat-stir");

        if (step === "on") {
          document.getElementById("svg-hotplate").style.fill = "#f97316"; // Menyala
          status.innerText = "Pemanas menyala. Aduk campuran.";
          btnOn.disabled = true;
          btnOn.classList.add("bg-green-200");
          btnStir.disabled = false;
          btnStir.classList.remove("bg-gray-400");
          btnStir.classList.add("bg-blue-600");
        } else if (step === "stir") {
          document.getElementById("svg-spatula").classList.add("visible");
          document.getElementById("svg-liquid-final").style.opacity = "0.8"; // Mengental
          status.innerText = "Campuran mengental (tergelatinisasi)...";
          btnStir.disabled = true;
          btnStir.classList.add("bg-green-600");
          setTimeout(() => {
            status.innerText = "Selesai! Angkat dari pemanas.";
            document.getElementById("heat-next").classList.remove("hidden");
          }, 1500);
        }
      };
    },
  },
  {
    prompt:
      "Tuang campuran ke atas aluminium foil dan ratakan. Biarkan mengering selama 2 hari.",
    ui: `
                  <div class="text-center">
                      <div class="sim-figure mb-6 mx-auto">
                          <!-- SVG Tuang -->
                          <svg viewBox="0 0 300 200" class="w-full max-w-[400px] h-auto">
                              <title>Menuang Bioplastik</title>
                              <!-- Aluminium Foil -->
                              <rect x="20" y="150" width="260" height="20" fill="#d1d5db" rx="5"/>
                              <!-- Cairan dituang (tersembunyi) -->
                              <ellipse id="svg-poured-liquid" cx="150" cy="150" rx="80" ry="15" fill="#4ade80" opacity="0.8" class="svg-char-component"/>
                              <!-- Beaker (menuang) -->
                              <g transform="rotate(30, 150, 100)">
                                  <path d="M100 20 L 100 130 L 200 130 L 200 20" fill="#e0f2fe" opacity="0.5" stroke="#0284c7" stroke-width="2"/>
                                  <rect x="102" y="50" width="96" height="78" fill="#4ade80" opacity="0.8" rx="2"/>
                              </g>
                          </svg>
                      </div>
                      <p class="mb-4 text-lg" id="pour-status">Siap menuang.</p>
                      <button id="btn-pour" class="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold" onclick="runPour()">Tuang & Ratakan</button>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hidden" id="pour-next" onclick="nextBioplastikStep()">Lanjut</button>
                  </div>
              `,
    setup: () => {
      window.runPour = () => {
        document.getElementById("svg-poured-liquid").classList.add("visible");
        document.getElementById("pour-status").innerText =
          "Menuang... Meratakan... Mengering selama 2 hari...";
        document.getElementById("btn-pour").disabled = true;
        document.getElementById("btn-pour").classList.add("bg-green-600");
        setTimeout(() => {
          document.getElementById("pour-next").classList.remove("hidden");
        }, 1500);
      };
    },
  },
  {
    prompt: "Kerja bagus! Bioplastik sederhana Anda telah selesai dibuat.",
    ui: `
                  <div class="text-center">
                      <div class="sim-figure mb-6 mx-auto">
                          <!-- SVG Selesai -->
                          <svg viewBox="0 0 300 200" class="w-full max-w-[400px] h-auto">
                              <title>Bioplastik Selesai</title>
                              <rect x="40" y="50" width="220" height="100" fill="#4ade80" opacity="0.9" rx="10" stroke="#166534"/>
                              <text x="150" y="110" font-size="16" fill="#14532d" font-family="Inter" text-anchor="middle" font-weight="600">Bioplastik Selesai!</text>
                          </svg>
                      </div>
                      <h3 class="text-2xl font-bold text-green-700">Simulasi Selesai!</h3>
                      <p class="mt-4 text-lg">Anda telah berhasil membuat bioplastik sederhana.</p>
                      <button class="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold" onclick="initSimulator('bioplastik')">Ulangi Simulator</button>
                  </div>
              `,
    setup: () => {},
  },
];

// Fungsi untuk merender langkah simulator Bioplastik
function renderBioplastikStep() {
  const simContent = document.getElementById("content-simulator");
  const stepData = bioplastikSimSteps[bioplastikSimStep];

  simContent.innerHTML = `
          <div class="mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
              <p class="font-semibold">PROMPT:</p>
              <p>${stepData.prompt}</p>
          </div>
          <div class="mt-8 p-6 border rounded-lg bg-gray-50 min-h-[300px]">
              ${stepData.ui}
          </div>
      `;
  if (stepData.setup) {
    stepData.setup();
  }
}

// Fungsi untuk lanjut ke langkah simulator Bioplastik berikutnya
function nextBioplastikStep() {
  if (bioplastikSimStep < bioplastikSimSteps.length - 1) {
    bioplastikSimStep++;
    renderBioplastikStep();
  }
}

// --- 3. SIMULATOR BIOREMEDIASI ---
// (Akan ditambahkan nanti)

// === FUNGSI INISIALISASI SIMULATOR (UTAMA) ===
function initSimulator(moduleName) {
  const simContent = document.getElementById("content-simulator");
  if (moduleName === "kultur") {
    kulturSimStep = 0; // Reset langkah
    renderKulturStep();
  } else if (moduleName === "bioplastik") {
    bioplastikSimStep = 0; // Reset langkah
    renderBioplastikStep();
  } else if (moduleName === "bioremediasi") {
    simContent.innerHTML = `<div class="text-center p-8">
                  <h3 class="text-2xl font-semibold text-gray-700">Simulator Bioremediasi</h3>
                  <p class="mt-4 text-lg text-gray-500">Simulator untuk modul ini sedang dalam pengembangan. (Termasuk slider interaktif untuk suhu, waktu, dan kuantitas bakteri seperti di PDF halaman 49).</p>
                  <img src="https://placehold.co/400x300/ffe4e6/9f1239?text=Coming+Soon" class="rounded-lg shadow-md mt-6 mx-auto">
              </div>`;
  }
}

// Inisialisasi: Tampilkan menu utama saat halaman dimuat
document.addEventListener("DOMContentLoaded", showHome);
