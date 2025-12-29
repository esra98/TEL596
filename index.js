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
    youtube_embed: "https://www.youtube.com/embed/HIWKxI4PaT0",
  },
  {
    name: "Salih Ergün, WASET, TÖK/ZÖK VAKALARI",
    youtube_embed: "https://www.youtube.com/embed/1nT77hdyOU8?start=2",
  },
  {
    name: "AA VAKASI",
    presenter: "Eren Taha Yüzgeç",
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

  detailTitle.textContent = item.name;

  if (item.presenter) {
    presenterRow.classList.remove("hidden");
    detailPresenter.textContent = item.presenter;
  } else {
    presenterRow.classList.add("hidden");
  }

  if (item.pdf) {
    pdfRow.classList.remove("hidden");
    detailPdf.href = item.pdf;
  } else {
    pdfRow.classList.add("hidden");
  }

  if (item.youtube_embed) {
    detailVideo.classList.remove("hidden");
    detailVideo.src = item.youtube_embed;
  } else {
    detailVideo.classList.add("hidden");
    detailVideo.src = "";
  }

  showDetailPage();
}

/************************
 * BACK BUTTON
 ************************/
backButton.addEventListener("click", () => {
  detailVideo.src = "";
  showList();
});

/************************
 * INIT
 ************************/
if (sessionStorage.getItem("authenticated") === "true") {
  passwordScreen.classList.add("hidden");
  showList();
  loadItems();
}
