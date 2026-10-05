function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }
  return element;
}

const header = createElement("header", "header");
const newGameBtn = createElement("button", "header__btn", "New Game");
const leaderboardBtn = createElement("button", "header__btn", "Leaderboard");

header.append(newGameBtn, leaderboardBtn);

document.body.append(header);

const stats = createElement("div", "stats");
const movesText = createElement("p", "stats__text", "Moves: 0");
const pairsText = createElement("p", "stats__text", "Pairs: 0 / 8");

stats.append(movesText, pairsText);

document.body.append(stats);

const board = createElement("div", "board");

document.body.append(board);

const cardValues = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍓",
  "🍓",
  "🍒",
  "🍒",
  "🍑",
  "🍑",
  "🍍",
  "🍍",
  "🥝",
  "🥝",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffle(cardValues);

let firstCard = null;
let lockBoard = false;
let moves = 0;
let pairs = 0;

for (let i = 0; i < 16; i += 1) {
  const card = createElement("div", "card");
  const value = cardValues[i];

  card.dataset.value = value;

  const valueText = createElement("span", "card__value", value);
  const cardBack = createElement("span", "card__back");

  card.append(valueText, cardBack);
  board.append(card);
  card.addEventListener("click", handleCardClick);
}

function handleCardClick() {
  if (lockBoard) {
    return;
  }

  const card = this;

  if (card.classList.contains("open") || card.classList.contains("matched")) {
    return;
  }

  if (firstCard === null) {
    firstCard = card;
    card.classList.add("open");
    return;
  }

  card.classList.add("open");
  lockBoard = true;
  moves += 1;
  movesText.textContent = "Moves: " + moves;

  if (card.dataset.value === firstCard.dataset.value) {
    card.classList.add("matched");
    firstCard.classList.add("matched");
    pairs += 1;
    pairsText.textContent = "Pairs: " + pairs + " / 8";

    if (pairs === 8) {
      saveResult();
      openModal(getWinContent());
      return;
    }

    firstCard = null;
    lockBoard = false;
    return;
  }

  setTimeout(function () {
    card.classList.remove("open");
    firstCard.classList.remove("open");
    firstCard = null;
    lockBoard = false;
  }, 1000);
}

function createModal() {
  const modal = createElement("div", "modal");
  const overlay = createElement("div", "modal__overlay");
  const content = createElement("div", "modal__content");
  const closeBtn = createElement("button", "modal__close", "×");

  content.append(closeBtn);
  modal.append(overlay, content);

  return modal;
}

function openModal(content) {
  const modal = createModal();
  const modalContent = modal.querySelector(".modal__content");
  modalContent.append(content);
  document.body.append(modal);
  modal.classList.add("open");
  document.body.classList.add("no-scroll");

  const closeBtn = modal.querySelector(".modal__close");
  closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  document.body.classList.remove("no-scroll");
  modal.remove();
}

function getWinContent() {
  const content = createElement("div", "win");
  const title = createElement("h2", "win__title", "You won!");
  const movesInfo = createElement("p", "win__moves", "Moves: " + moves);
  const newGameButton = createElement("button", "win__btn", "New Game");
  const closeButton = createElement("button", "win__btn", "Close");

  content.append(title, movesInfo, newGameButton, closeButton);

  closeButton.addEventListener("click", closeModal);

  newGameButton.addEventListener("click", function () {
    closeModal();
    location.reload();
  });

  return content;
}

function saveResult() {
  const result = {
    moves: moves,
    date: new Date().toISOString(),
  };

  const saved = localStorage.getItem("results");
  const results = saved ? JSON.parse(saved) : [];

  results.push(result);

  results.sort(function (a, b) {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }
    return new Date(a.date) - new Date(b.date);
  });

  const top10 = results.slice(0, 10);

  localStorage.setItem("results", JSON.stringify(top10));
}
