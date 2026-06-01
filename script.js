// DARK MODE
const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


// SLIDER MOBIL DENGAN EFEK FADE
const slider = document.getElementById("slider");
const images = [
  "Image/Innova.avif",
  "Image/Brio Lemn.png",
  "Image/Sigra No Bg.png",
  "Image/calya no bg.png",
  "Image/Xpander No Bg.png",
  "Image/Toyota-Fortuner no Background.png",
  "Image/Pajero No Bg.png",
  "Image/Avanza No Bg.png",
  "Image/Toyota Hiace No Bg.png",
  "Image/Elf Long.png"
];

let index = 0;

setInterval(() => {
  // 1. Bikin gambarnya transparan dulu
  slider.style.opacity = "0";

  // 2. Tunggu sebentar (setengah detik), lalu ganti gambar dan munculkan lagi
  setTimeout(() => {
    index++;
    if(index >= images.length){
      index = 0;
    }
    slider.src = images[index];
    slider.style.opacity = "1";
  }, 500); 

}, 3500); // Waktu ganti gambar diperpanjang sedikit jadi 3.5 detik


// ANIMASI SCROLL
const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {

  fadeElements.forEach(el => {

    const top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){
      el.classList.add("show");
    }

  });

});

// HAMBURGER MENU MOBILE & ANIMASI IKON X
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navRight = document.getElementById("navRight");
const navLinks = document.querySelectorAll(".nav-menu a");
const hamburgerIcon = hamburgerBtn.querySelector("i"); // Mengambil elemen <i> di dalam tombol

// Klik tombol untuk buka/tutup menu
hamburgerBtn.addEventListener("click", () => {
  navRight.classList.toggle("active");
  
  // Ubah ikon garis tiga (fa-bars) jadi silang (fa-xmark)
  if (navRight.classList.contains("active")) {
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-xmark");
  } else {
    hamburgerIcon.classList.remove("fa-xmark");
    hamburgerIcon.classList.add("fa-bars");
  }
});

// Otomatis tutup menu & kembalikan ikon saat link diklik
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navRight.classList.remove("active");
    hamburgerIcon.classList.remove("fa-xmark");
    hamburgerIcon.classList.add("fa-bars");
  });
});

// FAQ ACCORDION (Animasi Buka Tutup Syarat Sewa)
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  
  question.addEventListener("click", () => {
    // Opsional: Tutup otomatis FAQ lain saat satu FAQ dibuka
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Buka/Tutup FAQ yang diklik
    item.classList.toggle("active");
  });
});