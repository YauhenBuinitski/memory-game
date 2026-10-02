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
