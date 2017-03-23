import {ref} from './firebase'
import {cardArray} from './cards/cards'

const updateDiceNum = (num) => {
  console.log('this is the new dice', num)
  return ref.update({
    diceValue: num
  })
}

//traverse cards array function and return money
const calculateMoney = (currentPlayer, gameState) => {
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

const disableButton = () => {

}

export {updateDiceNum, calculateMoney}
