<<<<<<< Updated upstream:db/cards.js

=======
>>>>>>> Stashed changes:app/cards/cards.js
export const farmersMarket = {
  refName: 'farmersMarket',
  displayName: "Farmer's Market",
  rollValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
<<<<<<< Updated upstream:db/cards.js
  imgURL: '/images/wine-shop.png'
=======
  action: (currentPlayer, gameState) => {
      if (gameState.diceValue === 1) {
          const playerObj = gameState.players[currentPlayer];
          const numCards = playerObj.cards.farmersMarket;
          const gainedAmount = numCards * 1;
          return { money: gainedAmount };
      } else {
        return { money: 0 };
      }
  },
  imgURL: ''
>>>>>>> Stashed changes:app/cards/cards.js
};
export const river = {
  refName: 'river',
  displayName: 'River',
  rollValue: 1,
  cost: 1,
  industry: 'cow',
  cardDescription: "Get 1 coin from bank on anyone's turn",
  imgURL: '/images/subway.png'
};
export const bakery = {
  refName: 'bakery',
  displayName: 'Bakery',
  rollValue: 2 || 3,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  imgURL: '/images/wine-shop.png'
};
export const cafe = {
  refName: 'cafe',
  displayName: 'Cafe',
  rollValue: 3,
  cost: 2,
  industry: 'mug',
  cardDescription: "Get 1 coin from the player who rolled the dice",
<<<<<<< Updated upstream:db/cards.js
  imgURL: '/images/wine-shop.png'
=======
  action: (currentPlayer, gameState) => {
      let numCards
      let playerObj
      let newAmount
      let currentTurnNewAmount
      if (currentPlayer !== gameState.turn) {
        playerObj = gameState.players[player];
        const turnPlayerObj = gameState.players[gameState.turn];
        const turnPlayerMoney = turnPlayerObj.money;
        if (turnPlayerMoney.money === 0) {
          return {money: 0};
        }
        numCards = playerObj.cards.cafe || 0;
        newAmount = numCards;
        playerObj.update({money: newAmount}) //is this a proper way to update the firebase database?
      }
      if (currentTurn.money - numCards >= 0){
        currentTurnNewAmount = currentTurn.money - numCards
        currentTurn.update({money: currentTurnNewAmount}) //is this a proper way to update the firebase database?
      } else { currentTurn.update({money: 0}) } //is this a proper way to update the firebase database?
  },
  imgURL: ''
>>>>>>> Stashed changes:app/cards/cards.js
};
export const convenienceStore = {
  refName: 'convenienceStore',
  displayName: 'Convenience Store',
  rollValue: 4,
  cost: 2,
  industry: 'building',
  cardDescription: "Get 3 coins from the bank, on your turn only",
  imgURL: '/images/subway.png'
};
export const museum = {
  refName: 'museum',
  displayName: 'Museum',
  rollValue: 5,
  cost: 3,
  industry: 'gear',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/museum.png'
};
export const businessCenter = {
  refName: 'businessCenter',
  displayName: 'Business Center',
  rollValue: 6,
  cost: 8,
  industry: 'antenna',
  cardDescription: "Trade one non [antenna icon] establishment with another player, on your turn only",
  imgURL: '/images/subway.png'
};
export const stadium = {
  refName: 'stadium',
  displayName: 'Stadium',
  rollValue: 6,
  cost: 6,
  industry: 'antenna',
  cardDescription: "Get 2 coins from all players, on your turn only",
  imgURL: '/images/museum.png'
};
export const tvStation = {
  refName: 'tvStation',
  displayName: 'TV Station',
  rollValue: 6,
  cost: 7,
  industry: 'antenna',
  cardDescription: "Take 5 coins from anny one player, on your turn only",
  imgURL: '/images/radio-tower.png'
};
export const powerPlant = {
  refName: 'powerPlant',
  displayName: 'Power Plant',
  rollValue: 7,
  cost: 5,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [cow icon] establishment that you own, on your turn only",
  imgURL: '/images/power-plant.png'
};
export const touristBus = {
  refName: 'touristBus',
  displayName: 'Tourist Bus',
  rollValue: 8,
  cost: 3,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [gear icon] establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png'
};
export const theatre = {
  refName: 'theatre',
  displayName: 'Theatre',
  rollValue: 9,
  cost: 6,
  industry: 'gear',
  cardDescription: "Get 5 coins from the bank, on anyone's turn",
  imgURL: '/images/subway.png'
};
export const bodega = {
  refName: 'bodega',
  displayName: 'Bodega',
  rollValue: 9 || 10,
  cost: 3,
  industry: 'mug',
  cardDescription: "Get 2 coins from the player who rolled the dice",
  imgURL: '/images/coney-island.png'
};
export const wineShop = {
  refName: 'wineShop',
  displayName: 'Wine Shop',
  rollValue: 10,
  cost: 3,
  industry: 'wheat',
  cardDescription: "Get 3 coins from the bank,on anyone's turn",
  imgURL: '/images/wine-shop.png'
};
export const restaurant = {
  refName: 'restaurant',
  displayName: 'Restaurant',
  rollValue: 11 || 12,
  cost: 2,
  industry: 'fruit',
  cardDescription: "Get 2 coins from the bank for each [wheat icon] establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png'
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
  imgURL: '/images/coney-island.png'
};
export const subwayStation = {
  refName: 'subwayStation',
  displayName: 'Subway Station',
  cost: 4,
  cardDescription: 'You may roll 1 or 2 dice',
  imgURL: '/images/subway.png'
};

export const unlockableArray = [radioTower, shoppingMall, coneyIsland, subwayStation]
