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
