export const farmersMarket = {
  refName: 'farmersMarket',
  displayName: "Farmer's Market",
  diceValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/wine-shop.png',
  cardFn: function(currentPlayer, gameState){
      if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[currentPlayer];
        const numCards = playerObj.cards.farmersMarket;
        const gainedAmount = numCards * 1;
        return { money: gainedAmount };
     } else {
       return {money: 0}
     }
  }
};

export const river = {
  refName: 'river',
  displayName: 'River',
  diceValue: 2,
  cost: 1,
  industry: 'cow',
  cardDescription: "Get 1 coin from the bank on anyone's turn",
  imgURL: '/images/subway.png',
  cardFn: function(currentPlayer, gameState){
      if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[currentPlayer];
        const numCards = playerObj.cards.river;
        const gainedAmount = numCards * 1;
        return { money: gainedAmount };
     } else {
       return {money: 0}
     }
  }
};

export const bakery = {
  refName: 'bakery',
  displayName: 'Bakery',
  diceValue: [2,3] ,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  imgURL: '/images/wine-shop.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue.includes(gameState.diceValue)) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numBakery= currentPlayerObj.cards.bakery;
        let gainedAmount = numBakery
        if(currentPlayerObj.activatedCards.shoppingMall){
          gainedAmount += numBakery
        }
        return { money: gainedAmount }
      }
    } else {
       return {money: 0}
    }
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
  cardFn: function(currentPlayer, gameState) {
    // change below to this.diceValue
    if (this.diceValue === gameState.diceValue) {
        
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
          let numCafes = player.cards.cafe;
          let moneyToCollect = numCafes;
          if (player.activatedCards.shoppingMall === true) {
            moneyToCollect += numCafes;
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
    } else {
       return {money: 0}
     }
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
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numConvStore= currentPlayerObj.cards.convenienceStore;
        let gainedAmount = numConvStore * 3;
        if(currentPlayerObj.activatedCards.shoppingMall){
          gainedAmount += numConvStore
        }
        return { money: gainedAmount }
      }
    } else {
      return {money: 0}
    }
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
  cardFn: function(currentPlayer, gameState){
      if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[currentPlayer];
        const numCards = playerObj.cards.museum;
        const gainedAmount = numCards;
        return { money: gainedAmount };
      } else {
          return {money: 0}
      }
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
  //Fn TBD
};

export const stadium = {
  refName: 'stadium',
  displayName: 'Stadium',
  diceValue: 6,
  cost: 6,
  industry: 'antenna',
  cardDescription: "Get 2 coins from all players, on your turn only",
  imgURL: '/images/museum.png',
  cardFn: function (currentPlayer, gameState){
      if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[gameState.turn];
        const moneyRequested = playerObj.cards.stadium *2;
        if(currentPlayer === gameState.turn){
          const playersArr = Object.keys(gameState.players);
          let gainedAmount = 0;
          playersArr.forEach(player => {
            if (player !== currentPlayer){
              const money = player.money
              if(money >= moneyRequested){
                gainedAmount += moneyRequested;
              } else{
                gainedAmount += money;
              }
            }
          })
          return {money: gainedAmount};
        } else {
          const currentPlayerObj = gameState.players[currentPlayer];
           if(currentPlayerObj.money >= moneyRequested){
             return {money: - moneyRequested};
           }
          else {
            return {money: - currentPlayerObj.money};
          }
        }
     } else {
        return {money: 0}
    }
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
  //fn tbd
};

export const powerPlant = {
  refName: 'powerPlant',
  displayName: 'Power Plant',
  diceValue: 7,
  cost: 5,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [cow icon] establishment that you own, on your turn only",
  imgURL: '/images/power-plant.png',
  cardFn: (currentPlayer, gameState) => {
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const gainedAmount = currentPlayerObj.cards.river * 3 * currentPlayerObj.cards.powerPlant;
        return { money: gainedAmount }
      }
    } else {
      return {money: 0}
    }
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
  cardFn: (currentPlayer, gameState) => {
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const gainedAmount = (currentPlayerObj.cards.museum + currentPlayerObj.cards.theatre) * 3 * currentPlayerObj.cards.touristBus;
        return { money: gainedAmount }
      }
    } else {
      return {money: 0}
    }
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
  cardFn: (currentPlayer, gameState) => {
    if (this.diceValue = gameState.diceValue) {
      const currentPlayerObj = gameState.players[currentPlayer];
      const numCards = currentPlayerObj.cards.theatre;
      const gainedAmount = numCards * 5;
      return { money: gainedAmount }
    } else {
      return {money: 0}
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
  cardFn: function(currentPlayer, gameState) {
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
   } else {
    return {money: 0}
  }
  }
};
    
export const wineShop = {
  diceValue: 10,
  cost: 3,
  industry: 'wheat',
  cardDescription: "Get 3 coins from the bank,on anyone's turn",
  imgURL: '/images/tour-bus.png',
  cardFn: (currentPlayer, gameState) => {
    if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[currentPlayer];
        const numCards = playerObj.cards.wineShop;
        const gainedAmount = numCards * 3;
        return { money: gainedAmount };
     } else {
      return {money: 0}
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
  cardFn: (currentPlayer, gameState) => {
    if (this.diceValue.includes(gameState.diceValue)) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numWheat = currentPlayerObj.cards.farmersMarket + currentPlayerObj.cards.wineShop;
        const gainedAmount = numWheat * 2 * currentPlayerObj.cards.restaurant;
        return { money: gainedAmount }
      }
    } else {
      return {money: 0}
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
export const coneyIsland = {
  refName: 'coneyIsland',
  displayName: 'Coney Island',
  cost: 16,
  cardDescription: 'If you roll doubles, take another turn after this one',
  imgURL: '/images/radio-tower.png'
};
export const shoppingMall = {
  refName: 'shoppingMall',
  displayName: 'Shopping Mall',
  cost: 10,
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