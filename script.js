/**
 * ====================================================================
 * A1 RENT CAR TASIKMALAYA - INTERACTIVE ENGINE & UI CONTROLLER
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     1. THEME CONTROLLER (DARK / LIGHT MODE WITH LOCALSTORAGE)
     ========================================================== */
  const darkBtn = document.getElementById("darkBtn");
  const savedTheme = localStorage.getItem("a1_theme");

  // Check saved theme or system preference
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("a1_theme", isDark ? "dark" : "light");
    });
  }

  /* ==========================================================
     2. SCROLL PROGRESS BAR & NAVBAR SHADOW & SCROLL SPY
     ========================================================== */
  const scrollProgress = document.getElementById("scrollProgress");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");
  const sections = document.querySelectorAll("section[id], footer[id]");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Scroll progress bar
    if (scrollProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Navbar scroll effect
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Active link on scroll (Scrollspy)
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  /* ==========================================================
     3. MOBILE HAMBURGER NAVIGATION
     ========================================================== */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navRight = document.getElementById("navRight");
  const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector("i") : null;

  if (hamburgerBtn && navRight) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navRight.classList.toggle("active");

      if (hamburgerIcon) {
        if (navRight.classList.contains("active")) {
          hamburgerIcon.classList.replace("fa-bars", "fa-xmark");
        } else {
          hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
        }
      }
    });

    // Close when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navRight.classList.remove("active");
        if (hamburgerIcon) hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navRight.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navRight.classList.remove("active");
        if (hamburgerIcon) hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
      }
    });
  }

  /* ==========================================================
     4. HERO CAR SLIDER WITH DOT PAGINATION
     ========================================================== */
  const sliderImg = document.getElementById("slider");
  const sliderDotsContainer = document.getElementById("sliderDots");

  const heroImages = [
    { src: "Image/Innova.avif", name: "Toyota Innova Reborn" },
    { src: "Image/Brio Lemn.png", name: "Honda Brio" },
    { src: "Image/N Max.png", name: "Yamaha NMAX 155" },
    { src: "Image/Toyota-Fortuner no Background.png", name: "Toyota Fortuner GR" },
    { src: "Image/PCX.png", name: "Honda PCX 160" },
    { src: "Image/Xpander No Bg.png", name: "Mitsubishi Xpander" },
    { src: "Image/Beat.png", name: "Honda Beat" },
    { src: "Image/Pajero No Bg.png", name: "Mitsubishi Pajero Dakar" },
    { src: "Image/Toyota Hiace No Bg.png", name: "Toyota Hiace" }
  ];

  let currentSlide = 0;
  let sliderTimer = null;

  // Build Pagination Dots
  if (sliderDotsContainer) {
    sliderDotsContainer.innerHTML = "";
    heroImages.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(idx));
      sliderDotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!sliderDotsContainer) return;
    const dots = sliderDotsContainer.querySelectorAll(".slider-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  function goToSlide(idx) {
    if (!sliderImg) return;
    currentSlide = idx;
    sliderImg.style.opacity = "0";
    sliderImg.style.transform = "scale(0.95)";

    setTimeout(() => {
      sliderImg.src = heroImages[currentSlide].src;
      sliderImg.alt = heroImages[currentSlide].name;
      sliderImg.style.opacity = "1";
      sliderImg.style.transform = "scale(1)";
      updateDots();
    }, 250);
  }

  function startSliderAutoPlay() {
    sliderTimer = setInterval(() => {
      currentSlide = (currentSlide + 1) % heroImages.length;
      goToSlide(currentSlide);
    }, 3800);
  }

  if (sliderImg) {
    startSliderAutoPlay();
    const sliderWrapper = sliderImg.closest(".slider-wrapper");
    if (sliderWrapper) {
      sliderWrapper.addEventListener("mouseenter", () => clearInterval(sliderTimer));
      sliderWrapper.addEventListener("mouseleave", () => startSliderAutoPlay());
    }
  }

  /* ==========================================================
     5. ANIMATED STATISTICS COUNTERS
     ========================================================== */
  const statNumbers = document.querySelectorAll(".stat-num");
  let animatedStats = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute("data-target");
      const duration = 1500;
      const step = Math.ceil(target / (duration / 25));
      let count = 0;

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = count;
        }
      }, 25);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        runCounters();
        animatedStats = true;
      }
    });
  }, { threshold: 0.5 });

  const heroStatsEl = document.querySelector(".hero-stats");
  if (heroStatsEl) statsObserver.observe(heroStatsEl);

  /* ==========================================================
     6. INTERACTIVE RENTAL ESTIMATOR CALCULATOR
     ========================================================== */
  const calcCar = document.getElementById("calcCar");
  /* ==========================================================
     WHATSAPP BOOKING TEMPLATE GENERATOR
     ========================================================== */
  const WA_PHONE_NUMBER = "6281284702322";

  function createBookingMessage({ carName = "", duration = "", service = "" } = {}) {
    const durasiText = duration ? duration : "";
    const typeText = carName ? carName : "";

    const palm = "\uD83C\uDF34";
    const carEmoji = "\uD83D\uDE97";
    const motorEmoji = "\uD83D\uDEF5";
    const prayEmoji = "\uD83D\uDE4F\uD83C\uDFFB";

    return "Selamat datang di A1 RENT CAR TASIKMALAYA\n\n\n" +
      carEmoji + motorEmoji + "FORM PEMESANAN" + motorEmoji + carEmoji + "\n" +
      "————————————————\n" +
      palm + "Nama : \n" +
      palm + "NO Hp Aktif : \n" +
      palm + "NO HP darurat : \n" +
      palm + "Durasi Sewa : " + durasiText + "\n" +
      palm + "Tanggal Sewa : \n" +
      palm + "Jam sewa : \n" +
      palm + "Alamat penyewa : \n" +
      palm + "Type mobil/motor: " + typeText + "\n" +
      palm + "Tujuan dalam kota/luar : \n" +
      palm + "Akun tiktok : \n" +
      palm + "Akun Instagram : \n" +
      palm + "Akun facebook : \n \n" +
      "Pembayaran cash/tf lunas saat unit di terima\n" +
      "————————————\n" +
      palm + "pemakaian bisa dalam kota/luar kota dengan persetujuan dari awal\n" +
      palm + " khusus motor hanya bisa dalam kota (tasikmalaya dan ciamis)\n" +
      palm + "Copy paste lalu isi form ( gampang simple )\n" +
      palm + " form ini kirim ke wa dan ke dm instagram/tiktok kami \n" +
      palm + "kerusakan dan kehilangan tanggung jawab penyewa.\n" +
      palm + " Lecet ringan perpanel/400k , lecet besar menyesuaikan harga kondisi lecet.\n" +
      palm + "Saat mobil di terima wajib lengkapi tanda terima nota yg di berikan tim lapangan \n" +
      palm + "Pembayaran wajib tf, extend tambah hari atau overtime dan bbm kurang atau lecet konfirmasi ke admin\n" +
      palm + "Booking unit disarankan minimal H-7 , Untuk menjadwal unit dipastikan masuk Down Payment(DP) terlebih dahulu:\n" +
      "4180870062 bca ahmad\n\n" +
      "Isi dengan benar supaya tidak miskom terimakasih" + prayEmoji + palm;
  }

  function getBookingWaUrl(options = {}) {
    const message = createBookingMessage(options);
    return `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // Update and attach events to all booking buttons
  document.querySelectorAll(".btn-book").forEach(btn => {
    const carCard = btn.closest(".car-card");
    const carName = carCard ? carCard.getAttribute("data-name") || "" : "";
    const url = getBookingWaUrl({ carName });
    btn.setAttribute("href", url);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    });
  });

  const heroBookingBtn = document.querySelector(".hero-actions .btn-primary");
  if (heroBookingBtn) {
    const url = getBookingWaUrl();
    heroBookingBtn.setAttribute("href", url);
    heroBookingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    });
  }

  const ctaBookingBtn = document.querySelector(".cta-buttons .btn-cta");
  if (ctaBookingBtn) {
    const url = getBookingWaUrl();
    ctaBookingBtn.setAttribute("href", url);
    ctaBookingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    });
  }

  const durBtns = document.querySelectorAll(".dur-btn");
  const serviceRadios = document.querySelectorAll("input[name='calcService']");
  const calcPriceDisplay = document.getElementById("calcPriceDisplay");
  const calcNoteDisplay = document.getElementById("calcNoteDisplay");
  const calcOrderBtn = document.getElementById("calcOrderBtn");

  let selectedDuration = 12;
  let selectedService = "lepas";

  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  }

  function calculateRental() {
    if (!calcCar) return;

    const selectedOption = calcCar.options[calcCar.selectedIndex];
    const carName = selectedOption.text.split(" - ")[0];
    const price12 = parseInt(selectedOption.getAttribute("data-price12")) || 0;
    const price24 = parseInt(selectedOption.getAttribute("data-price24")) || 0;
    const carPackageType = selectedOption.getAttribute("data-type");

    let baseRate = 0;
    let durText = "";

    // Adjust for All In Van cars (Fortuner, Pajero, Hiace, Elf)
    if (price12 === 0 && selectedDuration === 12) {
      selectedDuration = 24;
      durBtns.forEach(btn => {
        if (btn.getAttribute("data-dur") === "24") btn.classList.add("active");
        else btn.classList.remove("active");
      });
    }

    if (selectedDuration === 12) {
      baseRate = price12;
      durText = "12 Jam";
    } else if (selectedDuration === 24) {
      baseRate = price24;
      durText = "24 Jam (1 Hari)";
    } else if (selectedDuration === 48) {
      baseRate = price24 * 2;
      durText = "2 Hari";
    } else if (selectedDuration === 72) {
      // 3 Days gets 5% discount
      baseRate = Math.round(price24 * 3 * 0.95);
      durText = "3 Hari (Diskon Promo 5%)";
    }

    // Additional Driver fee (+150k/day for standard cars, included for Van, not applicable for Motor)
    let driverFee = 0;
    if (selectedService === "supir" && carPackageType !== "allin" && carPackageType !== "motor") {
      const days = Math.ceil(selectedDuration / 24) || 1;
      driverFee = 150000 * days;
    }

    const totalEstimate = baseRate + driverFee;

    // Update UI display
    if (calcPriceDisplay) {
      calcPriceDisplay.textContent = formatRupiah(totalEstimate);
    }

    if (calcNoteDisplay) {
      const srvText = (carPackageType === "allin") 
        ? "Paket All In (Mobil+Supir+BBM)" 
        : (carPackageType === "motor" 
            ? "Lepas Kunci (Free 2 Helm + Jas Hujan)" 
            : (selectedService === "supir" ? "Dengan Supir (+Rp150rb/hr)" : "Lepas Kunci"));
      calcNoteDisplay.textContent = `*Estimasi sewa ${carName} selama ${durText} (${srvText}).`;
    }

    // Set WhatsApp Order button link
    if (calcOrderBtn) {
      const srvText = (carPackageType === "allin") 
        ? "Paket All In (Mobil+Supir+BBM)" 
        : (carPackageType === "motor" 
            ? "Lepas Kunci (Motor)" 
            : (selectedService === "supir" ? "Dengan Supir" : "Lepas Kunci"));
      const waBookingUrl = getBookingWaUrl({
        carName: carName,
        duration: `${durText} (${srvText})`
      });

      calcOrderBtn.onclick = () => {
        window.open(waBookingUrl, "_blank");
      };
    }
  }

  // Duration toggle events
  durBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      durBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedDuration = parseInt(btn.getAttribute("data-dur"));
      calculateRental();
    });
  });

  // Service toggle events
  serviceRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".radio-card").forEach(c => c.classList.remove("active"));
      radio.closest(".radio-card").classList.add("active");
      selectedService = radio.value;
      calculateRental();
    });
  });

  if (calcCar) {
    calcCar.addEventListener("change", calculateRental);
    calculateRental(); // Initial calculation
  }

  /* ==========================================================
     7. LIVE FLEET SEARCH & FILTER & VIEW ALL CONTROLLER
     ========================================================== */
  const fleetSearchInput = document.getElementById("fleetSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const carCards = document.querySelectorAll(".car-card");
  const viewAllBtn = document.getElementById("viewAllBtn");
  const noCarFound = document.getElementById("noCarFound");

  let activeFilter = "all";
  let isViewAll = false;
  const INITIAL_VISIBLE_COUNT = 3;

  function filterAndDisplayCars() {
    const searchTerm = fleetSearchInput ? fleetSearchInput.value.toLowerCase().trim() : "";
    let matchCount = 0;
    let visibleCount = 0;

    carCards.forEach(card => {
      const category = (card.getAttribute("data-category") || "").toLowerCase();
      const carName = (card.getAttribute("data-name") || "").toLowerCase();

      const matchesCategory = (activeFilter === "all" || category === activeFilter);
      const matchesSearch = (!searchTerm || carName.includes(searchTerm) || category.includes(searchTerm));

      if (matchesCategory && matchesSearch) {
        matchCount++;
        // Display limit rule
        if (isViewAll || activeFilter !== "all" || matchCount <= INITIAL_VISIBLE_COUNT || searchTerm.length > 0) {
          card.classList.remove("hide");
          visibleCount++;
        } else {
          card.classList.add("hide");
        }
      } else {
        card.classList.add("hide");
      }
    });

    // Handle empty search results
    if (noCarFound) {
      noCarFound.style.display = (matchCount === 0) ? "block" : "none";
    }

    // Toggle View All button visibility
    if (viewAllBtn) {
      if (activeFilter !== "all" || matchCount <= INITIAL_VISIBLE_COUNT || searchTerm.length > 0) {
        viewAllBtn.closest(".view-all-wrapper").style.display = "none";
      } else {
        viewAllBtn.closest(".view-all-wrapper").style.display = "flex";
      }
    }
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      isViewAll = false;
      if (viewAllBtn) viewAllBtn.innerHTML = `<span>Lihat Semua Armada</span> <i class="fa-solid fa-chevron-down"></i>`;
      filterAndDisplayCars();
    });
  });

  // Search input with clear button
  if (fleetSearchInput) {
    fleetSearchInput.addEventListener("input", () => {
      if (clearSearchBtn) {
        clearSearchBtn.style.display = (fleetSearchInput.value.length > 0) ? "block" : "none";
      }
      filterAndDisplayCars();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      fleetSearchInput.value = "";
      clearSearchBtn.style.display = "none";
      filterAndDisplayCars();
      fleetSearchInput.focus();
    });
  }

  // View All Vehicles Button
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      isViewAll = !isViewAll;
      if (isViewAll) {
        viewAllBtn.innerHTML = `<span>Sembunyikan Sebagian</span> <i class="fa-solid fa-chevron-up"></i>`;
      } else {
        viewAllBtn.innerHTML = `<span>Lihat Semua Armada</span> <i class="fa-solid fa-chevron-down"></i>`;
      }
      filterAndDisplayCars();
    });
  }

  // Run initial fleet display
  filterAndDisplayCars();

  /* ==========================================================
     8. CAR DETAIL MODAL CONTROLLER
     ========================================================== */
  const carModal = document.getElementById("carModal");
  const modalContent = document.getElementById("modalContent");
  const closeModalBtn = document.getElementById("closeModalBtn");

  const carDetailsDatabase = {
    brio: {
      name: "Honda Brio Satya 1.2 E",
      category: "City Car",
      img: "Image/Brio Lemn.png",
      year: "2025",
      transmission: "Matic (CVT)",
      seats: "4 - 5 Orang",
      fuel: "Bensin (Pertalite / Pertamax)",
      features: ["AC Dingin Double Blower", "Audio Bluetooth & USB", "Kamera Mundur & Sensor Parkir", "Power Steering & Airbags", "Bagasi Cukup Luas"],
      price12: "Rp 250.000",
      price24: "Rp 350.000",
      desc: "City car paling gesit dan irit BBM untuk mobilitas cepat di dalam Kota Tasikmalaya maupun jalanan perkotaan Jawa Barat."
    },
    innova: {
      name: "Toyota Innova Reborn 2.4 V Diesel",
      category: "MPV Premium",
      img: "Image/Innova.avif",
      year: "2021",
      transmission: "Matic (6-Speed AT)",
      seats: "7 Orang",
      fuel: "Diesel / Solar (DEX / Dexlite)",
      features: ["Kabin Kedap & Sangat Nyaman", "Suspensi Empuk untuk Jarak Jauh", "AC Triple Blower Dingin Merata", "Captain Seat Kursi Nyaman", "Full Audio Touchscreen & Bluetooth"],
      price12: "Rp 600.000",
      price24: "Rp 700.000",
      desc: "Unit favorit perjalanan keluarga dan dinas luar kota. Tenaga diesel tangguh dan kenyamanan kabin kelas atas."
    },
    sigra: {
      name: "Daihatsu Sigra 1.2 R Deluxe",
      category: "MPV Ekonomis",
      img: "Image/Sigra No Bg.png",
      year: "2023",
      transmission: "Matic (AT) / Manual (MT)",
      seats: "7 Orang",
      fuel: "Bensin (Hemat BBM)",
      features: ["Kapasitas 7 Kursi Fleksibel", "AC Dingin dengan Air Circulator", "Head Unit Touchscreen", "Konsumsi BBM Super Irit", "Kabin Bersih & Wangi"],
      price12: "Rp 250.000",
      price24: "Rp 350.000",
      desc: "Solusi terbaik sewa mobil keluarga 7 penumpang dengan harga paling hemat dan ramah kantong."
    },
    fortuner: {
      name: "Toyota Fortuner 2.8 GR Sport",
      category: "Luxury SUV",
      img: "Image/Toyota-Fortuner no Background.png",
      year: "2023",
      transmission: "Matic (6-Speed AT)",
      seats: "7 Orang",
      fuel: "Solar / Diesel",
      features: ["Tampilan Gagah & Prestisius", "Interior Kulit Mewah", "Mesin 2.800cc Bertenaga Monster", "Fitur Keselamatan TSS Lengkap", "Cocok Tamu VIP / Acara Pernikahan"],
      price12: "Not Available",
      price24: "Rp 1.300.000",
      desc: "SUV prestisius untuk kebutuhan dinas pejabat, tamu VIP, acara resmi, serta perjalanan mewah."
    },
    xpander: {
      name: "Mitsubishi Xpander Ultimate",
      category: "MPV Keluarga",
      img: "Image/Xpander No Bg.png",
      year: "2023",
      transmission: "Matic (CVT)",
      seats: "7 Orang",
      fuel: "Bensin",
      features: ["Suspensi Paling Lembut di Kelasnya", "Kabin Ekstra Luas & Senyap", "Cruise Control & Audio Canggih", "Banyak Slot Charger HP", "AC Digital Double Blower"],
      price12: "Rp 400.000",
      price24: "Rp 500.000",
      desc: "Mobil keluarga dengan desain modern dan kenyamanan suspensi yang sangat disukai anak-anak & orang tua."
    },
    calya: {
      name: "Toyota Calya 1.2 G",
      category: "MPV Hemat",
      img: "Image/calya no bg.png",
      year: "2023",
      transmission: "Matic (AT) / Manual (MT)",
      seats: "7 Orang",
      fuel: "Bensin",
      features: ["Muat hingga 7 Penumpang", "Lincah & Irit Bahan Bakar", "AC Dingin & Head Unit Audio", "Cocok Perjalanan Wisata", "Unit Bersih Siap Jalan"],
      price12: "Rp 250.000",
      price24: "Rp 350.000",
      desc: "Pilihan favorit untuk sewa harian murah bersama rombongan kecil atau keluarga."
    },
    pajero: {
      name: "Mitsubishi Pajero Sport Dakar 4x2",
      category: "Luxury SUV",
      img: "Image/Pajero No Bg.png",
      year: "2023",
      transmission: "Matic (8-Speed AT)",
      seats: "7 Orang",
      fuel: "Solar / Diesel",
      features: ["Dilengkapi Sunroof Mewah", "Interior Mewah Full Black", "Paddle Shift & Digital Speedometer", "Gagah di Segala Medan", "Sound System Premium"],
      price12: "Not Available",
      price24: "Rp 1.300.000",
      desc: "SUV sporty dengan akselerasi tangguh dan sunroof elegan untuk perjalanan berkelas."
    },
    avanza: {
      name: "All New Toyota Avanza 1.5 TSS",
      category: "MPV Modern",
      img: "Image/Avanza No Bg.png",
      year: "2023",
      transmission: "Matic (CVT) / Manual (MT)",
      seats: "7 Orang",
      fuel: "Bensin",
      features: ["Sofa Mode Kursi Bisa Jadi Kasur", "TSS Safety Sensor Lengkap", "Kabin Baru Luas & Modern", "AC Digital Dingin Cepat", "Audio Bluetooth & USB"],
      price12: "Rp 350.000",
      price24: "Rp 450.000",
      desc: "Generasi baru Avanza penggerak roda depan yang jauh lebih empuk, lega, dan aman untuk keluarga."
    },
    hiace: {
      name: "Toyota Hiace Commuter / Premio",
      category: "Van Pariwisata",
      img: "Image/Toyota Hiace No Bg.png",
      year: "2023",
      transmission: "Manual (Termasuk Supir)",
      seats: "15 Penumpang",
      fuel: "Solar (Termasuk Paket)",
      features: ["Full Karaoke & Sound System", "Kapasitas 15 Kursi Nyaman", "AC Plafon Dingin di Setiap Baris", "Reclining Seat Sandaran", "Paket All In Mobil + Supir + BBM"],
      price12: "Paket All In",
      price24: "Rp 1.800.000",
      desc: "Pilihan utama liburan wisata rombongan keluarga, ziarah, gathering kantor, atau drop-off bandara."
    },
    elf: {
      name: "Isuzu Elf Long Microbus",
      category: "Van Rombongan Besar",
      img: "Image/Elf Long.png",
      year: "2023",
      transmission: "Manual (Termasuk Supir)",
      seats: "19 Penumpang",
      fuel: "Solar (Termasuk Paket)",
      features: ["Kapasitas 19 Kursi Lega", "Full Audio Karaoke & Mic Wireless", "Bagasi Belakang Luas", "AC Ducting Tiap Baris", "Supir Berpengalaman Wisata"],
      price12: "Paket All In",
      price24: "Rp 2.000.000",
      desc: "Microbus kapasitas maksimal untuk perjalanan rombongan besar dengan fasilitas hiburan lengkap."
    },
    beat: {
      name: "Honda BeAT CBS Fi 110cc",
      category: "Sepeda Motor",
      img: "Image/Beat.png",
      year: "2024",
      transmission: "Matic (eSP)",
      seats: "2 Orang",
      fuel: "Bensin (Super Irit)",
      features: ["Termasuk 2 Helm SNI Bersih", "Jas Hujan Siap Pakai", "Konsumsi BBM Super Irit (60 km/L)", "Lincah Selap-Selip Perkotaan", "Unit Selalu Diservis Rutin"],
      price12: "Not Available",
      price24: "Rp 125.000",
      desc: "Motor matic paling lincah dan hemat bahan bakar, cocok untuk mobilitas cepat di Tasikmalaya dan Ciamis tanpa khawatir macet."
    },
    nmax: {
      name: "Yamaha NMAX 155 VVA",
      category: "Maxi Scooter",
      img: "Image/N Max.png",
      year: "2024",
      transmission: "Matic (155cc VVA)",
      seats: "2 Orang",
      fuel: "Bensin (Pertamax)",
      features: ["Termasuk 2 Helm SNI Bersih", "Jas Hujan Berkualitas", "Bagasi Luas Muat Helm Full Face", "Posisi Berkendara Ekstra Nyaman & Santai", "Power Socket Charger HP"],
      price12: "Not Available",
      price24: "Rp 200.000",
      desc: "Skutik maxi premium dengan posisi riding ergonomis, bertenaga besar 155cc VVA, dan bagasi luas untuk perjalanan harian maupun liburan santai."
    },
    pcx: {
      name: "Honda PCX 160 eSP+",
      category: "Premium Scooter",
      img: "Image/PCX.png",
      year: "2024",
      transmission: "Matic (160cc 4-Valves)",
      seats: "2 Orang",
      fuel: "Bensin (Pertamax)",
      features: ["Termasuk 2 Helm SNI Bersih", "Jas Hujan Premium", "Smart Key System (Keyless)", "Bagasi Besar 30 Liter", "USB Charger Type-A"],
      price12: "Not Available",
      price24: "Rp 175.000",
      desc: "Skuter matic mewah dan elegan dengan mesin bertenaga halus 160cc eSP+, kenyamanan suspensi maksimal, serta fitur smart key modern."
    }
  };

  document.querySelectorAll(".btn-card-detail").forEach(btn => {
    btn.addEventListener("click", () => {
      const carKey = btn.getAttribute("data-car");
      const car = carDetailsDatabase[carKey];
      if (!car || !carModal || !modalContent) return;

      modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <span class="section-tag">${car.category}</span>
          <h2 style="font-size: 22px; font-weight: 800; margin: 8px 0;">${car.name}</h2>
          <p style="font-size: 13px; color: var(--text-muted);">${car.desc}</p>
        </div>
        
        <div style="background: var(--bg-body); border-radius: var(--radius-md); padding: 15px; text-align: center; margin-bottom: 20px;">
          <img src="${car.img}" alt="${car.name}" style="max-height: 180px; margin: 0 auto; object-fit: contain;">
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 10px;"><i class="fa-solid fa-list-check text-green"></i> Spesifikasi & Fasilitas:</h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div class="spec-item"><i class="fa-solid fa-users"></i> ${car.seats}</div>
            <div class="spec-item"><i class="fa-solid fa-gear"></i> ${car.transmission}</div>
            <div class="spec-item"><i class="fa-regular fa-calendar"></i> Tahun ${car.year}</div>
            <div class="spec-item"><i class="fa-solid fa-gas-pump"></i> ${car.fuel}</div>
          </div>
          <ul style="list-style: none; margin-top: 12px; font-size: 13px; color: var(--text-muted);">
            ${car.features.map(f => `<li style="margin-bottom: 4px;">✅ ${f}</li>`).join("")}
          </ul>
        </div>

        <div class="pricing-box" style="margin-bottom: 20px;">
          <div class="price-row"><span>Tarif 12 Jam:</span><strong>${car.price12}</strong></div>
          <div class="price-row highlight"><span>Tarif 24 Jam:</span><strong>${car.price24}</strong></div>
        </div>

        <a href="${getBookingWaUrl({ carName: car.name })}" target="_blank" class="btn-primary" style="width: 100%; text-align: center;">
          <i class="fa-brands fa-whatsapp"></i> Pesan ${car.category.includes("Motor") || car.category.includes("Scooter") ? "Motor" : "Mobil"} Ini Sekarang
        </a>
      `;

      carModal.style.display = "flex";
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      if (carModal) carModal.style.display = "none";
    });
  }

  if (carModal) {
    carModal.addEventListener("click", (e) => {
      if (e.target === carModal) carModal.style.display = "none";
    });
  }

  /* ==========================================================
     9. TESTIMONIAL IMAGE LIGHTBOX PREVIEW
     ========================================================== */
  const imageLightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");

  document.querySelectorAll(".review-card, .testimoni-img-card").forEach(card => {
    card.addEventListener("click", () => {
      const imgPath = card.getAttribute("data-img") || (card.querySelector("img") ? card.querySelector("img").src : null);
      if (imgPath && imageLightbox && lightboxImg) {
        lightboxImg.src = imgPath;
        imageLightbox.style.display = "flex";
      }
    });
  });

  if (closeLightboxBtn && imageLightbox) {
    closeLightboxBtn.addEventListener("click", () => {
      imageLightbox.style.display = "none";
    });
    imageLightbox.addEventListener("click", (e) => {
      if (e.target === imageLightbox) imageLightbox.style.display = "none";
    });
  }

  // Close modals on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (carModal) carModal.style.display = "none";
      if (imageLightbox) imageLightbox.style.display = "none";
    }
  });

  /* ==========================================================
     10. FAQ ACCORDION (SMOOTH ANIMATIONS)
     ========================================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove("active");
      });

      // Toggle clicked item
      item.classList.toggle("active", !isActive);
    });
  });

  /* ==========================================================
     11. FLOATING WHATSAPP CHAT POPUP BUBBLE
     ========================================================== */
  const waBubble = document.getElementById("waBubble");
  const closeWaBubble = document.getElementById("closeWaBubble");

  // Show bubble popup after 3.5 seconds
  setTimeout(() => {
    if (waBubble && !sessionStorage.getItem("a1_wa_dismissed")) {
      waBubble.style.display = "block";
    }
  }, 3500);

  if (closeWaBubble && waBubble) {
    closeWaBubble.addEventListener("click", () => {
      waBubble.style.display = "none";
      sessionStorage.setItem("a1_wa_dismissed", "true");
    });
  }

  /* ==========================================================
     12. REAL-TIME SOCIAL PROOF TOAST NOTIFICATIONS
     ========================================================== */
  const liveBookingToast = document.getElementById("liveBookingToast");
  const toastUser = document.getElementById("toastUser");
  const toastMessage = document.getElementById("toastMessage");
  const toastTime = document.getElementById("toastTime");
  const closeToast = document.getElementById("closeToast");

  const recentBookingSamples = [
    { user: "Dadang (Tasikmalaya)", msg: "Baru saja booking Innova Reborn (2 Hari)", time: "2 menit yang lalu" },
    { user: "Bu Sarah (Cihideung)", msg: "Baru saja booking Honda Brio (24 Jam)", time: "5 menit yang lalu" },
    { user: "Sdr. Rendy (Cihideung)", msg: "Baru saja booking Yamaha NMAX (24 Jam)", time: "7 menit yang lalu" },
    { user: "Sdr. Dimas (Indihiang)", msg: "Booking Daihatsu Sigra Lepas Kunci", time: "10 menit yang lalu" },
    { user: "Alfi (Cibeureum)", msg: "Booking Honda Beat (24 Jam)", time: "12 menit yang lalu" },
    { user: "Dara", msg: "Booking Toyota Hiace + Supir untuk Wisata", time: "16 menit yang lalu" },
    { user: "Rian (Singaparna)", msg: "Booking Honda PCX 160 (24 Jam)", time: "20 menit yang lalu" },
    { user: "Pak Haji Dedi (Singaparna)", msg: "Booking Toyota Fortuner GR Sport", time: "24 menit yang lalu" },
    { user: "Kak Nisa (Tawang)", msg: "Booking Mitsubishi Xpander untuk Weekend", time: "30 menit yang lalu" }
  ];

  let toastIndex = 0;
  let toastInterval = null;

  function showNextToast() {
    if (!liveBookingToast || !toastUser || !toastMessage || !toastTime) return;

    const sample = recentBookingSamples[toastIndex];
    toastUser.textContent = sample.user;
    toastMessage.textContent = sample.msg;
    toastTime.textContent = sample.time;

    liveBookingToast.style.display = "flex";

    // Auto hide after 6.5s
    setTimeout(() => {
      liveBookingToast.style.display = "none";
    }, 6500);

    toastIndex = (toastIndex + 1) % recentBookingSamples.length;
  }

  // Start showing social proof notifications after 7 seconds, then every 18 seconds
  setTimeout(() => {
    showNextToast();
    toastInterval = setInterval(showNextToast, 18000);
  }, 7000);

  if (closeToast && liveBookingToast) {
    closeToast.addEventListener("click", () => {
      liveBookingToast.style.display = "none";
      clearInterval(toastInterval);
    });
  }

  /* ==========================================================
     13. SCROLL REVEAL (FADE-IN ANIMATION)
     ========================================================== */
  const fadeElements = document.querySelectorAll(".fade-in");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.12 });

  fadeElements.forEach(el => revealObserver.observe(el));

});
