// DISCUSSIONS PAGE
import { sharedExperiencesData } from "./sharedExperiencesData.js";
import { getCurrentLoggedInUsername, getElementById } from "../helpers.js";

// GETTING SAVED EXPERIENCES FROM LOCAL STORAGE
function getStoredExperiences() {
  const storedExperiences = localStorage.getItem("experiences");
  return storedExperiences ? JSON.parse(storedExperiences) : [];
}

// SAVING IN LOCAL STORAGE
export function storeExperiences(experiences) {
  localStorage.setItem("experiences", JSON.stringify(experiences));
}

// POPULATING THE PAGE
export function populateDiscussionPage() {
  const discussionsContainer = getElementById("discussions-container");
  discussionsContainer.innerHTML = "";

  // CARD FOR ENTERING AN EXPERIENCE
  const inputCard = createInputCard();
  if (inputCard) {
    discussionsContainer.appendChild(inputCard);
  }

  // DISPLAY STORED EXPERIENCES FROM ANOTHER USERS
  const storedExperiences = getStoredExperiences();
  storedExperiences.forEach((experience) => {
    const experienceCard = createExperienceCard(experience);
    discussionsContainer.appendChild(experienceCard);
  });

  // HARDCODED CARDS OF SHARED EXPERIENCES
  sharedExperiencesData.forEach((experience, index) => {
    if (index === 0 && getCurrentLoggedInUsername()) {
      return;
    }
    const experienceCard = createExperienceCard(experience);
    discussionsContainer.appendChild(experienceCard);
  });

  initMasonryLayout();
}

// ADDING NEW EXPERIENCE - STORING IT AND REPOPULATE THE PAGE
export function addNewExperience(newExperienceText) {
  const currentUsername = getCurrentLoggedInUsername();
  const profileImageUrl = currentUsername ? `./img/${currentUsername}.png` : "./img/profile-2.png";

  const newExperience = {
    text: newExperienceText,
    author: currentUsername,
    timestamp: new Date().toLocaleString(),
    profileImageUrl: profileImageUrl,
  };

  const storedExperiences = getStoredExperiences();
  storedExperiences.unshift(newExperience);
  storeExperiences(storedExperiences);

  populateDiscussionPage();
  initMasonryLayout();
}

// CREATING THE INPUT FIELD FOR ADDING NEW EXPERIENCE
export function createInputCard() {
  const currentUsername = getCurrentLoggedInUsername();
  if (!currentUsername) {
    return null;
  }
  const inputCard = document.createElement("div");
  inputCard.className = "col-lg-4 mb-4 msnry new-experience";
  inputCard.innerHTML = `
        <div class="card ">
            <div class="card-body pb-0">
                <div class="mb-3">
                    <input type="text" id="experienceInput" class="form-control" placeholder="Сподели искуство..." />
                </div>
            </div>
            <div class="card-footer d-flex align-items-center pt-0">
                <img src="./img/${currentUsername}.png" alt="Small Image" class="me-3" />
                <p class="mb-0">${currentUsername}</p>
            </div>  
        </div>`;

  return inputCard;
}

// CREATING AN EXPERIENCE CARD STRUCTURE AND CLASSES
export function createExperienceCard(experience) {
  const currentUsername = getCurrentLoggedInUsername();
  const profileImageUrl = experience.profileImageUrl || "./img/profile-2.png";
  const experienceCard = document.createElement("div");
  experienceCard.className = "col-lg-4 mb-4 msnry";
  const randomColorClass = getRandomColorClass();
  experienceCard.innerHTML = `
        <div class="card ${randomColorClass} new-experience">
            <div class="card-body">
                <p class="card-text">${experience.text}</p>
            </div>
            <div class="card-footer">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center">
                    <img src="${profileImageUrl}" alt="Profile Image" class="me-3" />
                        <p class="mb-0">${experience.author}</p>
                    </div>
                    <p class="mb-0">${experience.timestamp}</p>
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control mb-3" placeholder="Пиши коментар..." disabled />
                </div>
                <div class="d-flex justify-content-between">
                    <img src="./img/+.png" alt="PlusSign" class="plus-sign" />
                    <p class="mb-0">5 Коментари</p>
                    <p class="mb-0">84 Реакции</p>
                </div>
            </div>
        </div>`;

  return experienceCard;
}

// GETTING A RANDOM CLASS FOR THE EXPERIENCE CARD BACKGROUND
export function getRandomColorClass() {
  const backgroundColorClasses = ["card-green", "card-purple", "card-blue"];
  return backgroundColorClasses[Math.floor(Math.random() * backgroundColorClasses.length)];
}

// INITIALIZING MASONRY LAYOUT
export function initMasonryLayout() {
  const grid = document.querySelector(".row.flex-column.flex-lg-row");
  const masonry = new Masonry(grid, {
    itemSelector: ".msnry",
    columnWidth: ".msnry",
  });
  masonry.layout();
}

export function initDiscussionPage() {
  populateDiscussionPage();

  const inputElement = getElementById("experienceInput");
  if (inputElement) {
    inputElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const newExperienceText = event.target.value.trim();
        if (newExperienceText !== "") {
          addNewExperience(newExperienceText);
          event.target.value = "";
        }
      }
    });
  }

  initMasonryLayout();
}
