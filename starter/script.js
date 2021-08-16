'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//
// game variables
let currentScore, score, activePlayer;
// switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// disable the button
const disableButton = function (disable) {
  btnHold.disabled = disable ? true : false;
  btnRoll.disabled = disable ? true : false;
};
// hide the button
const hideDice = function () {
  diceEl.classList.add('hidden');
};
// game starter function
const init = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  score0El.textContent = score[0];
  score1El.textContent = score[1];
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  disableButton(false);
  hideDice();
};
//
//
//
//Start the game
init();
//
// Roll the dice
btnRoll.addEventListener('click', function () {
  // make a random dice
  const randomDice = Math.trunc(Math.random() * 6) + 1;
  // display dice
  diceEl.src = `dice-${randomDice}.png`;
  diceEl.classList.remove('hidden');
  // set current value
  if (randomDice != 1) {
    // if dice not 1 set current
    currentScore += randomDice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // if dice 1, switch player
    switchPlayer();
  }
});
//
//
//Button Hold
btnHold.addEventListener('click', function () {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 30) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    disableButton(true);
    hideDice();
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
