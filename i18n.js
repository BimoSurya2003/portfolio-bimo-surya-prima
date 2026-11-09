/* =====================================================================
   i18n.js — Multi language (English default / Bahasa Indonesia)
   ---------------------------------------------------------------------
   Cara kerja:
   - Teks asli di index.html (English) TIDAK diubah.
   - Saat bahasa = "id", teks dicocokkan dengan kamus ID di bawah ini
     lalu diganti. Saat kembali ke "en", teks asli dikembalikan.
   - Pilihan bahasa disimpan di localStorage (key: "lang").

   Menambah / mengubah terjemahan: cukup edit objek ID_DICT di bawah.
   Format:  "Teks persis seperti di HTML": "Terjemahan Indonesia",
   ===================================================================== */
(function () {
    'use strict';

    var DEFAULT_LANG = 'en';
    var STORAGE_KEY = 'lang';

    /* ---------------------------- KAMUS EN -> ID ---------------------------- */
    var ID_DICT = {
        /* Title halaman */
        'Portfolio': 'Portofolio',

        /* Navbar */
        'Home': 'Beranda',
        'Education': 'Pendidikan',
        'Services': 'Layanan',
        'Skills': 'Keahlian',
        'Projects': 'Proyek',
        'Experience': 'Pengalaman',
        'Certificates': 'Sertifikat',
        'Download Resume': 'Unduh CV',

        /* Hero */
        'Make Something': 'Ciptakan Sesuatu yang',
        'Meaningful': 'Bermakna',
        'Clients': 'Klien',
        'Full Stack Web Developer': 'Full Stack Web Developer',
        'Mobile Developer': 'Mobile Developer',
        'I am a software programmer with internship experience and professional training in Information Technology. Skilled in software development, system analysis, problem-solving, teamwork, adaptability, and communication, with a passion for building efficient and reliable digital solutions.':
            'Saya seorang programmer perangkat lunak dengan pengalaman magang dan pelatihan profesional di bidang Teknologi Informasi. Terampil dalam pengembangan perangkat lunak, analisis sistem, pemecahan masalah, kerja sama tim, adaptasi, dan komunikasi, dengan semangat membangun solusi digital yang efisien dan andal.',
        'View Projects': 'Lihat Proyek',
        'Contact Me': 'Hubungi Saya',

        /* Education */
        'Background': 'Latar Belakang',
        'Associate Degree | Managemen Informatika': 'Diploma | Manajemen Informatika',
        'GPA:': 'IPK:',
        'Graduated: 2022 - 2025': 'Lulus: 2022 - 2025',
        'Padang, West Sumatra': 'Padang, Sumatera Barat',
        'Vocational High School | Teknik Komputer dan Jaringan': 'Sekolah Menengah Kejuruan | Teknik Komputer dan Jaringan',
        'Graduated: 2019 - 2022': 'Lulus: 2019 - 2022',

        /* Services */
        'What I Do': 'Apa yang Saya Kerjakan',
        'Front-End Development': 'Pengembangan Front-End',
        'Crafting intuitive, responsive, and engaging user interfaces using modern web technologies.':
            'Membuat antarmuka pengguna yang intuitif, responsif, dan menarik menggunakan teknologi web modern.',
        'Back-End Development': 'Pengembangan Back-End',
        'Developing robust, secure, and scalable server-side APIs and database architectures.':
            'Mengembangkan API sisi server dan arsitektur basis data yang tangguh, aman, dan mudah diskalakan.',
        'Android Development': 'Pengembangan Android',
        'Developing native Android applications with high performance and comprehensive features.':
            'Mengembangkan aplikasi Android native dengan performa tinggi dan fitur yang lengkap.',
        'UI / UX Design': 'Desain UI / UX',
        'Designing intuitive, user-centered, and visually stunning digital product interfaces.':
            'Merancang antarmuka produk digital yang intuitif, berpusat pada pengguna, dan memukau secara visual.',

        /* Skills */
        'Capabilities': 'Kemampuan',
        'Technical Expertise': 'Keahlian Teknis',

        /* Projects */
        'Showcase': 'Etalase',
        'Featured Projects': 'Proyek Unggulan',
        'A modern learning management platform for digital education and training.':
            'Platform manajemen pembelajaran modern untuk pendidikan dan pelatihan digital.',
        'A geographic platform for visualizing citizen satisfaction across urban regions.':
            'Platform geografis untuk memvisualisasikan tingkat kepuasan warga di berbagai wilayah perkotaan.',
        'A smart boarding house management system for property owners and tenants.':
            'Sistem manajemen kos pintar untuk pemilik properti dan penghuni.',
        'A digital platform for fishing reservations and tackle shop management.':
            'Platform digital untuk reservasi pemancingan dan pengelolaan toko perlengkapan pancing.',
        'A helpdesk ticketing system for efficient issue tracking and support management.':
            'Sistem tiket helpdesk untuk pelacakan masalah dan pengelolaan dukungan yang efisien.',
        'A talent management platform for recruitment and workforce development.':
            'Platform manajemen talenta untuk rekrutmen dan pengembangan tenaga kerja.',
        'A point-of-sale system with inventory management for poultry businesses.':
            'Sistem kasir (point-of-sale) dengan manajemen inventaris untuk usaha peternakan ayam.',
        'A digital attendance platform for efficient student record management.':
            'Platform absensi digital untuk pengelolaan data kehadiran mahasiswa yang efisien.',
        'A modern Figma interface designed for a seamless food ordering experience.':
            'Antarmuka Figma modern yang dirancang untuk pengalaman pemesanan makanan yang mulus.',
        'A creative Figma interface crafted for an engaging digital art platform.':
            'Antarmuka Figma kreatif yang dibuat untuk platform seni digital yang menarik.',
        'Live Demo': 'Demo Langsung',

        /* Experience */
        'Journey': 'Perjalanan',
        'Work History': 'Riwayat Pekerjaan',
        'November 2027 – Present': 'November 2027 – Sekarang',
        'February 2026 – July 2026': 'Februari 2026 – Juli 2026',
        'February 2026 – Present': 'Februari 2026 – Sekarang',
        'February 2025 – June 2025': 'Februari 2025 – Juni 2025',
        'South Jakarta, Indonesia': 'Jakarta Selatan, Indonesia',
        'Bandung, West Java, Indonesia': 'Bandung, Jawa Barat, Indonesia',
        'Contract': 'Kontrak',
        'Internship': 'Magang',

        /* Certificates */
        'Achievements': 'Pencapaian',
        'Issued: 2026': 'Diterbitkan: 2026',
        'Issued: 2025': 'Diterbitkan: 2025',
        'Issued: 2024': 'Diterbitkan: 2024',
        'Issued: 2023': 'Diterbitkan: 2023',
        'Issued: 2022': 'Diterbitkan: 2022',

        /* Footer */
        '\u00A9 2026 Bimo Surya Prima. All rights reserved.': '\u00A9 2026 Bimo Surya Prima. Hak cipta dilindungi.'
    };

    /* Atribut aria-label di HTML aslinya sudah berbahasa Indonesia,
       jadi untuk mode English perlu diterjemahkan balik. */
    var ARIA_EN = {
        'Sebelumnya': 'Previous',
        'Selanjutnya': 'Next',
        'Tutup': 'Close'
    };
    var ARIA_PAGE_RE = /^Ke halaman (\d+)$/;

    /* ------------------------------ Helper ------------------------------ */
    function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

    var origText = new WeakMap();   // Text node  -> string asli
    var origAttr = new WeakMap();   // Element    -> { attrName: nilai asli }
    var origTitle = document.title;
    var currentLang = DEFAULT_LANG;

    var TEXT_SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };

    function translateTextNodes(lang) {
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                var p = n.parentNode;
                if (!p || TEXT_SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
                if (p.closest && p.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var node;
        while ((node = walker.nextNode())) {
            if (!origText.has(node)) {
                if (!norm(node.nodeValue)) continue;      // abaikan whitespace
                origText.set(node, node.nodeValue);
            }
            var original = origText.get(node);
            if (!original) continue;
            if (lang === 'id') {
                var key = norm(original);
                if (Object.prototype.hasOwnProperty.call(ID_DICT, key)) {
                    var lead = original.match(/^\s*/)[0];
                    var trail = original.match(/\s*$/)[0];
                    node.nodeValue = lead + ID_DICT[key] + trail;
                }
            } else {
                node.nodeValue = original;
            }
        }
    }

    function translateAttributes(lang) {
        var els = document.querySelectorAll('[alt], [aria-label]');
        els.forEach(function (el) {
            if (el.closest('[data-i18n-skip]')) return;
            var store = origAttr.get(el);
            if (!store) { store = {}; origAttr.set(el, store); }

            /* alt (asli = English) */
            if (el.hasAttribute('alt')) {
                if (!('alt' in store)) store.alt = el.getAttribute('alt');
                var altKey = norm(store.alt);
                if (lang === 'id' && Object.prototype.hasOwnProperty.call(ID_DICT, altKey)) {
                    el.setAttribute('alt', ID_DICT[altKey]);
                } else {
                    el.setAttribute('alt', store.alt);
                }
            }

            /* aria-label (asli = Indonesia) */
            if (el.hasAttribute('aria-label')) {
                if (!('aria' in store)) store.aria = el.getAttribute('aria-label');
                var a = store.aria;
                if (lang === 'en') {
                    var m = a.match(ARIA_PAGE_RE);
                    if (m) el.setAttribute('aria-label', 'Go to page ' + m[1]);
                    else if (ARIA_EN[a]) el.setAttribute('aria-label', ARIA_EN[a]);
                    else el.setAttribute('aria-label', a);
                } else {
                    el.setAttribute('aria-label', a);
                }
            }
        });
    }

    /* Teks pada tombol-tombol ganti bahasa */
    function updateSwitchers(lang) {
        document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
            var target = btn.getAttribute('data-lang-switch');
            var active = target === lang;
            btn.classList.toggle('lang-active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    function applyLang(lang) {
        if (lang !== 'en' && lang !== 'id') lang = DEFAULT_LANG;
        currentLang = lang;

        translateTextNodes(lang);
        translateAttributes(lang);

        document.documentElement.setAttribute('lang', lang);
        document.title = (lang === 'id' && ID_DICT[norm(origTitle)]) ? ID_DICT[norm(origTitle)] : origTitle;
        updateSwitchers(lang);

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* abaikan */ }
    }

    /* ------------------------- Styling tombol bahasa ------------------------- */
    function injectStyle() {
        var css = [
            '.lang-switch{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:12px;',
            'background:#1F2430;border:1px solid rgba(255,255,255,0.08);}',
            '.lang-switch button{font-family:inherit;font-size:12px;font-weight:600;letter-spacing:.04em;',
            'padding:6px 10px;border-radius:9px;color:#B5BAC7;background:transparent;border:0;cursor:pointer;',
            'transition:all .25s ease;line-height:1;}',
            '.lang-switch button:hover{color:#fff;}',
            '.lang-switch button.lang-active{background:#6D5DF6;color:#fff;box-shadow:0 0 18px rgba(109,93,246,.35);}'
        ].join('');
        var style = document.createElement('style');
        style.setAttribute('data-i18n-style', '');
        style.textContent = css;
        document.head.appendChild(style);
    }

    function buildSwitcher() {
        var wrap = document.createElement('div');
        wrap.className = 'lang-switch';
        wrap.setAttribute('role', 'group');
        wrap.setAttribute('aria-label', 'Language');
        wrap.setAttribute('data-i18n-skip', '');
        [['en', 'EN'], ['id', 'ID']].forEach(function (pair) {
            var b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('data-lang-switch', pair[0]);
            b.textContent = pair[1];
            b.addEventListener('click', function () { applyLang(pair[0]); });
            wrap.appendChild(b);
        });
        return wrap;
    }

    function mountSwitchers() {
        /* Desktop: sebelum tombol "Download Resume" */
        var desktopSlot = document.querySelector('nav .hidden.md\\:flex.items-center.gap-4');
        if (desktopSlot) desktopSlot.insertBefore(buildSwitcher(), desktopSlot.firstChild);

        /* Mobile: di atas daftar link menu dropdown */
        var mobileList = document.querySelector('#mobile-menu > div');
        if (mobileList) {
            var holder = document.createElement('div');
            holder.className = 'pb-2';
            holder.setAttribute('data-i18n-skip', '');
            holder.appendChild(buildSwitcher());
            mobileList.insertBefore(holder, mobileList.firstChild);
        }
    }

    /* ------------------------------ Init ------------------------------ */
    function init() {
        injectStyle();
        mountSwitchers();

        var saved = null;
        try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* abaikan */ }
        applyLang(saved === 'id' || saved === 'en' ? saved : DEFAULT_LANG);
    }

    /* API kecil kalau mau dipanggil manual: window.setLanguage('id') */
    window.setLanguage = applyLang;
    window.getLanguage = function () { return currentLang; };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
