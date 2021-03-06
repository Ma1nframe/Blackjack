'use strict';

/***** Buttons *****/
const dealBtn = document.querySelector('.deal-button')
const hitBtn = document.querySelector('.hit-button');
const holdBtn = document.querySelector('.hold-button');
const restartButton = document.querySelector('.restart-button');

/***** Blackjack & Bust *****/
const bJack = document.querySelector('.b-j');
const bust = document.querySelector('.bust');
const results = document.querySelector('.results');

let bJacked, busted, holdBtnView, restarted, canHit, removeBetBtn = false;
let dealerHand, playerHand;

/***** Dealer and player hands *****/
const player = document.querySelector('.player-points');
const pDraw1 = document.querySelector('.player-draw1');
const pDraw2 = document.querySelector('.player-draw2');
const pDraw3 = document.querySelector('.player-draw3');
const pDraw4 = document.querySelector('.player-draw4');
const pDraw5 = document.querySelector('.player-draw5');
const pDraw6 = document.querySelector('.player-draw6');
const dealer = document.querySelector('.dealer-points');
const dDraw1 = document.querySelector('.dealer-draw1');
const dDraw2 = document.querySelector('.dealer-draw2');
const dDraw3 = document.querySelector('.dealer-draw3');
const dDraw4 = document.querySelector('.dealer-draw4');
const dDraw5 = document.querySelector('.dealer-draw5');
const dDraw6 = document.querySelector('.dealer-draw6');

const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
const cards = {'two':2, 'three':3, 'four':4, 'five':5, 'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10, 'jack':10, 'queen':10, 'king':10, 'ace':11};
let indexP = 1;
let indexD = 1;

/***** BETTING *****/
// Tracking Pot and Bets
let pot = 1000;
let bet = 0;
// Displaying the Pot and Bet
const playerPot = document.querySelector('.moneyPot');
const currentBet = document.querySelector('.currentWager');
// Capture the Bet Input
const enterBet = document.querySelector('.submitWager');
const inputBet = document.querySelector('.wagerInput');

//////////////////////////////////
// Initializing Settings and game
/////////////////////////////////
function init() {
indexP = 1;
indexD = 1;
dealerHand = 0;
playerHand = 0;
bet = 0;
inputBet.value = 0;
currentBet.textContent = bet;
player.textContent = playerHand;
pDraw1.src = "/assets/bicycle-red-back.png";
pDraw2.src = "/assets/bicycle-red-back.png";
pDraw3.src = "";
pDraw4.src = "";
pDraw5.src = "";
pDraw6.src = "";
dealer.textContent = dealerHand;
dDraw1.src = "/assets/bicycle-blue-back.png";
dDraw2.src = "/assets/bicycle-blue-back.png";
dDraw3.src = "";
dDraw4.src = "";
dDraw5.src = "";
dDraw6.src = "";
results.textContent = '';

// Dynamic styling
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
if (removeBetBtn = true) {
    enterBet.classList.remove('hidden');
}

if (Number(pot) === 0) {
    alert('GAME OVER')
    };
    
};
init();

// Capture bet and display value
enterBet.addEventListener('click', function() {

    bet = Math.floor(inputBet.value);

    if (isNaN(bet)) {
        alert('Bet must be a number');
        bet = 0;
    } else if (bet > pot) {
        alert ('Bet must not be larger than player pot');
        bet = 0;
    } else {
        enterBet.classList.add('hidden');
        currentBet.textContent = Math.floor(bet);
    }

});

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
        pot -= bet;
        results.textContent = 'You lose, play again?';
    } else if (playerScore < dealerScore && dealerScore <= 21) {
        pot -= bet;
        results.textContent = 'You lose, play again?';        
    } else if (dealerScore > 21 && playerScore <= dealerScore) {
        pot += bet;
        results.textContent = 'You win, play again?';
    } else if (playerScore > dealerScore && playerScore <= 21) {
        pot += bet;
        results.textContent = 'You win, Play Again?';
    } else if (playerScore === dealerScore) {
        results.textContent = 'Draw, Play Again?';        
    } else {
        // Do nothing
    }

    playerPot.textContent = pot;
    player.textContent = playerHand;
    dealer.textContent = dealerHand;

    restartButton.classList.remove('hidden');
    restarted = true;
    removeBetBtn = true
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
    const draws = [dDraw1, dDraw2, dDraw3, dDraw4, dDraw5, dDraw6];
    draws[indexD - 1].src = `/assets/${card}-${suit}.png`;
    indexD++;
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
    const draws = [pDraw1, pDraw2, pDraw3, pDraw4, pDraw5, pDraw6];
    draws[indexP - 1].src = `/assets/${card}-${suit}.png`;
    indexP++;
};

// Deal
dealBtn.addEventListener('click', function() {
    if(playerHand === 0 && dealerHand === 0 && bet != 0) {
        // playerHand = getRandomIntPlayer();
        getCardPlayer(cards, suits);
        getCardDealer(cards, suits);
        getCardPlayer(cards, suits);
        player.textContent = playerHand;
        dealer.textContent = dealerHand;
        holdBtnView = true;
        canHit = true;
        holdBtn.classList.remove('hidden');
    };
    checkForBustOrBj(playerHand);

    if (bet === 0) {
        alert('Enter Bet')
    } else if (pot === 0) {
        alert('You are out of Money GAME OVER')
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

    if(dealerHand <= 21 && dealerHand >= playerHand) {
    calculateWinner(playerHand, dealerHand);
    };
});

// Replay
restartButton.addEventListener('click', init);