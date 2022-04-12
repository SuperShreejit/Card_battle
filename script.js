import Deck from "./deck.js";

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerCardDeck = document.querySelector(".computer-deck");
const playerCardDeck = document.querySelector(".player-deck");
const result = document.querySelector(".result");

let playerDeck, computerDeck, inRound=false, gameStop = false;
const CARD_VALUE_MAP = {
  "2":2,
  "3":3,
  "4":4,
  "5":5,
  "6":6,
  "7":7,
  "8":8,
  "9":9,
  "10":10,
  "J":11,
  "Q":12,
  "K":13,
  "A":14
};

document.addEventListener('click',()=>{
  if(gameStop) startgame();
  else {
    if(inRound) cleanBeforeRound();
    else flipCards();
  }
});

startgame();
function startgame() {
  const deck = new Deck();
  deck.shuffle();
  const deckMidPoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidPoint));
  computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards));
  inRound = false;
  gameStop = false;
  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  result.innerText = "";
  updateDeckCount();
}

function updateDeckCount() {
  computerCardDeck.innerText = computerDeck.numberOfCards;
  playerCardDeck.innerText = playerDeck.numberOfCards;
}

function flipCards() {
  inRound = true;
  const playerCard = playerDeck.shift();
  const computerCard = computerDeck.shift();
  playerCardSlot.appendChild(playerCard.getHTML);
  computerCardSlot.appendChild(computerCard.getHTML);
  updateDeckCount();
  if(isRoundWinner(playerCard, computerCard)) {
    result.innerText = "Win";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  }
  else if (isRoundWinner(computerCard, playerCard)) {
    result.innerText = "lose";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }
  else {
    result.innerText="draw";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if(isGameOver(playerDeck)){
    gameStop = true;
    alert("You have lost the game!");
  }
  else if(isGameOver(computerDeck)){
    gameStop = true;
    alert("You have won.");
  }
}

function isRoundWinner(card1,card2) {
  return CARD_VALUE_MAP[card1.value] > CARD_VALUE_MAP[card2.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
