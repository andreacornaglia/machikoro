import {database, ref} from './firebase'
import {cardArray} from './cards/cards'
import {machiObject} from './machiObjectTemplate'


export const updateDiceNum = (num) => {
  console.log('this is the new dice', num)
  return ref.update({
    diceValue: num
  })
}

//traverse cards array function and return money
export const calculateMoney = (currentPlayer, gameState) => {
  let currentPlayerInitMoney = gameState.players[currentPlayer].money
  let finalMoney = currentPlayerInitMoney
  console.log('dicevalue for calculate money is', gameState.diceValue)
  cardArray.forEach(card => {
    let money = card.cardFn(currentPlayer, gameState)
    finalMoney += money.money
    console.log('getting this amount of $:', finalMoney)
  })
  ref.update({
    phase: "buy"
  })
  ref.child(`players/${currentPlayer}`).update({
    money : finalMoney
  })
  return finalMoney;
}


export const updateAfterCardPurchase = (cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply, turnOrder) => {
  let updateCardQuantity = {}
  updateCardQuantity[cardType] = cardQuantity
  ref.child('cards').update(updateCardQuantity)

  console.log('cardtypefb', updateCardQuantity)

  let updatePlayerCardSupply = {}
  updatePlayerCardSupply[cardType] = playerCardSupply
  ref.child('players').child(currentTurn).child('cards').update(updatePlayerCardSupply)

  let playersMoneyAvail = ref.child('players').child(currentTurn)
  playersMoneyAvail.update({
    money: playerMoney
  })
  changeTurn(currentTurn, turnOrder)
}

export const unlockSpecialCard = (cardType, currentTurn, playerMoney, turnOrder) => {
  let playersMoneyAvail = ref.child('players').child(currentTurn)
  playersMoneyAvail.update({
    money: playerMoney
  })

  let activateCard = {}
  activateCard[cardType] = true
  ref.child('players').child(currentTurn).child('activatedCards').update(activateCard)
  
  changeTurn(currentTur, turnOrder)

}

export const changeTurn = (currentTurn, turnOrder) => {
  //see who is next turnOrder - make it into an array, traverse the array
  const turnArr = Object.keys(turnOrder);
  let playerOnTurnIndex;
  let nextPlayer;
  //loop to find current turn position in array
  for(let i = 0; i < turnArr.length - 1; i++){
    if(currentTurn === turnOrder[turnArr[i]]){
        playerOnTurnIndex = i
     }
  }
  //if position less than 3, we add 1, else go back to 0
  if(playerOnTurnIndex < turnArr.length - 1){
    nextPlayer = turnOrder[turnArr[playerOnTurnIndex+1]]
  } else {
    nextPlayer = turnOrder[turnArr[0]]
  }
  
  console.log('new player is:', nextPlayer);
  //then update firebase with the new player turn
  ref.update({
    phase: 'roll',
    turn: nextPlayer
  })
}

export const addNewGame = (machiObject, game) => {
  // creating new game instance in firebase (with gameLink as unique keys)
  let gameLink = (game.data.id).toString()
  database.child(gameLink).set(machiObject)
}
