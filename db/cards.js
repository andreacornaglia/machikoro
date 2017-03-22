import {ref} from '../firebase'

let playersArr = Object.keys(ref.players) //should give only player property names (not entire obj)
let currentTurn = ref.players[ref.turn] //should give the entire current player object

export const farmersMarket = {
  refName: 'farmersMarket',
  displayName: "Farmer's Market",
  diceValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/wine-shop.png',
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.farmersMarket
      let newAmount = playerObj.money + numCards
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  }
};
export const river = {
  refName: 'river',
  displayName: 'River',
  diceValue: 1,
  cost: 1,
  industry: 'cow',
  imgURL: '/images/subway.png',
  cardDescription: "Get 1 coin from the bank on anyone's turn",
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.river || 0
      let newAmount = playerObj.money + numCards
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  }
};
export const bakery = {
  refName: 'bakery',
  displayName: 'Bakery',
  diceValue: 2 || 3,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  imgURL: '/images/wine-shop.png',
  action: () => {
    let numCards = currentTurn.cards.bakery || 0
    let newAmount = currentTurn.money + numCards
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  }
};
export const cafe = {
  refName: 'cafe',
  displayName: 'Cafe',
  diceValue: 3,
  cost: 2,
  industry: 'mug',
  cardDescription: "Get 1 coin from the player who rolled the dice",
  imgURL: '/images/wine-shop.png',
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
  }
};
export const convenienceStore = {
  refName: 'convenienceStore',
  displayName: 'Convenience Store',
  diceValue: 4,
  cost: 2,
  industry: 'building',
  cardDescription: "Get 3 coins from the bank, on your turn only",
  imgURL: '/images/subway.png',
  action: () => {
    let numCards = currentTurn.cards.convenienceStore || 0
    let newAmount = currentTurn.money + (numCards * 3)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  }
};
export const museum = {
  refName: 'museum',
  displayName: 'Museum',
  diceValue: 5,
  cost: 3,
  industry: 'gear',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/museum.png',
  action: () => {
    playersArr.forEach(player => {
      let playerObj = ref.players[player]
      let numCards = playerObj.cards.museum || 0
      let newAmount = playerObj.money + numCards
      playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
    })
  }
};
export const businessCenter = {
  refName: 'businessCenter',
  displayName: 'Business Center',
  diceValue: 6,
  cost: 8,
  industry: 'antenna',
  cardDescription: "Trade one non [antenna icon] establishment with another player, on your turn only",
  imgURL: '/images/subway.png'
};
export const stadium = {
  refName: 'stadium',
  displayName: 'Stadium',
  diceValue: 6,
  cost: 6,
  industry: 'antenna',
  cardDescription: "Get 2 coins from all players, on your turn only",
  imgURL: '/images/museum.png',
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
  }
};
export const tvStation = {
  refName: 'tvStation',
  displayName: 'TV Station',
  diceValue: 6,
  cost: 7,
  industry: 'antenna',
  cardDescription: "Take 5 coins from any one player, on your turn only",
  imgURL: '/images/radio-tower.png'
};
export const powerPlant = {
  refName: 'powerPlant',
  displayName: 'Power Plant',
  diceValue: 7,
  cost: 5,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [cow icon] establishment that you own, on your turn only",
  imgURL: '/images/power-plant.png',
  action: () => {
    let numCards = currentTurn.cards.river || 0 //river is the only card type with the cow icon
    let newAmount = currentTurn.money + (numCards * 3)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  }
};
export const touristBus = {
  refName: 'touristBus',
  displayName: 'Tourist Bus',
  diceValue: 8,
  cost: 3,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [gear icon] establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png',
  action: () => {
    let numCards = 0
    numCards += currentTurn.cards.museum || 0 //museum and theater are the only card types with gear icon
    numCards += currentTurn.cards.theater || 0
    let newAmount = currentTurn.money + (numCards * 3)
    currentTurn.update({money: newAmount}) //is this a proper way to update the firebase database?
  }
};
export const theatre = {
  refName: 'theatre',
  displayName: 'Theatre',
  diceValue: 9,
  cost: 6,
  industry: 'gear',
  cardDescription: "Get 5 coins from the bank, on anyone's turn",
  imgURL: '/images/subway.png',
  action: (currentPlayer, gameState) => {
    if (this.diceValue = gameState.diceValue) {
      const currentPlayerObj = gameState.players[currentPlayer];
      const numCards = currentPlayerObj.cards.theatre;
      const gainedAmount = numCards * 5;
      return { money: gainedAmount }
    }
  }
};
export const bodega = {
  refName: 'bodega',
  displayName: 'Bodega',
  diceValue: [9, 10],
  cost: 3,
  industry: 'mug',
  cardDescription: "Get 2 coins from the player who rolled the dice",
  imgURL: '/images/coney-island.png',
  action: function(currentPlayer, gameState) {
    // change below to this.diceValue
    if (this.diceValue.includes(gameState.diceValue)) {
        
        // Find the player who's turn it is and how much money they have.
        const playerOnTurn = gameState.players[gameState.turn];
        let playerOnTurnMoney = playerOnTurn.money;
        
        // Create an array of the players names in the order they should be paid.
        let playerOrder = [];
        const orderKeys = Object.keys(gameState.turnOrder);
        
        let playerOnTurnIndex;
        orderKeys.forEach((element, index) => {
          if (gameState.turnOrder[element] === gameState.turn) {
            playerOnTurnIndex = index;
          }
        });
        for (let i = playerOnTurnIndex + 1; i < orderKeys.length; i++) {
          playerOrder.push(orderKeys[i]);
        }
        if (playerOnTurnIndex !== 0) {
          for (let j = 0; j < playerOnTurnIndex; j++) {
            playerOrder.push(orderKeys[j]);
          }
        }

        const playerOrderNames = playerOrder.map(element => {
          return gameState.turnOrder[element];
        });
        
        // Amount of money each player should receive in order of turns. In the form of an object with the player's name as the key and a value of an object with how much money they need (assuming the player who's turn it is has infinite money) and how much they will actually get (which is zero for now).
        playersMoneyNeeded = {};
        for (var k = 0; k < playerOrderNames.length; k++) {
          let player = gameState.players[playerOrderNames[k]];
          let numBodegas = player.cards.bodega;
          let moneyToCollect = numBodegas * 2;
          if (player.activatedCards.shoppingMall === true) {
            moneyToCollect += numBodegas;
          }
          playersMoneyNeeded[playerOrderNames[k]] = {needs: moneyToCollect, gets: 0};
        }
        
        // Determine how much actual money each player will receive, taking into account how much money the player who's turn it is has.
        while (playerOnTurnMoney > 0) {
          for (var key in playersMoneyNeeded) {
            if (playerOnTurnMoney === 0) {
              break;
            }
            if (playersMoneyNeeded[key].needs > playersMoneyNeeded[key].gets) {
              playersMoneyNeeded[key].gets += 1;
              playerOnTurnMoney -= 1;
            }
          }
        }
        
      if (gameState.turn !== currentPlayer) {
        // Now return a value that refers to how much money the currentPlayer will gain.
        const gainedAmount = playersMoneyNeeded[currentPlayer].gets;
        return { money: gainedAmount };
      } else {
        let lostAmount = 0;
        for (var key2 in playersMoneyNeeded) {
          lostAmount -= playersMoneyNeeded[key2].gets;
        }
        return { money: lostAmount };
      }
    }
  }
};
export const restaurant = {
  refName: 'restaurant',
  displayName: 'Restaurant',
  diceValue: [11, 12],
  cost: 2,
  industry: 'fruit',
  cardDescription: "Get 2 coins from the bank for each [wheat icon] establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png',
  action: (currentPlayer, gameState) => {
    if (this.diceValue.includes(gameState.diceValue)) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numWheat = currentPlayerObj.cards.farmersMarket + currentPlayerObj.cards.wineShop;
        const gainedAmount = numWheat * 2;
        return { money: gainedAmount }
      }
    }
  }
};

export const cardArray = [farmersMarket, river, bakery, cafe, convenienceStore, museum, businessCenter, stadium, tvStation, powerPlant, touristBus, theatre, bodega, wineShop, restaurant]


//UNLOCKABLE CARDS BELOW

export const radioTower = {
  refName: 'radioTower',
  displayName: 'Radio Tower',
  cost: 22,
  cardDescription: 'Once every turn you can choose to re-roll your dice',
  imgURL: '/images/radio-tower.png'
};
export const shoppingMall = {
  refName: 'shoppingMall',
  displayName: 'Shopping Mall',
  cost: 10,
  cardDescription: 'If you roll doubles, take another turn after this one',
  imgURL: '/images/radio-tower.png'
};
export const coneyIsland = {
  refName: 'coneyIsland',
  displayName: 'Coney Island',
  cost: 16,
  cardDescription: 'Each of your ☕ and 🏢 establishments earn +1 coin',
  imgURL: '/images/coney-island.png',
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
  }
};
export const subwayStation = {
  refName: 'subwayStation',
  displayName: 'Subway Station',
  cost: 4,
  cardDescription: 'You may roll 1 or 2 dice',
  imgURL: '/images/subway.png'
};

export const unlockableArray = [radioTower, shoppingMall, coneyIsland, subwayStation]
