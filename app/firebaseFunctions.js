import store from './store';
import {cardArray} from './cards/cards'
import {machiObject} from './machiObjectTemplate'
import {browserHistory} from 'react-router'

const getRef = () => {
  return store.getState().firebaseRef
}

export const updatePlayers = (game) => {
  const gameLink = game.gameLink
  const users = game.users;
  const players = ['playerOne', 'playerTwo', 'playerThree', 'playerFour'];

  for (let i = 0; i < users.length; i++){
      getRef().child('players').child(players[i]).update({
        name: users[i].name
      })
    }

  // Now delete players where name is null
  // Update turn order to only contain players who are playing
  // Redirect players to game
  //browserHistory.push(`/game/${gameLink}`)
}

export const updateDiceNum = (num) => {
  return getRef().update({
    diceValue: num,
    phase: 'buy'
  })
}

//traverse cards array function and return money
export const calculateMoney = (currentName, gameState) => {
  let currentPlayer;
  for (var key in gameState.players ) {
    if (gameState.players[key].name === currentName) {
      currentPlayer = key;
    }
  }
  console.log('currentPlayer in calculateMoney: ', currentPlayer);
  let currentPlayerInitMoney = gameState.players[currentPlayer].money
  let finalMoney = currentPlayerInitMoney
  console.log('dicevalue for calculate money is', gameState.diceValue)
  cardArray.forEach(card => {
    let money = card.cardFn(currentPlayer, gameState)
    console.log('this is what money is: ', money)
    finalMoney += money.money
    console.log('getting this amount of $:', finalMoney)
  })
  // getRef().update({
  //   phase: "buy"
  // })
  getRef().child(`players/${currentPlayer}`).update({
    money : finalMoney
  })
  return finalMoney;
}


export const updateAfterCardPurchase = (cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply, turnOrder) => {
  let updateCardQuantity = {}
  updateCardQuantity[cardType] = cardQuantity
  getRef().child('cards').update(updateCardQuantity)

  console.log('cardtypefb', updateCardQuantity)

  let updatePlayerCardSupply = {}
  updatePlayerCardSupply[cardType] = playerCardSupply
  getRef().child('players').child(currentTurn).child('cards').update(updatePlayerCardSupply)

  let playersMoneyAvail = getRef().child('players').child(currentTurn)
  playersMoneyAvail.update({
    money: playerMoney
  })

  changeTurn(currentTurn, turnOrder)
}

export const unlockSpecialCard = (cardType, currentTurn, playerMoney, turnOrder) => {
  let playersMoneyAvail = getRef().child('players').child(currentTurn)
  playersMoneyAvail.update({
    money: playerMoney
  })

  let activateCard = {}
  activateCard[cardType] = true
  getRef().child('players').child(currentTurn).child('activatedCards').update(activateCard)

  changeTurn(currentTurn, turnOrder)

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
  getRef().update({
    phase: 'roll',
    turn: nextPlayer
  })
}

export const changeGameStatus = (status) => {
  getRef().update({status: status})
}
