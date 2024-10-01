import { USERNAME_SESSION_KEY, HASH_ROUTES } from "./constants.js";

//SHORT WAY TO GET ELEMENT BY ID.
export const getElementById = (elementId) => document.querySelector(`#${elementId}`);

// GET THE LOCATION HASH
export const getHashRoute = () => location.hash.slice(1);

// HIDING ALL SECTIONS BY DEFAULT
export const hideAllSections = () => {
  document.querySelectorAll("section").forEach((sectionElement) => (sectionElement.style.display = "none"));
};

// GETTING THE USERNAME OF THE CURRENT USER
export const getCurrentLoggedInUsername = () => localStorage.getItem(USERNAME_SESSION_KEY);

// SHOW/HIDE CONTENT BASED ON WHETHER THE USER IS LOGGED IN AND HANDLING LOGOUT LOGIC.
export const handleLoggedInUserElements = () => {
  const currentUsername = getCurrentLoggedInUsername();
  getElementById("login-link").setAttribute("style", "display:none !important");
  getElementById("profile-link").style.display = "block";
  getElementById("logout").style.display = "inline";
  getElementById("logoutIcon").src = `./img/${currentUsername}.png`;
  document.querySelector(".profile-btn-link").href = "#profile-page";
};

export const handleLoggedOutUserElements = () => {
  getElementById("login-link").style.display = "inline";
  getElementById("profile-link").style.display = "none";
  getElementById("logout").style.display = "none";
  getElementById("new-comment").style.display = "none";
  document.querySelector(".profile-btn-link").href = "#login-page";
};

export const handleUserLogout = () => {
  localStorage.removeItem("currentUsername");
  getElementById("login-link").style.display = "inline";
  getElementById("profile-link").style.display = "none";
  getElementById("logout").style.display = "none";
  location.hash = HASH_ROUTES.homePage;
};

// HELPER FOR SETTING KEY IN LOCAL STORAGE FOR THE FILTERS.
export const getFiltersSessionKey = (username) => `${username}_filters`;
