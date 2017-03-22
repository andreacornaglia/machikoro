import {ref} from './firebase'

export const updateDiceNum = (num) => {
  ref.update({
    diceValue: num
  })
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
