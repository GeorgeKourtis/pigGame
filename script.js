'use strict';

// Selecting elements
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
const btnInstructions = document.querySelector('.btn--instructions');

let scores, currentScore, activePlayer, playing, wins;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  wins = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1:if true ,switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.wins--player${activePlayer}`).textContent =
        wins[activePlayer] + 1;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document.querySelector(`wins--player`);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

btnInstructions.addEventListener('click', function () {
  document.querySelector('.overlay').classList.remove('show');
  document.querySelector('.instructions').classList.remove('show');
});
document
  .querySelector('.close--instructions')
  .addEventListener('click', function () {
    document.querySelector('.overlay').classList.add('show');
    document.querySelector('.instructions').classList.add('show');
  });
document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.overlay').classList.add('show');
  document.querySelector('.instructions').classList.add('show');
});
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'Escape' &&
    !document.querySelector('.instructions').classList.contains('show')
  ) {
    document.querySelector('.overlay').classList.add('show');
    document.querySelector('.instructions').classList.add('show');
  }
});
