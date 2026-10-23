
// ========================================
// DEVIKA'S BIRTHDAY SURPRISE
// JavaScript
// ========================================

const $ = (id) => document.getElementById(id);

const photoGrid = $("photoGrid");
const slideStatus = $("slideStatus");
const stage = $("slideshowStage");
const stageImage = $("stageImage");
const stageCaption = $("stageCaption");
const music = $("bgMusic");
const soundToggle = $("soundToggle");
const playButton = $("playSlideshow");

// ========================================
// BIRTHDAY PHOTOS
// ========================================

const photoCaptions = [
  "Your favourite moment ♡",
  "That beautiful smile ✨",
  "Memories to treasure ✿",
  "A moment to remember ♡",
  "Beautiful memories ✨",
  "A smile that lights up the day 💖",
  "Little moments, big smiles ✿",
  "Moments worth keeping forever ♡",
  "A memory close to the heart ✨",
  "A smile I'll always remember ♡",
  "One of my favourite memories 💖",
  "Keep shining, beautiful soul 🌸"
];


let photos = [
  { url: "photos/devika1.jpeg", name: "Your favourite moment ♡" },
  { url: "photos/devika2.jpg", name: "That beautiful smile ✨" },
  { url: "photos/devika3.jpg", name: "Memories to treasure ✿" },
  { url: "photos/devika4.jpeg", name: "A moment to remember ♡" },
  { url: "photos/devika5.jpg", name: "Beautiful memories ✨" },
  { url: "photos/devika6.jpeg", name: "A smile that lights up the day 💖" },
  { url: "photos/devika7.jpg", name: "Little moments, big smiles ✿" },
  { url: "photos/devika8.jpg", name: "Moments worth keeping forever ♡" },
  { url: "photos/devika9.jpg", name: "A memory close to the heart ✨" },
  { url: "photos/devika10.jpeg", name: "A smile I'll always remember ♡" },
  { url: "photos/devika11.jpeg", name: "One of my favourite memories 💖" },
  { url: "photos/devika12.jpeg", name: "Keep shining, beautiful soul 🌸" }
];


// ========================================
// CONFETTI ANIMATION
// ========================================

function burstConfetti(amount = 90) {
  const layer = $("confetti-layer");
  if (!layer) return;

  const colors = [
    "#f2a8c5",
    "#c8b4ff",
    "#ffe1a8",
    "#fff0f5",
    "#b9ead7"
  ];

  for (let i = 0; i < amount; i++) {
    const bit = document.createElement("span");

    bit.className = "confetti";
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    bit.style.setProperty(
      "--fall",
      `${2.2 + Math.random() * 2.8}s`
    );

    bit.style.animationDelay = `${Math.random() * 0.65}s`;
    bit.style.transform = `rotate(${Math.random() * 360}deg)`;

    layer.appendChild(bit);
    setTimeout(() => bit.remove(), 6000);
  }
}

// ========================================
// BIRTHDAY SURPRISE BUTTON
// ========================================

$("openSurprise").addEventListener("click", () => {
  $("wish").scrollIntoView({ behavior: "smooth" });
  burstConfetti(65);
});

$("exploreMemories").addEventListener("click", () => {
  photoGrid.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// ========================================
// BACK TO TOP BUTTON
// ========================================

$("backTop").addEventListener("click", () => {
  $("home").scrollIntoView({ behavior: "smooth" });
});

// ========================================
// BACKGROUND MUSIC
// ========================================

soundToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      soundToggle.innerHTML = "♫ <span>Music on</span>";
      soundToggle.setAttribute("aria-pressed", "true");
    } catch {
      alert(
        "Add your MP3 file as music/song.mp3, then tap Music again."
      );
    }
  } else {
    music.pause();
    soundToggle.innerHTML = "♫ <span>Music off</span>";
    soundToggle.setAttribute("aria-pressed", "false");
  }
});

// ========================================
// ADD EXTRA PHOTOS
// ========================================


// ========================================
// RENDER PHOTO GALLERY
// ========================================

function renderPhotos() {
  photoGrid.innerHTML = "";

  photos.forEach((photo, index) => {
    const card = document.createElement("div");

    card.className =
      "photo-card" + (index === 0 ? " photo-tall" : "");

    const img = document.createElement("img");
    img.alt = `Devika memory ${index + 1}`;
    img.loading = "lazy";

    const imagePaths = photo.alternatives || [photo.url];
    let extensionIndex = 0;

    img.addEventListener("error", () => {
      extensionIndex++;

      if (extensionIndex < imagePaths.length) {
        img.src = imagePaths[extensionIndex];
      } else {
        img.alt = "Photo could not be loaded";
      }
    });

    img.src = imagePaths[extensionIndex];

    const caption = document.createElement("div");
    caption.className = "photo-caption";
    caption.textContent = photo.name || "A lovely memory ♡";

    
    card.append(img, caption);

    card.addEventListener("click", () => {
      openSlide(index);
    });


    card.title = "Click to view this memory";
    photoGrid.appendChild(card);
  });


}

renderPhotos();

// ========================================
// SLIDESHOW CONTROLS
// ========================================

let currentSlide = 0;
let slideTimer = null;

function openSlide(index) {
  if (photos.length === 0) {
    slideStatus.textContent = "Please add photos first.";
    return;
  }

  currentSlide = (index + photos.length) % photos.length;

  const photo = photos[currentSlide];

  stageImage.onerror = () => {
    slideStatus.textContent =
      "Photo failed to load: " + photo.url;
  };

  stageImage.onload = () => {
    slideStatus.textContent =
      `Memory ${currentSlide + 1} of ${photos.length}`;
  };

  stageImage.src = photo.url;
  stageImage.alt = `Birthday memory ${currentSlide + 1}`;

  stageCaption.textContent =
    `${photo.name || "A lovely memory ♡"} · ` +
    `${currentSlide + 1} of ${photos.length}`;

  slideStatus.textContent =
    `Memory ${currentSlide + 1} of ${photos.length}`;

  stage.hidden = false;
}

function stopSlideshow() {
  if (slideTimer !== null) {
    clearInterval(slideTimer);
    slideTimer = null;
  }

  playButton.textContent = "▶ Play slideshow";
}

function startSlideshow() {
  if (photos.length === 0) {
    slideStatus.textContent = "Please add photos first.";
    return;
  }

  // Prevent multiple timers from running
  stopSlideshow();

  // Show the first/current slide immediately
  openSlide(currentSlide);

  playButton.textContent = "Ⅱ Pause slideshow";

  // Advance to the next slide every 2.5 seconds
  slideTimer = setInterval(() => {
    currentSlide = (currentSlide + 1) % photos.length;
    openSlide(currentSlide);
  }, 2500);
}

// Register the Play/Pause handler only once
playButton.addEventListener("click", () => {
  if (slideTimer !== null) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

// ========================================
// GALLERY PREVIOUS/NEXT CONTROLS
// ========================================

$("prevSlide").addEventListener("click", () => {
  const firstCard = photoGrid.querySelector(".photo-card");

  if (!firstCard) {
    slideStatus.textContent = "Add photos to start your memory lane";
    return;
  }

  const gap =
    parseFloat(getComputedStyle(photoGrid).columnGap) || 0;

  photoGrid.scrollBy({
    left: -(firstCard.getBoundingClientRect().width + gap),
    behavior: "smooth"
  });
});

$("nextSlide").addEventListener("click", () => {
  const firstCard = photoGrid.querySelector(".photo-card");

  if (!firstCard) {
    slideStatus.textContent = "Add photos to start your memory lane";
    return;
  }

  const gap =
    parseFloat(getComputedStyle(photoGrid).columnGap) || 0;

  photoGrid.scrollBy({
    left: firstCard.getBoundingClientRect().width + gap,
    behavior: "smooth"
  });
});

// ========================================
// CLOSE THE SLIDESHOW
// ========================================

function closeSlideshow() {
  stage.hidden = true;
  stopSlideshow();
}

$("closeStage").addEventListener("click", closeSlideshow);

stage.addEventListener("click", (event) => {
  if (event.target === stage) {
    closeSlideshow();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !stage.hidden) {
    closeSlideshow();
  }
});

// ========================================
// BIRTHDAY CAKE CANDLES
// ========================================

$("wishFlames").querySelectorAll("button").forEach((flame) => {
  flame.addEventListener("click", () => {
    flame.classList.add("blown");

    const allFlames = Array.from(
      $("wishFlames").querySelectorAll("button")
    );

    const allBlown = allFlames.every((button) =>
      button.classList.contains("blown")
    );

    if (allBlown) {
      $("wishResult").textContent =
        "All your candles are out — may every beautiful wish " +
        "find its way to you, Devika! 💖";

      burstConfetti(65);
    }
  });
});

// ========================================
// SEND BIRTHDAY WISHES
// ========================================

$("wishButton").addEventListener("click", () => {
  $("wishResult").textContent =
    "A little wish is on its way: may your year be filled with " +
    "love, laughter, good health, and wonderful surprises. " +
    "Happy Birthday, Devika! ✨";

  burstConfetti(120);
});
