'use strict';

let activePlayer = 0;
let scores = [0, 0];
let currScore = 0;
const winScore = 100;
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const resetGame = function () {
  activePlayer = 0;
  currScore = 0;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  holdBtn.disabled = false;
  rollDiceBtn.disabled = false;
};
const rollDice = () => Math.floor(Math.random() * 6) + 1;
const changePlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
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
  if (rollVal === 1) {
    changePlayer();
  } else {
    currScore += rollVal;
    document.querySelector(`#current--${activePlayer}`).textContent = currScore;
  }
});
holdBtn.addEventListener('click', function () {
  scores[activePlayer] += currScore;
  if (scores[activePlayer] >= winScore) {
    gameOver(`.player--${activePlayer}`);
  }
  changePlayer();
});
