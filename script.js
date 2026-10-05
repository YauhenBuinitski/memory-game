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
const movesTexst = createElement("p", "stats__text", "Moves: 0");
const pairsText = createElement("p", "stats__text", "Pairs: 0 / 8");

stats.append(movesTexst, pairsText);

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

for (let i = 0; i < 16; i += 1) {
  const card = createElement("div", "card");
  const value = cardValues[i];

  card.dataset.value = value;

  const valueText = createElement("span", "card__value", value);
  const cardBack = createElement("span", "card__back");

  card.append(valueText, cardBack);
  board.append(card);
}
