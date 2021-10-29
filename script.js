'use strict';

// Buttons
const dealBtn = document.querySelector('.deal-button')
const hitBtn = document.querySelector('.hit-button');
const holdBtn = document.querySelector('.hold-button');
const restartButton = document.querySelector('.restart-button');

// Blackjack & Bust
const bJack = document.querySelector('.b-j');
const bust = document.querySelector('.bust');
const results = document.querySelector('.results');

let bJacked, busted, holdBtnView, restarted, canHit = false;

// Dealer and player hands
const player = document.querySelector('.player-points');
const pDraw = document.querySelector('.player-draw');
const dealer = document.querySelector('.dealer-points');
const dDraw = document.querySelector('.dealer-draw');

let dealerHand, playerHand;

const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
const cards = {'two':2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'jack':10, 'queen':10, 'king':10, 'ace':11};

// Initial settings
function init() {
dealerHand = 0;
playerHand = 0;
player.textContent = playerHand;
pDraw.src = "assets/cards/bicycle-red-back.png";
dealer.textContent = dealerHand;
dDraw.src = "assets/cards/bicycle-blue-back.png";
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
    return Math.floor(Math.random() * 13) ;
};
// Generate random numer for Dealer
function getRandomIntDealer() {
    return Math.floor(Math.random() * 13);
};
// Generate random card dynamically and add its value to the hand
function getCardDealer(x, y) {
    // Get random suit from suits array
    let suit = y[Math.floor(Math.random() * suits.length)];

    // Get random card from cards Object
    // const listCards = Object.keys(cards);
    // const card = listCards[Math.floor(Math.random() * listCards.length)];
    let z = getRandomIntDealer();
    let [card, cardValue] = Object.entries(x)[z];

    // Take the card's value and add it to the dealer's hand
    dealerHand += cardValue;
 
    // Dynamically generate the .png image
    dDraw.src = `/assets/cards/${card}-${suit}.png`;
};

// Generate random card dynamically and add its value to the hand
function getCardPlayer(x, y) {
    // Get random suit from suits array
    let suit = y[Math.floor(Math.random() * suits.length)];

    // Get random card from cards Object
    let z = getRandomIntPlayer();
    let [card, cardValue] = Object.entries(x)[z];

    // Take the card's value and add it to the player's hand
    playerHand += cardValue;
 
    // Dynamically generate the .png image
    pDraw.src = `/assets/cards/${card}-${suit}.png`;
};

// Deal
dealBtn.addEventListener('click', function() {
    if(playerHand === 0 && dealerHand === 0) {
        // playerHand = getRandomIntPlayer();
        getCardPlayer(cards, suits);
        getCardDealer(cards, suits);
        player.textContent = playerHand;
        dealer.textContent = dealerHand;
        holdBtnView = true;
        canHit = true;
        holdBtn.classList.remove('hidden');
    };
});
// Hit
hitBtn.addEventListener('click', function() {
    if(playerHand < 21 && playerHand != 0 && canHit != false) {
        getCardPlayer(cards, suits);
        player.textContent = playerHand;
    };
    checkForBustOrBj(playerHand);
});
// Hold
holdBtn.addEventListener('click', function() {

    canHit = false;
    
    while (playerHand > dealerHand && dealerHand < 21) {
        getCardDealer(cards, suits);
        dealer.textContent = dealerHand;
        checkForBustOrBj(dealerHand);
    };

    calculateWinner(playerHand, dealerHand);
});

// Replay
restartButton.addEventListener('click', init);