import { getCurrentLoggedInUsername } from "../helpers.js";
import { getElementById } from "../helpers.js";

// UPDATING THE USERNAME FIELD
export function updateUsernamePlaceholder() {
  const currentUsername = getCurrentLoggedInUsername();
  const usernameInput = getElementById("usernameProfile");
  if (currentUsername) {
    usernameInput.placeholder = currentUsername;
  }
}

// INITIALIZE EMAIL AND BIRTH YEAR INPUTS.
export function initializeInputs() {
  const currentUsername = localStorage.getItem("currentUsername");
  if (currentUsername) {
    const storedEmail = localStorage.getItem(`${currentUsername}_email`);
    if (storedEmail) {
      const emailInput = getElementById("email");
      emailInput.value = storedEmail;
      emailInput.placeholder = storedEmail;
    }

    const storedYear = localStorage.getItem(`${currentUsername}_year`);
    if (storedYear) {
      const yearInput = getElementById("year");
      yearInput.value = storedYear;
      yearInput.placeholder = storedYear;
    }
  }
}

// HANDLE EMAIL AND BIRTH YEAR INPUT VALUE CHANGE.
export function handleInputChange(inputId, buttonClass) {
  return () => {
    const input = getElementById(inputId);
    const button = document.querySelector(buttonClass);
    const newValue = input.value.trim();

    if (button.textContent === "Промени") {
      button.textContent = "Зачувај";
      input.focus();
    } else {
      input.placeholder = newValue;
      button.textContent = "Промени";

      const currentUsername = localStorage.getItem("currentUsername");
      if (currentUsername) {
        localStorage.setItem(`${currentUsername}_${inputId}`, newValue);
      }
    }
  };
}

// UPDATING THE PROFILE IMAGE IN THE PROFILE PAGE
export function updateProfileImage() {
  const currentUsername = getCurrentLoggedInUsername();

  if (currentUsername) {
    const imageURL = `./img/${currentUsername}.png`;
    const profileImage = document.querySelector(".profile-img img");
    profileImage.src = imageURL;
  }
}

// TRACKING THE USER FOR MINIMUM 5 CLICKS FOR THE BADGE
export function trackUserClickActivity() {
  const watchedFiveBadge = getElementById("watchedFive");
  const currentUsername = getCurrentLoggedInUsername();

  if (!currentUsername) {
    return;
  }

  let clickCounter = localStorage.getItem(`${currentUsername}_clickCounter`) || 0;

  if (clickCounter > 4) {
    watchedFiveBadge.style.display = "block";
  }

  document.querySelectorAll(".info-cards").forEach((card) => {
    card.addEventListener("click", () => {
      clickCounter++;
      localStorage.setItem(`${currentUsername}_clickCounter`, clickCounter);

      if (clickCounter > 4) {
        watchedFiveBadge.style.display = "block";
      }
    });
  });
}

// TRACKING THE USER FOR SHARED EXPERIENCE FOR THE BADGE
export function trackUserSharingExperience() {
  const activeInDiscussionBadge = getElementById("activeInDiscussion");
  const currentUsername = getCurrentLoggedInUsername();

  const experiences = localStorage.getItem("experiences");
  if (experiences) {
    const parsedExperiences = JSON.parse(experiences);

    if (Array.isArray(parsedExperiences)) {
      const hasUserExperience = parsedExperiences.some((experience) => {
        return experience.author === currentUsername;
      });

      if (hasUserExperience) {
        activeInDiscussionBadge.style.display = "block";
        return;
      }
    }
  }

  if (currentUsername) {
    const experienceInput = getElementById("experienceInput");
    experienceInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        activeInDiscussionBadge.style.display = "block";
      }
    });
  }
}
