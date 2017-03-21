
export const farmersMarket = {
  diceValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  action: (currentPlayer, gameState) => {
      const playerObj = gameState.players[currentPlayer]
      const numCards = playerObj.cards.farmersMarket
      const gainedAmount = {money: numCards * 1}
      return gainedAmount
  },
  imgURL: ''
};
export const river = {
  diceValue: 1,
  cost: 1,
  industry: 'cow',
  cardDescription: "Get 1 coin from the bank on anyone's turn",
  action: (currentPlayer, gameState) => {
      const playerObj = gameState.players[currentPlayer]
      const numCards = playerObj.cards.river
      const gainedAmount = {money: numCards * 1}
      return gainedAmount
  },
  imgURL: ''
};
export const bakery = {
  diceValue: 2 || 3,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  action: (currentPlayer, gameState) => {
    let gainedAmount
    if (currentPlayer === gameState.turn) {
      const playerObj = gameState.players[currentPlayer]
      const numCards = playerObj.cards.bakery
      gainedAmount = {money: numCards}
    } else { gainedAmount = {money: 0} }
    return gainedAmount
  },
  imgURL: ''
};
export const cafe = {
  diceValue: 3,
  cost: 2,
  industry: 'mug',
  cardDescription: "Get 1 coin from the player who rolled the dice",
  action: (currentPlayer, gameState) => {
      const gainedValArr = []
      if (currentPlayer !== gameState.turn) {
        const players = Object.keys(gameState.players)

        players.forEach(player => {
          if (player !== currentPlayer){
            const playerObj = gameState.players[currentPlayer]
            const numCards = playerObj.cards.cafe * 1
            const gainedAmount = {money: numCards}
            gainedValArr.push({player: player, gainedAmount})
          }
        })
      }
      if (currentPlayer === gameState.turn){
        let moneyAvail = gameState.players[currentPlayer].money
        let netLoss = 0
        while((netLoss <= moneyAvail) || ){
          gainedValArr.forEach((valObj) => {
            if (valObj.money > 0){
              netLoss++
              valObj.money -= 1
            }
          })
        }
      }

      if (currentTurn.money - numCards >= 0){
        currentTurnNewAmount = currentTurn.money - numCards
        currentTurn.update({money: currentTurnNewAmount}) //is this a proper way to update the firebase database?
      } else { currentTurn.update({money: 0}) } //is this a proper way to update the firebase database?
  },
  imgURL: ''
};
export const convenienceStore = {
  diceValue: 4,
  cost: 2,
  industry: 'building',
  cardDescription: "Get 3 coins from the bank, on your turn only",
  action: (currentPlayer, gameState) => {
    let gainedAmount
    if (currentPlayer === gameState.turn) {
      const playerObj = gameState.players[currentPlayer]
      const numCards = playerObj.cards.convenienceStore
      gainedAmount = {money: numCards * 3}
    } else { gainedAmount = {money: 0} }
    return gainedAmount
  },
  imgURL: ''
};
export const museum = {
  diceValue: 5,
  cost: 3,
  industry: 'gear',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  action: (currentPlayer, gameState) => {
      const playerObj = gameState.players[currentPlayer]
      const numCards = playerObj.cards.museum
      const gainedAmount = {money: numCards * 1}
      return gainedAmount
  },
  imgURL: ''
};
export const businessCenter = {
  diceValue: 6,
  cost: 8,
  industry: 'antenna',
  cardDescription: "Trade one non [antenna icon] establishment with another player, on your turn only",
  imgURL: ''
};
export const stadium = {
  diceValue: 6,
  cost: 6,
  industry: 'antenna',
  cardDescription: "Get 2 coins from all players, on your turn only",
  action: () => {
    playersArr.forEach(player => {
      let gain = 0
      let newAmount
      let currentTurnNewAmount
      if (player !== ref.turn){
        let playerObj = ref.players[player]
        if (playerObj.money >= 2) {
          gain += 2
          newAmount = playerObj.money - 2
        } else {
          gain += playerObj.money
          newAmount = 0
        }
        playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
      }
      currentTurnNewAmount = currentTurn.money + gain
      currentTurn.update({money: currentTurnNewAmount}) //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const tvStation = {
  diceValue: 6,
  cost: 7,
  industry: 'antenna',
  cardDescription: "Take 5 coins from any one player, on your turn only",
  imgURL: ''
};
export const powerPlant = {
  diceValue: 7,
  cost: 5,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [cow icon] establishment that you own, on your turn only",
  action: () => {
    let numCards = currentTurn.cards.river || 0 //river is the only card type with the cow icon
    let newAmount = currentTurn.money + (numCards * 3)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  },
  imgURL: ''
};
export const touristBus = {
  diceValue: 8,
  cost: 3,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [gear icon] establishment that you own. On your turn only",
  action: () => {
    let numCards = 0
    numCards += currentTurn.cards.museum || 0 //museum and theater are the only card types with gear icon
    numCards += currentTurn.cards.theater || 0
    let newAmount = currentTurn.money + (numCards * 3)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  },
  imgURL: ''
};
export const theater = {
  diceValue: 9,
  cost: 6,
  industry: 'gear',
  cardDescription: "Get 5 coins from the bank, on anyone's turn",
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.theater || 0
      let newAmount = playerObj.money + (numCards * 5)
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const bodega = {
  diceValue: 9 || 10,
  cost: 3,
  industry: 'mug',
  cardDescription: "Get 2 coins from the player who rolled the dice",
  action: () => {
    playersArr.forEach(player => {
      let numCards
      let newAmount
      let currentTurnNewAmount
      if (player !== ref.turn) {
        let playerObj = ref.players[player]
          numCards = playerObj.cards.bodega || 0
          newAmount = playerObj.money + (numCards * 2)
          playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
      }
      if (currentTurn.money - (numCards * 2) >= 0){
        currentTurnNewAmount = currentTurn.money - (numCards * 2)
        currentTurn.update({money: currentTurnNewAmount}) //is this a proper way to update the firebase database?
      } else { currentTurn.update({money: 0}) } //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const wineShop = {
  diceValue: 10,
  cost: 3,
  industry: 'wheat',
  cardDescription: "Get 3 coins from the bank,on anyone's turn",
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.wineShop || 0
      let newAmount = playerObj.money + (numCards * 3)
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const restaurant = {
  diceValue: 11 || 12,
  cost: 2,
  industry: 'fruit',
  cardDescription: "Get 2 coins from the bank for each [wheat icon] establishment that you own. On your turn only",
  action: () => {
    let numCards = 0
    numCards += currentTurn.cards.farmersMarket || 0 //farmersMarket and wine are the only card types
    numCards += currentTurn.cards.wineShop || 0
    let newAmount = currentTurn.money + (numCards * 2)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  },
  imgURL: ''
};



//UNLOCKABLE CARDS BELOW

export const radioTower = {
  cost: 22,
  cardDescription: 'Once Every Turn You can Choose To Re-Roll Your Dice',
  imgUrl: ''
};
export const shoppingMall = {
  cost: 10,
  cardDescription: 'If you roll doubles, take another turn after this one',
  imgUrl: ''
};
export const coneyIsland = {
  cost: 16,
  cardDescription: 'Each of your [mug icon] and [building icon] establishments earn +1 coin',
  action: () => {
    playersArr.forEach(player => {
      let numCards = 0
      let sumToLose = 0
      let playerObj
      let newAmount
      let currentTurnNewAmount

      if (ref.players[player].activatedCards.coneyIsland){
        playerObj = ref.players[player]
        numCards += playerObj.cards.bakery || 0
        numCards += playerObj.cards.cafe || 0
        sumToLose += playerObj.cards.cafe || 0
        numCards += playerObj.cards.convenienceStore || 0
        numCards += playerObj.cards.bodega || 0
        sumToLose += playerObj.cards.bodega || 0

        newAmount = playerObj.money + numCards
        if (currentTurn.money >= sumToLose) {
          currentTurnNewAmount = currentTurn.money - sumToLose
        } else { currentTurnNewAmount = 0 }

        playerObj.update({money: newAmount})
        currentTurn.update({money: currentTurnNewAmount})
      }
    })
  },
  imgUrl: ''
};
export const subwayStation = {
  cost: 4,
  cardDescription: 'You may roll 1 or 2 dice',
  imgURL: ''
};
