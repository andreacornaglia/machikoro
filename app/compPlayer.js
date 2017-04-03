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
     
//choose a Name (have a random list(Peter, Joe, Mary), or be COMP1, COMP2?)
//do people want to work with other computer players ? Should there be a btn?
//
import {cardArray, unlockableArray} from './cards/cards';
import {unlockSpecialCard, updateAfterCardPurchase, changeTurn, changeGameStatus} from './firebaseFunctions'

//global variables we need for the player
let game = this.props.game
let currentTurn = game.turn;
let currentTurnObj = game.players[currentTurn]
let turnOrder = game.turnOrder;
let playerMoney = currentTurnObj.money

function compRollsDice(){
  if(checkIfSubwayUnlocked()===false){
    rollDice(1)
  } else {
    const random = Math.random();
    if(random < 0.5){
      rollDice(1)
    } else {
      rollDice(2)
    }
  }
  //here call next function
}

function buyUnlockOrPass(){
  const random = Math.random();
  if(playerMoney === 0){
    //passturn
  } else {
    if(Math.random < 0.8){
      compBuysCard()
    } else {
      //unlock a card
      //check all unlockable cards & if you haven't unlocked them, see if you can buy them
      //if you can't, buy card
    }
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
  if(length > 0){
    const random = Math.random()
  }
  //for this we need card info
  let cardCost = element.cost;
  let cardType = element.refName;
  let cardQuantity = game.cards[element.refName];
  let playerCardSupply = currentTurnObj.cards[element.refName]
  playerMoney -= cardCost
  cardQuantity--
  playerCardSupply++
  updateAfterCardPurchase(cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply, turnOrder)
  changeGameStatus(`${currentTurnObj.name} bought a ${element.displayName} card`)
}