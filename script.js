// IMPORTS FOR ROUTING AND HANDLING USERS.
import { HASH_ROUTES, ALLOWED_ROUTES } from "./constants.js";
import {
  getElementById,
  getHashRoute,
  hideAllSections,
  getCurrentLoggedInUsername,
  handleLoggedInUserElements,
  handleLoggedOutUserElements,
  handleUserLogout,
} from "./helpers.js";

// IMPORTS FOR INFORMATION PAGE.
import { infoCardsData } from "./info-page/infoCardsData.js";
import { initializeInfoCards, filterCardsByCategory, generateModalFunctionality } from "./info-page/infoPage.js";

// IMPORTS FOR DISCUSSION PAGE.
import { initDiscussionPage } from "./discussion-page/discussionsPage.js";

// IMPORTS FOR PROFILE PAGE.
import {
  updateUsernamePlaceholder,
  initializeInputs,
  handleInputChange,
  updateProfileImage,
  trackUserClickActivity,
  trackUserSharingExperience,
} from "./profile-page/profilePage.js";

hideAllSections();

// ROUTING AND HANDLING USERS.
const initializeApp = () => {
  const refreshRouteContent = (hashRoute) => {
    switch (hashRoute) {
      case HASH_ROUTES.infoPage:
        location.reload();
        initializeInfoCards();
        filterCardsByCategory();
        generateModalFunctionality(infoCardsData);
        break;
      case HASH_ROUTES.discussionPage:
        initDiscussionPage();
        break;
      case HASH_ROUTES.loginPage:
        location.hash = HASH_ROUTES.loginPage;
        break;
      case HASH_ROUTES.profilePage:
        initializeInputs();
        updateUsernamePlaceholder();
        updateProfileImage();
        trackUserClickActivity();
        trackUserSharingExperience();
        break;
      case HASH_ROUTES.contactPage:
        location.hash = HASH_ROUTES.contactPage;
        break;
      default:
        location.hash = HASH_ROUTES.homePage;
        break;
    }
  };

  const currentHashRoute = getHashRoute();
  const currentUsername = getCurrentLoggedInUsername();

  if (currentUsername) {
    handleLoggedInUserElements();
  } else {
    handleLoggedOutUserElements();
  }

  // DEFAULT PAGE IF NO ROUTE IS REQUESTED VIA THE URL.
  if (!currentHashRoute) {
    location.hash = HASH_ROUTES.homePage;
  } else {
    document.querySelector(`#${currentHashRoute}`).style.display = "block";
  }

  // HANDLING HASH ROUTE CHANGES.
  window.addEventListener("hashchange", () => {
    const hashRoute = getHashRoute();
    const currentSection = document.querySelector(`#${hashRoute}`);

    hideAllSections();

    if (ALLOWED_ROUTES.includes(hashRoute)) {
      // WHEN A VALID ROUTE IS REQUESTED.
      currentSection.style.display = "block";
      refreshRouteContent(hashRoute);
    } else {
      // WHEN INVALID ROUTE IS REQUESTED, REDIRECTS TO HOME PAGE.
      location.hash = HASH_ROUTES.homePage;
    }

    // CHECK IF USER IS LOGGED IN AND DISPLAY/HIDE CONTENT DEPENDING ON IT.
    const currentUsername = getCurrentLoggedInUsername();
    if (currentUsername) {
      handleLoggedInUserElements();
    } else {
      handleLoggedOutUserElements();
    }
  });

  // HANDLING THE LOGIN LOGIC.
  document.querySelector("#login-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = getElementById("username").value;
    const password = getElementById("password").value;

    const requestData = { username, password };

    fetch("http://localhost:5000/api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        // WHEN THE LOGIN IS SUCCESSFUL, SETTING THE USERNAME IN LOCAL STORAGE AND SHOWING THE MODAL.
        localStorage.setItem("currentUsername", username);

        // UPDATING THE PROFILE PAGE INFO.
        initializeInputs();
        updateUsernamePlaceholder();
        updateProfileImage();

        const modal = new bootstrap.Modal(document.getElementById("staticBackdropLogin"));
        modal.show();

        document.querySelector("#navigateHomePage").addEventListener("click", () => {
          modal.hide();
          location.hash = HASH_ROUTES.infoPage;
        });
      })
      .catch((error) => {
        // ALERT IF THE LOGIN FAILED OR INCORRECT CREDENTIALS ARE ENTERED.
        console.error(error);
        const toast = new bootstrap.Toast(document.getElementById("error-toast"));
        toast.show();
      });
  });

  // PASS THE handleUserLogout FUNCTION BY REFERENCE.
  getElementById("logout").addEventListener("click", handleUserLogout);
};

// CALLING FUNCTIONS AFTER THE DOM CONTENT IS FULLY LOADED.
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  // CALLING FUNCTIONS FOR THE INFORMATION PAGE.
  initializeInfoCards();
  filterCardsByCategory();

  // CALLING FUNCTIONS FOR THE DISCUSSION PAGE.
  initDiscussionPage();

  // CALLING FUNCTIONS FOR THE PROFILE PAGE.
  // HANDLE USERNAME.
  updateUsernamePlaceholder();
  updateProfileImage();
  trackUserClickActivity();
  trackUserSharingExperience();

  // HANDLE EMAIL AND BIRTH YEAR INPUT VALUES CHANGE.
  initializeInputs();

  const emailButton = document.querySelector(".email-btn");
  const yearButton = document.querySelector(".year-btn");

  emailButton.addEventListener("click", handleInputChange("email", ".email-btn"));
  yearButton.addEventListener("click", handleInputChange("year", ".year-btn"));
});
