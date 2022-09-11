'use strict';
// Dom elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// The score at the top
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

// The current score displayed on a given players turn
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
    // Initial states
    // We'll store the scores of both players in an array
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.add('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
}

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    // Toggle highlights in background
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnNew.addEventListener('click', init);
// Dice roll event handling
btnRoll.addEventListener('click', function() {
    if (playing) {
        // Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        // Display the dice
        diceEl.classList.remove('hidden');
        // Update the dice .png
        diceEl.src = `dice-${dice}.png`
    
        // Check if we rolled a 1: if true, we switch to the next player
        if (dice !== 1) {
            // Add the dice value to current score
            currentScore += dice;
            // Update text
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } 
        
        // Switch to the other player
        else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // Add current score to the active players running score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; 
    
        // Finish the game when current player has won
        if (scores[activePlayer] >= 100) {
            playing = false;
            // Hide the dice in the middle
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');   
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        }
    
        else {
            // Switch over to the next player.
            switchPlayer();
        }
    }
});
