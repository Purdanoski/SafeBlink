import { infoCardsData } from "./infoCardsData.js";
import { getCurrentLoggedInUsername, getElementById, getFiltersSessionKey } from "../helpers.js";
import { trackUserClickActivity } from "../profile-page/profilePage.js";

// INITIALIZING INFO PAGE.
export function initializeInfoCards() {
  const currentUsername = getCurrentLoggedInUsername();
  const activeCategories = getFiltersFromLocalStorage(currentUsername);
  createInfoCards(infoCardsData, activeCategories);
}

// CREATE AND APPEND INFO CARDS.
function createInfoCards(infoCardsData, activeCategories = []) {
  const infoCardsContainer = getElementById("infoCardsContainer");
  infoCardsContainer.innerHTML = "";

  const currentUsername = getCurrentLoggedInUsername();
  const currentUserVideoFiltersSessionKey = getFiltersSessionKey(currentUsername);

  let storedFilters = [];
  if (currentUsername) {
    storedFilters = getFiltersFromLocalStorage(currentUsername);
  }

  const filtersToRender = storedFilters.length > 0 ? storedFilters : activeCategories;

  Object.keys(infoCardsData).forEach((key) => {
    const cardData = infoCardsData[key];

    if (!filtersToRender.length || filtersToRender.includes(cardData.category)) {
      const colDiv = document.createElement("div");
      colDiv.classList.add("col");
      colDiv.setAttribute("data-bs-toggle", "modal");
      colDiv.setAttribute("data-bs-target", "#staticBackdrop");
      colDiv.dataset.cardId = cardData.cardID;

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "info-cards");

      const videoElement = document.createElement("video");
      videoElement.src = cardData.videoSrc;
      videoElement.classList.add("card-video");
      cardDiv.appendChild(videoElement);

      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      const imgElement = document.createElement("img");
      imgElement.src = "../img/playbtn.png";
      imgElement.classList.add("hover-play");
      cardDiv.appendChild(imgElement);

      const titleElement = document.createElement("h6");
      titleElement.classList.add("card-title", "fw-bold");
      titleElement.textContent = cardData.title;
      cardBodyDiv.appendChild(titleElement);

      const textElement = document.createElement("p");
      textElement.classList.add("card-text", "my-3");
      textElement.textContent = cardData.text;
      cardBodyDiv.appendChild(textElement);

      cardDiv.appendChild(cardBodyDiv);

      const footerDiv = document.createElement("div");
      footerDiv.classList.add("card-footer");

      const dateParagraph = document.createElement("p");
      dateParagraph.classList.add("mb-0");
      dateParagraph.textContent = `Објавено на ${cardData.date}`;
      footerDiv.appendChild(dateParagraph);

      cardDiv.appendChild(footerDiv);

      colDiv.appendChild(cardDiv);

      infoCardsContainer.appendChild(colDiv);
    }
  });

  // UPDATING THE FILTERS ONLY IF A USER IS LOGGED IN.
  if (currentUsername) {
    updateFiltersInLocalStorage(currentUserVideoFiltersSessionKey, activeCategories);
  }

  generateModalFunctionality(infoCardsData);
}

// FILTERING INFO CARDS.
export function filterCardsByCategory() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  let activeCategories = getFiltersFromLocalStorage();

  filterButtons.forEach((button) => {
    const buttonText = button.textContent.trim();
    if (activeCategories.includes(buttonText)) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      button.classList.toggle("active");

      activeCategories = Array.from(filterButtons)
        .filter((button) => button.classList.contains("active"))
        .map((button) => button.textContent.trim());

      updateFiltersInLocalStorage(getFiltersSessionKey(getCurrentLoggedInUsername()), activeCategories);

      applyCategoryFilters(activeCategories);
      generateModalFunctionality(infoCardsData);

      // TRACKING USER ACTIVITIES FOR CLICK COUNTER.
      trackUserClickActivity();
    });
  });
}

// FILTER CARDS BASED ON ACTIVE CATEGORY.
function applyCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const activeCategories = Array.from(filterButtons)
    .filter((button) => button.classList.contains("active"))
    .map((button) => button.textContent.trim());

  createInfoCards(infoCardsData, activeCategories);
}

// UPDATING THE FILTERS IN LOCAL STORAGE.
function updateFiltersInLocalStorage(sessionKey, activeCategories) {
  try {
    localStorage.setItem(sessionKey, JSON.stringify(activeCategories));
  } catch (error) {
    console.error("Error updating filters in local storage:", error);
  }
}

// RETRIEVE FILTERS FROM LOCAL STORAGE.
export function getFiltersFromLocalStorage() {
  try {
    const currentUser = getCurrentLoggedInUsername();
    if (currentUser) {
      const sessionKey = getFiltersSessionKey(currentUser);
      const existingFilters = localStorage.getItem(sessionKey);
      if (existingFilters) {
        return JSON.parse(existingFilters);
      }
    }
    return [];
  } catch (error) {
    console.error("Error retrieving filters from local storage:", error);
    return [];
  }
}

// MODAL FUNCTIONALITY AND COMMENT SECTION.
export function generateModalFunctionality(infoCardsData) {
  const cards = document.querySelectorAll(".info-cards");
  const pastCommentsDiv = document.getElementById("pastComments");
  const commentInput = document.getElementById("commentInput");
  const currentUsername = getCurrentLoggedInUsername();
  const newCommentDiv = document.getElementById("new-comment");
  let modalVideo;
  let playBtn;

  if (currentUsername) {
    const author = document.querySelector(".user-name");
    const userImg = document.querySelector(".user-img");
    author.textContent = currentUsername;
    userImg.src = `./img/${currentUsername}.png`;
  }

  newCommentDiv.style.display = currentUsername ? "block" : "none";

  // RENDERING COMMENTS FROM LOCAL STORAGE IF ANY.
  function renderLocalComments(cardKey) {
    const localComments = JSON.parse(localStorage.getItem("comments")) || [];
    const commentsForCard = localComments.filter((comment) => comment.cardID === cardKey);
    commentsForCard.forEach((comment) => {
      renderComment(comment, true);
    });
  }

  // CREATING COMMENTS STRUCTURE, STYLE AND APPENDING THEM.
  function renderComment(comment, isFirstComment = false) {
    const newCommentElement = document.createElement("div");
    newCommentElement.classList.add("previous-comments", "p-3", "my-4");

    const commentTextElement = document.createElement("p");
    commentTextElement.classList.add("previous-comments-text");
    commentTextElement.textContent = comment.text;
    newCommentElement.appendChild(commentTextElement);

    const commentInfoWrapper = document.createElement("div");
    commentInfoWrapper.classList.add("d-flex", "justify-content-between", "align-items-center");

    const commentAuthorElement = document.createElement("p");
    commentAuthorElement.classList.add("mb-0", "published-on", "published-by");
    const profileImageUrl = comment.profileImageUrl || "./img/profile-2.png";
    commentAuthorElement.innerHTML = `<img src="${profileImageUrl}" alt="CommentsImg" /> ${comment.author}`;
    commentInfoWrapper.appendChild(commentAuthorElement);

    const commentTimestampElement = document.createElement("p");
    commentTimestampElement.classList.add("mb-0", "published-on");
    commentTimestampElement.textContent = `Објавено на ${comment.timestamp}`;
    commentInfoWrapper.appendChild(commentTimestampElement);

    newCommentElement.appendChild(commentInfoWrapper);

    // MAKING SURE THE THE NEW COMMENT IS ON TOP.
    if (isFirstComment) {
      pastCommentsDiv.insertBefore(newCommentElement, pastCommentsDiv.firstChild);
    } else {
      pastCommentsDiv.appendChild(newCommentElement);
    }
  }

  // REFRESHING THE MODAL.
  function refreshModalContent(cardID) {
    const cardData = Object.values(infoCardsData).find((data) => data.cardID === cardID);

    const modalTitle = document.querySelector(".modal-title");
    const modalText = document.querySelector(".modal-text");
    modalVideo = document.querySelector(".modal-video");
    playBtn = document.querySelector(".play-btn");

    modalTitle.innerHTML = cardData.title;
    modalText.innerHTML = cardData.text;
    modalVideo.src = cardData.videoSrc;

    pastCommentsDiv.innerHTML = "";
    renderLocalComments(cardID);

    for (const key in cardData.comments) {
      if (cardData.comments.hasOwnProperty(key)) {
        const comment = cardData.comments[key];
        renderComment(comment);
      }
    }

    // HANDLING EVENT LISTENERS FOR THE MODAL VIDEOS, REMOVING TO AVOID DUPLICATION.
    modalVideo.removeEventListener("click", videoClickHandler);
    modalVideo.removeEventListener("play", videoPlayHandler);
    modalVideo.removeEventListener("pause", videoPauseHandler);

    // AUTOPLAY THE VIDEO WHEN IS FULLY LOADED.
    modalVideo.addEventListener(
      "loadedmetadata",
      () => {
        modalVideo.play();
      },
      { once: true }
    );

    // HANDLING EVENT LISTENERS FOR THE MODAL VIDEOS.
    modalVideo.addEventListener("click", videoClickHandler);
    modalVideo.addEventListener("play", videoPlayHandler);
    modalVideo.addEventListener("pause", videoPauseHandler);
  }

  function videoClickHandler() {
    if (modalVideo.paused) {
      modalVideo.play();
      playBtn.style.display = "none";
    } else {
      modalVideo.pause();
      playBtn.style.display = "block";
    }
  }

  function videoPlayHandler() {
    modalVideo.classList.add("video-playing");
    playBtn.style.display = "none";
  }

  function videoPauseHandler() {
    modalVideo.classList.remove("video-playing");
    playBtn.style.display = "block";
  }

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardID = this.parentNode.dataset.cardId;
      refreshModalContent(cardID);
      commentInput.dataset.cardId = cardID;
    });
  });

  // EVENT LISTENER FOR CREATING A NEW COMMENT / ADDITIONAL CHECK IF A USER IS LOGGED IN.
  if (currentUsername) {
    newCommentDiv.style.display = "block";
    commentInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const cardID = this.dataset.cardId;
        const commentText = commentInput.value.trim();
        const profileImageUrl = currentUsername ? `./img/${currentUsername}.png` : "./img/profile-2.png";
        if (commentText !== "") {
          const comment = {
            text: commentText,
            author: currentUsername,
            timestamp: new Date().toLocaleString(),
            cardID: cardID,
            profileImageUrl: profileImageUrl,
          };

          renderComment(comment, true);

          const localComments = JSON.parse(localStorage.getItem("comments")) || [];
          localComments.push(comment);
          localStorage.setItem("comments", JSON.stringify(localComments));

          commentInput.value = "";
        }
        event.preventDefault();
      }
    });
  }
}
