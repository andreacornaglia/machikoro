//change turn - if player is comp, run this fn:

//1. roll the dice
   //decide if diceNum is 1 or 2
   checkIfSubwayUnlocked() //if true, roll 1 or 2 dice randomly, else roll just 1
   //then pass one 
   rollDice(diceNum) 
   
//2. do one of 3 things:
  //if you have money:
      //. buy a card 80% possibility
        //randomly according to how much money you have
        
      //. unlock a card 20% possibility
        //randomly according to how much money you have
  //if you don't have any money:
     //. pass:
     
//using functions from other places
import {cardArray, unlockableArray} from './cards/cards';
import {unlockSpecialCard, updateAfterCardPurchase, changeTurn, changeGameStatus} from './firebaseFunctions'

//global variables we need for the player
let game; //import game from Firebase
let currentTurn = game.turn;
let currentTurnObj = game.players[currentTurn];
let turnOrder = game.turnOrder;
let playerMoney = currentTurnObj.money;
let playerBuyableCards = currentTurnObj.cards;
let playerUnlockableCards = currentTurnObj.activatedCards;

function compRollsDice(){
  if(checkIfSubwayUnlocked() === false){
    rollDice(1)
  } else {
    const random = Math.random();
    if(random < 0.5){
      rollDice(1)
    } else {
      rollDice(2)
    }
  }
  updateDiceNum(newDiceVal)
  buyUnlockOrPass()
}

function buyUnlockOrPass(){
  const random = Math.random();
  if(playerMoney === 0){
    changeTurn(game.turn, game.turnOrder)
    changeGameStatus(`${currentTurnObj.name} decided to take no action`)
  } else {
    if(Math.random < 0.8){
      compBuysCard()
    } else {
      //check all unlockable cards to see which ones are not unlocked
      const unlocked = Object.hasKey(playerUnlockableCards);
      unlocked.filter( card => playerUnlockableCards[card] === false)
      //now see if you can buy any of them
      //need to map the card with unlockableArray to get cost & create array of cards machine can unlock
      const unlockwithInfo = unlocked.filter(card => {
        unlockableArray.forEach(element => {
          if(playerUnlockableCards[card] === element.refName && element.cost <= playerMoney){
            return element;
          }
        })
      })
      //see how to make sure I only buy one
      const length = unlockwithInfo.length || 0;
      let card;
      if(length > 0){
        const idx = Math.floor(Math.random()*length) - 1;
        card = unlockwithInfo[idx];
      }
      unlockSpecialCard(cardType, currentTurn, playerMoney, turnOrder, unlockedCount, currentTurnObj)
    }
  }
}

//auxiliary functions
function rollDice(diceNum){
  let newDiceNum;
  if (diceNum === 1) {
    newDiceNum = Math.ceil(Math.random() * (6));
  }
  if (diceNum === 2){
    newDiceNum = Math.ceil(Math.random() * (12));
  }
  return newDiceNum;
}


function checkIfSubwayUnlocked(){
  if (currentTurnObj.activatedCards.subwayStation) {
    return true;
  } else {
    return false;
  }
}

function compBuysCard(){
  //decide which card to buy
  //first, make an array of cards you can buy based on $$
  const buyArray = cardArray.filter( card =>
    card.cost < playerMoney && game.cards[card.refName] > 0
  )
  //choose a random number to get the array index
  //that will be the card you want to buy
  const length = buyArray.length || 0
  let card
  if(length > 0){
    const idx = Math.floor(Math.random()*length) - 1;
    card = buyArray[idx];
  }
  //for this we need card info
  let cardCost = car.cost;
  let cardType = card.refName;
  let cardQuantity = game.cards[card.refName];
  let playerCardSupply = currentTurnObj.cards[card.refName]
  playerMoney -= cardCost
  cardQuantity--
  playerCardSupply++
  updateAfterCardPurchase(cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply, turnOrder)
  changeGameStatus(`${currentTurnObj.name} bought a ${card.displayName} card`)
}