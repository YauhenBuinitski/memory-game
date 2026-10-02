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
