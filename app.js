// || Select all elements
const selectWrap = document.querySelector(".select--wrap");
const defaultWrap = document.querySelector(".default--wrap");
const listItems = document.querySelectorAll(".select--ul li");
const profileBtn = document.getElementById("cart--btn");
const pageContainer = document.querySelector(".landing--page--container");
const profilePage = document.querySelector(".box");
const profileImg = document.querySelector(".profile-image");
const profileInfo = document.querySelector(".profile-info");
const profileName = profileInfo.querySelector(".profile-name");
const buyBtn = document.querySelector(".btn-buy");
const buyHistoryBtn = document.querySelector(".btn-history");
const sideBar = document.querySelector(".side-bar");
const profileCard = document.querySelector(".profile-card");
const buyHistory = profilePage.querySelector(".content");
const buyHistoryTitle = buyHistory.querySelector(".center .title");
const returnBtn = buyHistory.querySelector(".center .arrow-back");
const homeMenu = document.querySelector(".home");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const nextBuyer = document.querySelector(".status-value");

/*  ********************************************************************************  */

// Global Variables

let PurchaseArray = [];
let checker = 0;
let savedNumber;
let waterPurchaseRoster = [
  "Stephen Uzodike",
  "Emeka Achugbu",
  "Fredrick Ogbe",
  "osita",
];

/*  ********************************************************************************  */

// Functions
const getImage = (profile) => {
  switch (profile) {
    case "Uzodike Stephen":
      pageContainer.style.display = "none";
      profilePage.style.display = "block";
      profileImg.style.backgroundImage = "url(Assets/Nugo.jpg)";
      profileName.textContent = profile;
      break;
    case "Fredrick Ogbe":
      document.querySelector(".landing--page--container").style.display =
        "none";
      profilePage.style.display = "block";
      profileImg.style.backgroundImage = "url(Assets/fred1.jpg)";
      profileName.textContent = profile;
      break;
    case "Emeka Achugbu":
      document.querySelector(".landing--page--container").style.display =
        "none";
      profilePage.style.display = "block";
      profileImg.style.backgroundImage = "url(Assets/e-money.jpg)";
      profileName.textContent = profile;
      break;
    default:
      pageContainer.style.display = "flex";
  }
};

const buyItem = () => {
  // check roster for whose turn to purchase water
  let name = profileName.textContent;
  const msg = name === "Uzodike Stephen" ? 1 : name === "Emeka Achugbu" ? 2 : 0;
  PurchaseArray.push(name);
  const namesWithoutDuplicates = [...new Set(PurchaseArray)];
  if (PurchaseArray.length > 1 && PurchaseArray[checker++] === name) {
    document.getElementById(
      "close-modal"
    ).textContent = `Sorry already purchased! next purchase ${waterPurchaseRoster[msg]}`;
    modal.style.display = "block";
    return;
  } else if (namesWithoutDuplicates.length > 3) {
    PurchaseArray = [];
    checker = 0;
    return;
  } else {
    document.getElementById("close-modal").textContent =
      "Water purchsed successfully!";
    modal.style.display = "block";
    localStorage.setItem('myNumber', msg);
    nextBuyer.textContent = waterPurchaseRoster[msg].split(" ")[0];
  }

  
};

const getNumberFromLocalStorage = ()=> {
  return localStorage.getItem('myNumber');
}


/*  ********************************************************************************  */
// load windows 
window.addEventListener('load', ()=> {
  savedNumber = getNumberFromLocalStorage();
  nextBuyer.textContent = waterPurchaseRoster[savedNumber].split(" ")[0];
});


/*  ********************************************************************************  */

// Eventlisteners
defaultWrap.addEventListener("click", () => {
  selectWrap.classList.toggle("active");
});

listItems.forEach((list) => {
  list.addEventListener("click", () => {
    const currentEl = list.innerHTML;
    defaultWrap.querySelector("li").innerHTML = currentEl;
    document.querySelector(".select--ul li.active").classList.remove("active");
    list.classList.add("active");
    selectWrap.classList.remove("active");
  });
});

profileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let selectOption = defaultWrap.querySelector("li .option p").textContent;
  getImage(selectOption);
});

buyBtn.addEventListener("click", buyItem);

buyHistoryBtn.addEventListener("click", () => {
  profileCard.classList.add("card");
  buyHistory.classList.add("bard");
  const name = profileName.textContent;
  buyHistoryTitle.textContent = `${name.split(" ")[0]}'s Purchase Details`;
});

returnBtn.addEventListener("click", () => {
  profileCard.classList.remove("card");
  buyHistory.classList.remove("bard");
});

homeMenu.addEventListener("click", () => {
  profilePage.style.display = "none";
  pageContainer.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
