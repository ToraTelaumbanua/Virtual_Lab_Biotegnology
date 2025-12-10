/* assets/script.js
   Cleaned, consolidated, and bug-fixed version of your uploaded JS.
   Handles: start screen, navigation, pagination for Materi/Prosedur,
   and three simulators (Kultur Jaringan, Bioplastik, Bioremediasi).
   This file replaces the fragmented/duplicated script you uploaded and
   provides a consistent API for the index.html you've provided.
*/

/* --------------- Startup / Start Screen --------------- */
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const mainContent = document.getElementById("main-content");

  if (startBtn && startScreen && mainContent) {
    startBtn.addEventListener("click", () => {
      startScreen.style.opacity = "0";
      // reveal main content
      mainContent.classList.remove("hidden");
      // after fade, remove start screen from flow
      setTimeout(() => {
        startScreen.style.display = "none";
        // allow body scroll after start
        document.body.style.overflow = "auto";
      }, 500);
    });
  }
});

/* --------------- App State --------------- */
let currentModule = ""; // 'kultur' | 'bioplastik' | 'bioremediasi'
let currentSection = ""; // 'materi' | 'prosedur' | 'simulator'
let materiPage = 0;
let prosedurPage = 0;

const moduleOrder = ["kultur", "bioplastik", "bioremediasi"];

/* --------------- Content Store ---------------
   This dataset was taken from your uploaded content (cleaned)
   and expanded slightly for pagination.
*/
const contentStore = {
  kultur: {
    title: "Kultur Jaringan",
    materi: [
      `<h2>Pengertian Kultur Jaringan</h2>
      <p>Kultur jaringan adalah metode mengisolasi bagian tanaman (sel atau jaringan) untuk dibudidayakan in-vitro secara aseptik sehingga dapat menghasilkan tanaman baru. Prinsip utama adalah <em>totipotensi</em>.</p>`,

      `<h2>Media dan Regulasi</h2>
      <p>Media biasanya mengandung nutrisi, gula (sukrosa), bahan gel (agar) dan zat pengatur tumbuh (hormon seperti auksin dan sitokinin).</p>`,

      `<h2>Sterilisasi & Teknik Aseptik</h2>
      <p>Alat harus disterilkan (autoklaf/oven), kerja dilakukan di LAF (Laminar Air Flow) atau Bunsen untuk menjaga kondisi aseptik.</p>`
    ],
    prosedur: [
      `<h2>Prosedur Persiapan Media</h2>
       <ol>
         <li>Siapkan bahan / larutan sesuai resep (MS, agar, sukrosa).</li>
         <li>Larutkan dan homogenkan, masukkan ke dalam botol/petri lalu autoklaf pada 121°C selama 15-20 menit.</li>
       </ol>`,

      `<h2>Prosedur Eksplan</h2>
       <ol>
         <li>Ambil jaringan/explant. Bersihkan dan sterilisasi permukaan dengan alkohol 70% atau natrium hipoklorit sesuai protokol.</li>
         <li>Potong di bawah kondisi aseptik dan pindahkan ke media steril.</li>
       </ol>`,

      `<h2>Inkubasi & Aklimatisasi</h2>
       <ol>
         <li>Tempatkan botol/petri di ruang inkubasi dengan kondisi cahaya dan suhu sesuai jenis tanaman hingga terbentuk plantlet.</li>
         <li>Aklimatisasi plantlet ke kondisi luar (greenhouse).</li>
       </ol>`
    ],
    simulator: null // simulator uses interactive UI
  },

  bioplastik: {
    title: "Bioplastik",
    materi: [
      `<h2>Apa itu Bioplastik?</h2>
       <p>Bioplastik adalah plastik yang dibuat dari bahan alami seperti pati (maizena), yang dapat lebih mudah terdegradasi dibanding plastik sintetis.</p>`,

      `<h2>Konsep Pembuatan</h2>
       <p>Biasanya menggunakan pati + plastisizer (glycerol) + pemanas untuk gelatinisasi, lalu dicetak dan dikeringkan.</p>`
    ],
    prosedur: [
      `<h2>Persiapan Bahan</h2>
       <ul><li>Timbang tepung maizena, glycerol, air.</li><li>Siapkan alat (hotplate, beaker, pengaduk).</li></ul>`,

      `<h2>Proses Pembuatan</h2>
       <ol>
         <li>Campur bahan, panaskan sambil diaduk sampai mengental.</li>
         <li>Tuang ke cetakan/foil, ratakan, dan keringkan.</li>
       </ol>`
    ],
    simulator: null
  },

  bioremediasi: {
    title: "Bioremediasi",
    materi: [
      `<h2>Apa itu Bioremediasi?</h2>
       <p>Bioremediasi menggunakan organisme hidup (misal bakteri) untuk mendegradasi polutan seperti minyak.</p>`,

      `<h2>Parameter Penting</h2>
       <p>Parameter: suhu, waktu incubasi, dan jumlah inokulum (bakteri).</p>`
    ],
    prosedur: [
      `<h2>Alat & Bahan</h2>
       <ul><li>Cawan petri, pipet, jarum ose, kertas saring, inkubator, suspensi bakteri, limbah minyak.</li></ul>`,

      `<h2>Prosedur Kerja</h2>
       <ol>
         <li>Tuangkan aquades ke cawan petri.</li>
         <li>Tambahkan minyak, inokulasi bakteri pada filter, masukkan ke petri, bungkus dan inkubasi.</li>
       </ol>`
    ],
    simulator: null
  }
};

/* --------------- Navigation Helpers --------------- */
function showMainMenu() {
  document.getElementById("module-hub").classList.add("hidden");
  document.getElementById("main-menu").classList.remove("hidden");
}

function showModule(moduleName) {
  currentModule = moduleName;
  // show hub (Materi/Prosedur/Simulator) for that module
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("module-hub").classList.remove("hidden");
  const hubTitle = document.getElementById("hub-title");
  if (hubTitle) hubTitle.innerText = contentStore[moduleName].title;
}

function goToHub() {
  document.getElementById("lab-module-page").classList.add("hidden");
  document.getElementById("module-hub").classList.remove("hidden");
  currentSection = "";
}

function showSection(sectionName) {
  currentSection = sectionName;

  document.getElementById("module-hub").classList.add("hidden");
  document.getElementById("lab-module-page").classList.remove("hidden");
  document.getElementById("lab-title").innerText = contentStore[currentModule].title;

  // sembunyikan semua tab
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));

  if (sectionName === "materi") {
    document.getElementById("lab-content-materi").classList.remove("hidden");
    renderMateri();
  } 
  else if (sectionName === "prosedur") {
    document.getElementById("lab-content-prosedur").classList.remove("hidden");
    renderProsedur();
  } 
  else if (sectionName === "simulator") {
    document.getElementById("lab-content-simulator").classList.remove("hidden");
    initSimulator(currentModule);
  }
}

/* --------------- Pagination: Materi --------------- */
function renderMateri() {
  materiPage = 0;
  displayMateriPage(materiPage);
}

function displayMateriPage(pageIndex) {
  const pages = contentStore[currentModule].materi || [];
  const display = document.getElementById("materi-content-display");
  if (!display) return;
  display.innerHTML = pages[pageIndex] || "<p>Tidak ada materi.</p>";
  document.getElementById("materi-prev").disabled = pageIndex === 0;
  document.getElementById("materi-next").disabled = pageIndex >= pages.length - 1;
  document.getElementById("materi-page-counter").innerText = `Halaman ${pageIndex + 1} / ${pages.length}`;
}

function nextMateriPage() {
  const pages = contentStore[currentModule].materi || [];
  if (materiPage < pages.length - 1) { materiPage++; displayMateriPage(materiPage); }
}
function prevMateriPage() {
  if (materiPage > 0) { materiPage--; displayMateriPage(materiPage); }
}

/* --------------- Pagination: Prosedur --------------- */
function renderProsedur() {
  prosedurPage = 0;
  displayProsedurPage(prosedurPage);
}

function displayProsedurPage(pageIndex) {
  const pages = contentStore[currentModule].prosedur || [];
  const display = document.getElementById("prosedur-content-display");
  if (!display) return;
  display.innerHTML = pages[pageIndex] || "<p>Tidak ada prosedur.</p>";
  document.getElementById("prosedur-prev").disabled = pageIndex === 0;
  document.getElementById("prosedur-next").disabled = pageIndex >= pages.length - 1;
  document.getElementById("prosedur-page-counter").innerText = `Halaman ${pageIndex + 1} / ${pages.length}`;
}

function nextProsedurPage() {
  const pages = contentStore[currentModule].prosedur || [];
  if (prosedurPage < pages.length - 1) { prosedurPage++; displayProsedurPage(prosedurPage); }
}
function prevProsedurPage() {
  if (prosedurPage > 0) { prosedurPage--; displayProsedurPage(prosedurPage); }
}

/* --------------- Simple Linear Simulator Engine ---------------
   A reusable linear simulator: give it a sequence of step keys and messages.
*/
function LinearSimulator(config) {
  // config: { containerEl, steps: [ { key, label } ], messages: [], onComplete(optional) }
  this.container = config.containerEl;
  this.steps = config.steps || [];
  this.index = 0;
  this.messages = config.messages || [];
  this.onComplete = config.onComplete || function(){};

  // build UI
  this.render = function() {
    if (!this.container) return;
    this.container.innerHTML = "";
    const status = document.createElement("div");
    status.className = "small";
    status.id = this.container.id + "-status";
    status.textContent = this.messages[0] || "Ikuti langkah-langkah yang diberikan.";
    this.container.appendChild(status);

    const icons = document.createElement("div");
    icons.style.display = "flex";
    icons.style.gap = "8px";
    icons.style.flexWrap = "wrap";
    icons.style.marginTop = "10px";

    this.steps.forEach(s => {
      const btn = document.createElement("button");
      btn.className = "icon-btn";
      btn.dataset.step = s.key;
      btn.innerHTML = `<span style="font-size:18px">${s.icon || "●"}</span><div style="margin-left:8px;text-align:left"><strong style="display:block">${s.label}</strong></div>`;
      // initially disable except first
      if (s !== this.steps[0]) btn.disabled = true;
      icons.appendChild(btn);
      // click handler
      btn.addEventListener("click", () => this.tryStep(btn));
      // keyboard support
      btn.addEventListener("keydown", (e)=> {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); }
      });
    });

    this.container.appendChild(icons);
    // store references
    this.statusEl = status;
    this.iconsEl = icons;
  };

  this.tryStep = function(btn) {
    const stepKey = btn.dataset.step;
    const expected = this.steps[this.index].key;
    if (stepKey !== expected) {
      // show hint
      this.statusEl.textContent = `Silakan lakukan langkah: ${this.steps[this.index].label}`;
      // small shake effect
      btn.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:220,iterations:1});
      return;
    }
    // correct
    btn.disabled = true;
    btn.style.borderColor = "limegreen";
    btn.style.boxShadow = "0 10px 30px rgba(34,197,94,0.12)";
    btn.style.background = "#ecfdf5";
    // advance
    this.index++;
    if (this.index < this.steps.length) {
      // enable next
      const children = Array.from(this.iconsEl.children);
      const nextBtn = children[this.index];
      if (nextBtn) nextBtn.disabled = false;
      this.statusEl.textContent = this.messages[this.index] || "Lanjutkan langkah berikutnya.";
    } else {
      // finished
      this.statusEl.textContent = "Selesai ✓";
      this.onComplete();
    }
  };

  this.reset = function() {
    this.index = 0;
    if (!this.container) return;
    // Re-render so buttons reset
    this.render();
  };

  // auto-render on create
  this.render();
}

/* --------------- Module-specific simulator initializers --------------- */

function initSimulator(moduleName) {
  const simContainer = document.getElementById("content-simulator");
  if (!simContainer) return;
  simContainer.innerHTML = ""; // clear

  if (moduleName === "kultur") {
    simContainer.innerHTML = `<div class="card"><h3>Kultur Jaringan — Simulator</h3><div id="sim-kultur" style="margin-top:10px"></div></div>`;
    const target = document.getElementById("sim-kultur");
    const kulturSteps = [
      { key:"mask", label:"Pakai Masker", icon:"😷" },
      { key:"goggles", label:"Pakai Kacamata", icon:"🥽" },
      { key:"gloves", label:"Pakai Sarung Tangan", icon:"🧤" },
      { key:"shoes", label:"Gunakan Sepatu", icon:"👟" },
      { key:"autoclave", label:"Sterilisasi (Autoclave)", icon:"🔥" },
      { key:"open-media", label:"Buka Botol Media", icon:"🍶" },
      { key:"cut-explant", label:"Potong Eksplan", icon:"✂️" },
      { key:"transfer", label:"Transfer Eksplan", icon:"📤" }
    ];
    const kulturMsgs = [
      "Pakai masker.",
      "Pakai kacamata pelindung.",
      "Pakai sarung tangan.",
      "Gunakan sepatu laboratorium. PPE selesai.",
      "Sterilisasi peralatan dengan autoclave.",
      "Buka botol media steril.",
      "Potong explant menggunakan instrument steril.",
      "Transfer explant ke media."
    ];
    const sim = new LinearSimulator({
      containerEl: target,
      steps: kulturSteps,
      messages: kulturMsgs,
      onComplete: ()=> {
        const note = document.createElement("div");
        note.className = "small center";
        note.textContent = "Simulasi Kultur Jaringan selesai. Selamat!";
        target.appendChild(note);
      }
    });
    // attach reset button
    const reset = document.createElement("button");
    reset.className = "page-nav-button";
    reset.style.marginTop = "12px";
    reset.textContent = "Reset";
    reset.addEventListener("click", ()=> sim.reset());
    target.appendChild(reset);

  } else if (moduleName === "bioplastik") {
    simContainer.innerHTML = `<div class="card"><h3>Bioplastik — Simulator</h3><div id="sim-bioplastik" style="margin-top:10px"></div></div>`;
    const target = document.getElementById("sim-bioplastik");
    const bpSteps = [
      { key:"pick-starch", label:"Ambil Tepung", icon:"🌽" },
      { key:"weigh", label:"Timbang Bahan", icon:"⚖️" },
      { key:"add-glycerol", label:"Tambahkan Glycerol", icon:"🧴" },
      { key:"add-water", label:"Tambahkan Air", icon:"💧" },
      { key:"heat", label:"Panaskan & Aduk", icon:"🔥" },
      { key:"pour", label:"Tuang ke Cetakan", icon:"🍶" },
      { key:"spread", label:"Ratakan & Keringkan", icon:"🧴" }
    ];
    const bpMsgs = [
      "Ambil tepung maizena.",
      "Timbang tepung sesuai resep.",
      "Tambahkan glycerol/plastisizer.",
      "Tambahkan aquades.",
      "Panaskan sambil diaduk sampai mengental.",
      "Tuang ke cetakan/foil.",
      "Ratakan & keringkan (48 jam)."
    ];
    const sim = new LinearSimulator({
      containerEl: target,
      steps: bpSteps,
      messages: bpMsgs,
      onComplete: ()=> {
        const note = document.createElement("div");
        note.className = "small center";
        note.textContent = "Simulasi Bioplastik selesai. Anda berhasil membuat lembar bioplastik (simulasi).";
        target.appendChild(note);
      }
    });
    const reset = document.createElement("button");
    reset.className = "page-nav-button";
    reset.style.marginTop = "12px";
    reset.textContent = "Reset";
    reset.addEventListener("click", ()=> sim.reset());
    target.appendChild(reset);

  } else if (moduleName === "bioremediasi") {
    simContainer.innerHTML = `<div class="card"><h3>Bioremediasi — Simulator</h3><div id="sim-bioremed" style="margin-top:10px"></div></div>`;
    const target = document.getElementById("sim-bioremed");
    const brSteps = [
      { key:"add-aquadest", label:"Tuang Aquades", icon:"💧" },
      { key:"add-oil", label:"Tambahkan Minyak", icon:"🛢️" },
      { key:"sterilize-loop", label:"Sterilisasi Jarum Ose", icon:"🔥" },
      { key:"collect-bac", label:"Ambil Bakteri", icon:"🔬" },
      { key:"apply-filter", label:"Oleskan pada Kertas Saring", icon:"📄" },
      { key:"incubate", label:"Masukkan ke Inkubator", icon:"🕒" }
    ];
    const brMsgs = [
      "Tuang aquades ke cawan petri.",
      "Tambahkan minyak ke permukaan aquades.",
      "Sterilisasi jarum ose (di atas bunsen).",
      "Ambil bakteri menggunakan jarum ose.",
      "Oleskan suspensi bakteri pada kertas saring.",
      "Masukkan cawan petri ke inkubator dan inkubasi."
    ];
    const sim = new LinearSimulator({
      containerEl: target,
      steps: brSteps,
      messages: brMsgs,
      onComplete: ()=> {
        const note = document.createElement("div");
        note.className = "small center";
        note.textContent = "Simulasi Bioremediasi selesai. Cek hasil degradasi setelah inkubasi (simulasi).";
        target.appendChild(note);

        // Additionally show small parameter controls to illustrate incubation
        const controls = document.createElement("div");
        controls.style.marginTop = "12px";
        controls.innerHTML = `
          <div style="display:flex;gap:8px;align-items:center;justify-content:center;">
            <label class="small">Waktu (hari): <input id="sim-br-waktu" type="range" min="0" max="30" value="7"></label>
            <label class="small">Suhu (°C): <input id="sim-br-suhu" type="range" min="10" max="45" value="30"></label>
          </div>
          <p id="sim-result-text" class="small center" style="margin-top:8px">Atur parameter untuk melihat hasil (simulasi)</p>
        `;
        target.appendChild(controls);

        const waktuEl = document.getElementById("sim-br-waktu");
        const suhuEl = document.getElementById("sim-br-suhu");
        const resultText = document.getElementById("sim-result-text");

        function updateResult(){
          const w = Number(waktuEl.value);
          const s = Number(suhuEl.value);
          // simple heuristics for simulated "degradation level"
          const score = Math.max(0, Math.min(100, Math.round((w * (s/30)) * 2)));
          if (score > 80) resultText.textContent = `Hasil: Degradasi tinggi (${score}%) — kondisi optimal.`;
          else if (score > 45) resultText.textContent = `Hasil: Degradasi sedang (${score}%).`;
          else resultText.textContent = `Hasil: Degradasi rendah (${score}%).`;
        }
        waktuEl.addEventListener("input", updateResult);
        suhuEl.addEventListener("input", updateResult);
        updateResult();
      }
    });

    const reset = document.createElement("button");
    reset.className = "page-nav-button";
    reset.style.marginTop = "12px";
    reset.textContent = "Reset";
    reset.addEventListener("click", ()=> sim.reset());
    target.appendChild(reset);
  } else {
    simContainer.innerHTML = "<p>Simulator untuk modul ini belum tersedia.</p>";
  }
}

/* --------------- Small improvements: keyboard navigation for modules --------------- */
document.addEventListener("keydown", (e) => {
  // allow Esc to go back to main menu if inside lab-module-page
  if (e.key === "Escape") {
    const lab = document.getElementById("lab-module-page");
    const hub = document.getElementById("module-hub");
    if (lab && !lab.classList.contains("hidden")) {
      // go to hub
      goToHub();
    } else if (hub && !hub.classList.contains("hidden")) {
      // go to main menu
      showMainMenu();
    }
  }
});

/* --------------- End of script.js ---------------
   This file is designed to be robust and self-contained. If you want more
   advanced visuals for the simulators (SVG animations, step-by-step images),
   tell me which module & which PDF page we should exactly reproduce and I'll
   add the detailed markup and animations next.
*/
