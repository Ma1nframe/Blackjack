'use strict';

// Buttons
const dealBtn = document.querySelector('.deal-button')
const hitBtn = document.querySelector('.hit-button');
const holdBtn = document.querySelector('.hold-button');
const restartButton = document.querySelector('.restart-button');

// Blackjack & Bust
const bJack = document.querySelector('.b-j');
const bust = document.querySelector('.bust');
let bJacked, busted, holdBtnView, restarted = false;

const results = document.querySelector('.results');
const player = document.querySelector('.player-points');
const dealer = document.querySelector('.dealer-points');

let dealerHand, playerHand;

function init() {
dealerHand = 0;
playerHand = 0;
player.textContent = playerHand;
dealer.textContent = dealerHand;
results.textContent = '';

if(bJacked = true) {
    bJack.classList.remove('black-jack')
};
if(busted = true) {
    bust.classList.add('hidden')
};
if (holdBtnView = true) {
    holdBtn.classList.add('hidden');
};
if (restarted = true) {
    restartButton.classList.add('hidden');
}
};
init();

// Check if the player or dealer busts or hits blackjack
function checkForBustOrBj(hand) {
    if (hand >= 22) {
        bust.classList.remove('hidden');
        calculateWinner(playerHand, dealerHand);
        busted = true;
    } else if (hand === 21) {
        bJack.classList.add('black-jack');
        // Don't calculate the winner if the player hits blackjack. The dealer still gets a turn.
        bJacked = true;
    } else {
        // Do nothing
    };
};

// Winning conditions
function calculateWinner(playerScore, dealerScore) {

    if (playerScore > 21) {
        results.textContent = 'You lose, play again?';
        restartButton.classList.remove('hidden');
        restarted = true;
    } else if (playerScore < dealerScore && dealerScore <= 21) {
        results.textContent = 'You lose, play again?';
        restartButton.classList.remove('hidden');
        restarted = true;        
    } else if (dealerScore > 21) { 
        results.textContent = 'You win, play again?';
        restartButton.classList.remove('hidden');
        restarted = true;
    } else if (playerScore > dealerScore && playerScore <= 21) {
        results.textContent = 'You win, Play Again?';
        restartButton.classList.remove('hidden');
        restarted = true;
    } else if (playerScore === dealerScore) {
        results.textContent = 'Draw, Play Again?';
        restartButton.classList.remove('hidden');
        restarted = true;        
    }

    player.textContent = playerHand;
    dealer.textContent = dealerHand;
};

// Generate random numer for Player
function getRandomIntPlayer() {
    return Math.floor(Math.random() *12) +1;
};
// Generate random numer for Dealer
function getRandomIntDealer() {
    return Math.floor(Math.random() *12) +1;
};

// Deal
dealBtn.addEventListener('click', function() {
    if(playerHand === 0 && dealerHand === 0) {
        playerHand = getRandomIntPlayer();
        dealerHand = getRandomIntDealer();
        player.textContent = playerHand;
        dealer.textContent = dealerHand;
        holdBtnView = true;
        holdBtn.classList.remove('hidden');
    };
});
// Hit Me
hitBtn.addEventListener('click', function() {
    if(playerHand < 21 && playerHand != 0) {
        playerHand += getRandomIntPlayer();
        player.textContent = playerHand;
    };
    checkForBustOrBj(playerHand);
});
// Hold
holdBtn.addEventListener('click', function() {

    while (playerHand > dealerHand && dealerHand < 21) {
        dealerHand += getRandomIntDealer();
        dealer.textContent = dealerHand;
        checkForBustOrBj(dealerHand);
    };

    calculateWinner(playerHand, dealerHand);
});

// Replay
restartButton.addEventListener('click', init);