import {ref} from './firebase'
import {cardArray} from './cards/cards'


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

export const disableButton = () => {

}

export const updateAfterCardPurchase = (cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply) => {
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

}

export const unlockSpecialCard = (cardType, currentTurn, playerMoney) => {
  let playersMoneyAvail = ref.child('players').child(currentTurn)
  playersMoneyAvail.update({
    money: playerMoney
  })

  let activateCard = {}
  activateCard[cardType] = true
  ref.child('players').child(currentTurn).child('activatedCards').update(activateCard)

}
