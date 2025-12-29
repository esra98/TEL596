/************************
 * CONFIGURATION
 ************************/
const HARDCODED_PASSWORD = "TEL596";

/************************
 * MOCK DATA
 ************************/
const data = [
  {
    name: "Serkan Anılır, Kemal Alemdaroğlu VAKALARI",
    pdf: "https://ninova.itu.edu.tr/Sinif/35241.111171/Odev/235745",
    youtube_url: "https://www.youtube.com/embed/zFOXIcd8_Rc",
  },
  {
    name: "Salih Ergün, WASET, TÖK/ZÖK VAKALARI",
    youtube_url: "https://www.youtube.com/embed/v53f0d66cvc?start=2",
  },
  {
    name: "AA VAKASI",
    presenter: "Eren Taha Yüzgeç",
    youtube_url: "https://www.youtube.com/embed/1nT77hdyOU8?start=2",
  },
];

/************************
 * DOM REFERENCES
 ************************/
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password-input");
const passwordButton = document.getElementById("password-button");
const errorDiv = document.getElementById("error");

const container = document.getElementById("container");
const itemsDiv = document.getElementById("items");

const detailView = document.getElementById("detail");
const detailTitle = document.getElementById("detail-title");
const detailPresenter = document.getElementById("detail-presenter");
const presenterRow = document.getElementById("presenter-row");
const detailPdf = document.getElementById("detail-pdf");
const pdfRow = document.getElementById("pdf-row");
const detailVideo = document.getElementById("detail-video");
const backButton = document.getElementById("back-button");

/************************
 * NAVIGATION HELPERS
 ************************/
function showList() {
  detailView.classList.add("hidden");
  container.classList.remove("hidden");
}

function showDetailPage() {
  container.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/************************
 * PASSWORD LOGIC
 ************************/
passwordButton.addEventListener("click", () => {
  if (passwordInput.value === HARDCODED_PASSWORD) {
    sessionStorage.setItem("authenticated", "true");
    passwordScreen.classList.add("hidden");
    showList();
    loadItems();
  } else {
    errorDiv.textContent = "Incorrect password";
  }
});

/************************
 * LIST RENDERING
 ************************/
function loadItems() {
  itemsDiv.innerHTML = "";

  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item.presenter
      ? `${item.name} — ${item.presenter}`
      : item.name;

    div.addEventListener("click", () => showDetail(index));
    itemsDiv.appendChild(div);
  });
}

/************************
 * DETAIL VIEW
 ************************/
function showDetail(index) {
  const item = data[index];

  // Title (mandatory)
  detailTitle.textContent = item.name;

  // Presenter (optional)
  if (item.presenter) {
    detailPresenter.textContent = item.presenter;
    detailPresenter.parentElement.classList.remove("hidden");
  } else {
    detailPresenter.parentElement.classList.add("hidden");
  }

  // PDF (optional)
  if (item.pdf) {
    detailPdf.href = item.pdf;
    detailPdf.parentElement.classList.remove("hidden");
  } else {
    detailPdf.parentElement.classList.add("hidden");
  }

  // YouTube embed (optional, SAFE)
  if (item.youtube_url) {
    detailVideo.innerHTML = `
      <iframe
        class="w-full"
        src="${item.youtube_url}"
        title="YouTube video player"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    detailVideo.classList.remove("hidden");
  } else {
    detailVideo.innerHTML = "";
    detailVideo.classList.add("hidden");
  }

  // Navigation
  container.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/************************
 * BACK BUTTON
 ************************/
backButton.addEventListener("click", () => {
  detailVideo.innerHTML = ""; // stop video
  detailView.classList.add("hidden");
  container.classList.remove("hidden");
});

/************************
 * INIT
 ************************/
if (sessionStorage.getItem("authenticated") === "true") {
  passwordScreen.classList.add("hidden");
  showList();
  loadItems();
}
