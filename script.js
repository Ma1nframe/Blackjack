'use strict';

const results = document.querySelector('.results');
const restartButton = document.querySelector('.restartButton');
const hitBtn = document.querySelector('.hitButton');
const player = document.querySelector('.playerPoints');
const dealer= document.querySelector('.dealerPoints');

// let bet;
// let pot = 1000;
// let currentPot = pot - bet;

let dealerHand;
let playerHand;

function init() {
restartButton.style.display = 'none';
dealerHand = 0;
playerHand = 0;
player.textContent = playerHand;
dealer.textContent = dealerHand;
results.textContent = '';
};
init();

function calculateWinner(playerScore, dealerScore) {

    if (playerScore < dealerScore) {
        results.textContent = 'You lose, play again?';
        restartButton.style.display = 'inline';
        // pot = currentPot;
        // bet = 0;
    } else if (playerScore > dealerScore) { 
        results.textContent = 'You win, play again?';
        restartButton.style.display = 'inline';
        // pot = currentPot + (bet * 2);
        // bet = 0;
    } else {
        results.textContent = 'Draw, Play Again?';
        restartButton.style.display = 'inline';
        // bet = 0;
    };

    player.textContent = playerHand;
    dealer.textContent = dealerHand;
};


function getRandomIntPlayer() {
    return Math.floor(Math.random() *21) +1;
};
function getRandomIntDealer() {
    return Math.floor(Math.random() *21) +1;
};

hitBtn.addEventListener('click', function() {
    playerHand = getRandomIntPlayer();
    dealerHand = getRandomIntDealer();
    calculateWinner(playerHand, dealerHand);
});

// Replay
restartButton.addEventListener('click', init);