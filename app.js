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
const nextDate = document.querySelector(".next--date");
const buyCount = document.getElementById("buy-count");
const modalAlert = document.getElementById("close-modal");

/*  ********************************************************************************  */

// Global Variables

let PurchaseArray = [];
let savedNumber;
let checker = 0;
let waterPurchaseRoster = ["Uzodike Stephen", "Emeka Achugbu", "Fredrick Ogbe"];

//object to store purchase history
const purchaseHistory =
  JSON.parse(localStorage.getItem("purchaseHistory")) || {};

/*  ********************************************************************************  */

// Functions
const getImage = (profile) => {
  switch (profile) {
    case "Uzodike Stephen":
      pageContainer.style.display = "none";
      profilePage.style.display = "block";
      profileImg.style.backgroundImage = "url(Assets/Nugo.jpg)";
      profileName.textContent = profile;
      displayPurchaseHistory(profile);
      break;
    case "Fredrick Ogbe":
      document.querySelector(".landing--page--container").style.display =
        "none";
      profilePage.style.display = "block";
      profileImg.style.backgroundImage = "url(Assets/fred1.jpg)";
      profileName.textContent = profile;
      displayPurchaseHistory(profile);
      break;
    case "Emeka Achugbu":
      document.querySelector(".landing--page--container").style.display =
        "none";
      profilePage.style.display = "block";
      profileImg.style.backgroundImage = "url(Assets/e-money.jpg)";
      profileName.textContent = profile;
      displayPurchaseHistory(profile);
      break;
    default:
      pageContainer.style.display = "flex";
  }
};

const getNumberFromLocalStorage = () => {
  return localStorage.getItem("myNumber");
};
const savePurchaseHistory = () => {
  localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
};

const recordPurchase = (person) => {
  const currentDate = new Date();
  const purchaseInfo = {
    date: currentDate.toLocaleDateString(),
    time: currentDate.toLocaleTimeString(),
  };

  if (!purchaseHistory[person]) {
    purchaseHistory[person] = [purchaseInfo];
  } else {
    purchaseHistory[person].push(purchaseInfo);
  }

  savePurchaseHistory();
};

const displayPurchaseHistory = (person) => {
  const purchaseHistoryElement = document.querySelector(".purchase--history");
  purchaseHistoryElement.innerHTML = ""; // Clear the content of the element
  buyCount.textContent = "";
  nextDate.textContent = "";
  const lastPurchaseDay = new Date("2023-05-20");
  const nextPurchaseDay = calculateNextPurchaseDay(lastPurchaseDay);


  if (purchaseHistory[person]) {
    purchaseHistory[person].forEach((purchase) => {
      const purchaseItem = document.createElement("div");
      purchaseItem.innerText = `Date: ${purchase.date}, Time: ${purchase.time}`;
      purchaseHistoryElement.appendChild(purchaseItem);
    });
    buyCount.textContent = purchaseHistory[person].length;
    nextDate.textContent = nextPurchaseDay.toDateString().split(" ")[0];
  } else {
    const noHistoryItem = document.createElement("div");
    noHistoryItem.innerText = "No purchase history available.";
    purchaseHistoryElement.appendChild(noHistoryItem);
    buyCount.textContent = 0;
    nextDate.textContent = new Date().toDateString().split(" ")[0];
  }
};

const calculateNextPurchaseDay = (lastPurchaseDay) => {
  const today = new Date();
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  const nextPurchaseDay = new Date(
    lastPurchaseDay.getTime() + twoDaysInMilliseconds
  );

  // Check if the next purchase day is in the future
  if (nextPurchaseDay > today) {
    return nextPurchaseDay;
  } else {
    // If the next purchase day has already passed, calculate the new next purchase day
    const differenceInDays = Math.ceil(
      (today - lastPurchaseDay) / (1000 * 60 * 60 * 24)
    );
    const remainingDays = 2 - (differenceInDays % 2);
    const newNextPurchaseDay = new Date(
      today.getTime() + remainingDays * 24 * 60 * 60 * 1000
    );
    return newNextPurchaseDay;
  }
};

const buyItem = () => {
  let name = profileName.textContent;
  //const lastPurchaseDay = new Date("2023-05-20");
  //const nextPurchaseDay = calculateNextPurchaseDay(lastPurchaseDay);
 // console.log(nextPurchaseDay.toDateString()); // Output: e.g., "Sat May 22 2023"

  if (name !== waterPurchaseRoster[checker]) {
    modalAlert.textContent = `Sorry already purchased! next purchase ${waterPurchaseRoster[checker]}`;
    modal.style.display = "block";
    return;
  } else if (waterPurchaseRoster[checker] === "Fredrick Ogbe") {
    checker = 0;
    nextBuyer.textContent = waterPurchaseRoster[checker]?.split(" ")[0];
    modalAlert.textContent = "Water purchsed successfully!";
    modal.style.display = "block";
    recordPurchase(name);
    displayPurchaseHistory(name);
    return;
  } else {
    modalAlert.textContent = "Water purchsed successfully!";
    modal.style.display = "block";
    checker++;
    localStorage.setItem("myNumber", checker);
    nextBuyer.textContent = waterPurchaseRoster[checker]?.split(" ")[0];
    recordPurchase(name);
    displayPurchaseHistory(name);
  }
};

/*  ********************************************************************************  */
// load windows
window.addEventListener("DOMContentLoaded", () => {
  savedNumber = getNumberFromLocalStorage();
  checker = savedNumber ? savedNumber : checker;
  nextBuyer.textContent = savedNumber
    ? waterPurchaseRoster[savedNumber].split(" ")[0]
    : waterPurchaseRoster[0].split(" ")[0];
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
