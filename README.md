# Memory Game

A classic memory matching game. The player flips cards to find matching pairs of emojis. The goal is to find all 8 pairs with the fewest moves.

## Rules

- The board has 16 cards — 8 pairs.
- Cards are shuffled on page load and on every new game.
- The player flips two cards per move.
- If the emojis match, the cards stay open.
- If they do not match, the cards close after 1 second.
- The game ends when all 8 pairs are found.
- The result is saved to the leaderboard (top 10).

## Technologies

- HTML5
- CSS3 (Grid, Flexbox)
- JavaScript (ES6+)
- localStorage for saving results

## Project structure

- `index.html` — main page
- `styles.css` — styles
- `script.js` — game logic

## How to run locally

1. Clone the repository:
   `git clone https://github.com/YauhenBuinitski/memory-game.git`

2. Go to the project folder:
   `cd memory-game`

3. Open `index.html` in a browser or run it with Live Server.

## Deployment

[Memory Game](https://yauhenbuinitski.github.io/memory-game/)

## Author

Yauhen Buinitski
