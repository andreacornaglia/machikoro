import {ref} from '../firebase'

let playersArr = Object.keys(ref.players) //should give only player property names (not entire obj)
let currentTurn = ref.players[ref.turn] //should give the entire current player object

export const farmersMarket = {
  rollValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.farmersMarket
      let newAmount = playerObj.money + numCards
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const river = {
  rollValue: 1,
  cost: 1,
  industry: 'cow',
  cardDescription: "Get 1 coin from the bank on anyone's turn",
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.river || 0
      let newAmount = playerObj.money + numCards
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const bakery = {
  rollValue: 2 || 3,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  action: () => {
    let numCards = currentTurn.cards.bakery || 0
    let newAmount = currentTurn.money + numCards
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  },
  imgURL: ''
};
export const cafe = {
  rollValue: 3,
  cost: 2,
  industry: 'mug',
  cardDescription: "Get 1 coin from the player who rolled the dice",
  action: () => {
    playersArr.forEach(player => {
      let numCards
      let playerObj
      let newAmount
      let currentTurnNewAmount
      if (player !== ref.turn) {
        playerObj = ref.players[player]
        numCards = playerObj.cards.cafe || 0
        newAmount = playerObj.money + numCards
        playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
      }
      if (currentTurn.money - numCards >= 0){
        currentTurnNewAmount = currentTurn.money - numCards
        currentTurn.update({money: currentTurnNewAmount}) //is this a proper way to update the firebase database?
      } else { currentTurn.update({money: 0}) } //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const convenienceStore = {
  rollValue: 4,
  cost: 2,
  industry: 'building',
  cardDescription: "Get 3 coins from the bank, on your turn only",
  action: () => {
    let numCards = currentTurn.cards.convenienceStore || 0
    let newAmount = currentTurn.money + (numCards * 3)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  },
  imgURL: ''
};
export const museum = {
  rollValue: 5,
  cost: 3,
  industry: 'gear',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.museum || 0
      let newAmount = playerObj.money + numCards
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  },
  imgURL: ''
};
export const businessCenter = {
  rollValue: 6,
  cost: 8,
  industry: 'antenna',
  cardDescription: "Trade one non [antenna icon] establishment with another player, on your turn only",
  imgURL: ''
};
export const stadium = {
  rollValue: 6,
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
  rollValue: 6,
  cost: 7,
  industry: 'antenna',
  cardDescription: "Take 5 coins from any one player, on your turn only",
  imgURL: ''
};
export const powerPlant = {
  rollValue: 7,
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
  rollValue: 8,
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
  rollValue: 9,
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
  rollValue: 9 || 10,
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
  rollValue: 10,
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
  rollValue: 11 || 12,
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
