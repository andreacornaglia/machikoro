import {ref} from '../firebase'

let playersArr = Object.keys(ref.players) //should give only player names (not entire obj)
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
      playerObj.money += numCards //is this a proper way to update the firebase database?
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
      if(playerObj.cards.river){
        let numCards = playerObj.cards.river
        playerObj.money += numCards //is this a proper way to update the firebase database?
      }
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
    if (currentTurn.cards.bakery){
      let numCards = currentTurn.cards.bakery
      currentTurn.money += numCards //is this a proper way to update the firebase database?
    }
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
      var sum = 0
      if (player !== ref.turn) {
        let playerObj = ref.players[player]
        if (playerObj.cards.cafe){
          let numcards = playerObj.cards.cafe
          playerObj.money += numCards //is this a proper way to update the firebase database?
          sum += numCards
        }
      }
      if (currentTurn.money - sum >= 0){
        currentTurn.money -= sum //is this a proper way to update the firebase database?
      } else { currentTurn.money = 0  } //is this a proper way to update the firebase database?
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
    if (currentTurn.cards.convenienceStore){
      let numCards = currentTurn.cards.convenienceStore
      currentTurn.money += numCards * 3 //is this a proper way to update the firebase database?
    }
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
      if (playerObj.cards.museum){
        let numCards = playerObj.cards.museum
        playerObj.money += numCards //is this a proper way to update the firebase database?
      }
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
    let sum = 0
    playersArr.forEach(player => {
      if (player !== ref.turn){
        let playerObj = ref.players[player]
        if (playerObj.money >= 2) {
          sum += 2
          playerObj.money -= 2 //is this a proper way to update the firebase database?
        } else {
          sum += playerObj.money
          playerObj.money = 0 //is this a proper way to update the firebase database?
        }
      }
      currentTurn.money += sum //is this a proper way to update the firebase database?
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
  imgURL: ''
};
export const touristBus = {
  rollValue: 8,
  cost: 3,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [gear icon] establishment that you own. On your turn only",
  imgURL: ''
};
export const theater = {
  rollValue: 9,
  cost: 6,
  industry: 'gear',
  cardDescription: "Get 5 coins from the bank, on anyone's turn",
  imgURL: ''
};
export const bodega = {
  rollValue: 9 || 10,
  cost: 3,
  industry: 'mug',
  cardDescription: "Get 2 coins from the player who rolled the dice",
  imgURL: ''
};
export const wineShop = {
  rollValue: 10,
  cost: 3,
  industry: 'wheat',
  cardDescription: "Get 3 coins from the bank,on anyone's turn",
  imgURL: ''
};
export const restaurant = {
  rollValue: 11 || 12,
  cost: 2,
  industry: 'fruit',
  cardDescription: "Get 2 coins from the bank for each [wheat icon] establishment that you own. On your turn only",
  imgURL: ''
};



//UNLOCKABLE CARDS BELOW

export const radioTower = {
  cost: 22,
  cardDescription: 'Once Every Turn You can Choose To Re-Roll Your Dice'
};
export const shoppingMall = {
  cost: 10,
  cardDescription: 'If you roll doubles, take another turn after this one'
};
export const coneyIsland = {
  cost: 16,
  cardDescription: 'Each of your [mug icon] and [building icon] establishments earn +1 coin'
};
export const subwayStation = {
  cost: 4,
  cardDescription: 'You may roll 1 or 2 dice'
};
