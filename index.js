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
    youtube_embed:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/zFOXIcd8_Rc?si=XuE20qfePUfBaGVG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    name: "Salih Ergün, WASET, TÖK/ZÖK VAKALARI",
    youtube_embed:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/v53f0d66cvc?si=1_SvtxNzFD3blvJA&amp;start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    name: "AA VAKASI",
    presenter: "Eren Taha Yüzgeç",
    youtube_embed:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/1nT77hdyOU8?si=arLwrFXw_2auCVJz&amp;start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
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

const listView = document.getElementById("list");
const detailView = document.getElementById("detail");

const detailTitle = document.getElementById("detail-title");
const detailPresenter = document.getElementById("detail-presenter");
const detailPdf = document.getElementById("detail-pdf");
const detailVideo = document.getElementById("detail-video");
const backButton = document.getElementById("back-button");

/************************
 * PASSWORD LOGIC
 ************************/
passwordButton.addEventListener("click", checkPassword);

function checkPassword() {
  if (passwordInput.value === HARDCODED_PASSWORD) {
    sessionStorage.setItem("authenticated", "true");
    showMain();
  } else {
    errorDiv.textContent = "Incorrect password";
  }
}

function showMain() {
  passwordScreen.classList.add("hidden");
  container.classList.remove("hidden");
  loadItems();
}

/************************
 * LIST RENDERING
 ************************/
function loadItems() {
  itemsDiv.innerHTML = "";

  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = `${item.name} — ${item.presenter}`;
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
  detailPresenter.textContent = item.presenter;
  detailPdf.href = item.pdf;
  detailVideo.src = item.youtube_embed;

  listView.classList.add("hidden");
  detailView.classList.remove("hidden");
}

/************************
 * BACK TO LIST
 ************************/
backButton.addEventListener("click", () => {
  detailView.classList.add("hidden");
  listView.classList.remove("hidden");
  detailVideo.src = "";
});

/************************
 * INIT
 ************************/
if (sessionStorage.getItem("authenticated") === "true") {
  showMain();
}
