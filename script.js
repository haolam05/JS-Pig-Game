'use strict';

const winScore = 20;
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0'); // HTML element that contains player 1 total score
const score1El = document.querySelector('#score--1'); // HTML element that contains player 2 total score
const current0El = document.querySelector('#current--0'); // HTML element that contains player 1 current score
const current1El = document.querySelector('#current--1'); // HTML element that contains player 2 current score
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const resetGame = function () {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  holdBtn.disabled = false;
  rollDiceBtn.disabled = false;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};
const rollDice = () => Math.floor(Math.random() * 6) + 1;
const currPlayerIsOne = () =>
  document.querySelector('.player--0').classList.contains('player--active');
const setCurrScore = function (rollVal) {
  if (rollVal === 1) {
    if (currPlayerIsOne()) {
      current0El.textContent = 0;
    } else {
      current1El.textContent = 0;
    }
    changePlayer();
  } else if (currPlayerIsOne()) {
    current0El.textContent = Number(current0El.textContent) + rollVal;
  } else {
    current1El.textContent = Number(current1El.textContent) + rollVal;
  }
};
const changePlayerHelper = function (currPlayer, nextPlayer) {
  document.querySelector(currPlayer).classList.remove('player--active');
  document.querySelector(nextPlayer).classList.add('player--active');
};
const changePlayer = function () {
  if (currPlayerIsOne()) {
    changePlayerHelper('.player--0', '.player--1');
    score0El.textContent =
      Number(score0El.textContent) + Number(current0El.textContent);
    current0El.textContent = 0;
  } else {
    changePlayerHelper('.player--1', '.player--0');
    score1El.textContent =
      Number(score1El.textContent) + Number(current1El.textContent);
    current1El.textContent = 0;
  }
};
const gameOver = function (playerClass) {
  document.querySelector(playerClass).classList.add('player--winner');
  diceEl.classList.add('hidden');
  holdBtn.disabled = true;
  rollDiceBtn.disabled = true;
};

resetGame();
newGameBtn.addEventListener('click', resetGame);
rollDiceBtn.addEventListener('click', function () {
  const rollVal = rollDice();
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${rollVal}.png`;
  setCurrScore(rollVal);
});
holdBtn.addEventListener('click', function () {
  changePlayer();
  if (Number(score0El.textContent) >= winScore) {
    gameOver('.player--0');
  } else if (Number(score1El.textContent) >= winScore) {
    gameOver('.player--1');
  }
});
