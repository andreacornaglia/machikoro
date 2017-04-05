export const farmersMarket = {
  refName: 'farmersMarket',
  displayName: "Farmer's Market",
  diceValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/farmers-market.png',
  hoverURL:'/images/farmers-market-overlay.png',
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
  imgURL: '/images/river.png',
  hoverURL:'/images/river-overlay.png',
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
  diceValue: 3,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  imgURL: '/images/bakery.png',
  hoverURL:'/images/bakery-overlay.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numBakery = currentPlayerObj.cards.bakery;
        let gainedAmount = numBakery
        if (currentPlayerObj.activatedCards.shoppingMall){
          gainedAmount += numBakery
        }
        return { money: gainedAmount }
      } else {
        return {money: 0}
      }
    } else {
       return {money: 0}
    }
  }
};

export const bar = {
  refName: 'bar',
  displayName: 'Bar',
  diceValue: 3,
  cost: 2,
  industry: 'mug',
  cardDescription: "Get 1 coin from the player who rolled the dice",
  imgURL: '/images/bar.png',
  hoverURL:'/images/bar-overlay.png',
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
        let playersMoneyNeeded = {};
        let totalMoneyGiven = 0;
        for (var k = 0; k < playerOrderNames.length; k++) {
          let player = gameState.players[playerOrderNames[k]];
          let numBars = player.cards.bar;
          let moneyToCollect = numBars;
          if (player.activatedCards.shoppingMall === true) {
            moneyToCollect += numBars;
          }
          totalMoneyGiven += moneyToCollect;
          playersMoneyNeeded[playerOrderNames[k]] = {needs: moneyToCollect, gets: 0};
        }

        // Determine how much actual money each player will receive, taking into account how much money the player who's turn it is has.
        while (totalMoneyGiven > 0 && playerOnTurnMoney > 0) {
          for (var key in playersMoneyNeeded) {
            if (playerOnTurnMoney === 0) {
              break;
            }
            if (totalMoneyGiven === 0) {
              break;
            }
            if (playersMoneyNeeded[key].needs > playersMoneyNeeded[key].gets) {
              playersMoneyNeeded[key].gets += 1;
              totalMoneyGiven -= 1;
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

export const foodStand = {
  refName: 'foodStand',
  displayName: 'Food Stand',
  diceValue: 4,
  cost: 2,
  industry: 'building',
  cardDescription: "Get 3 coins from the bank, on your turn only",
  imgURL: '/images/food-stand.png',
  hoverURL:'/images/food-stand-overlay.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numFoodStand= currentPlayerObj.cards.foodStand;
        let gainedAmount = numFoodStand * 3;
        if(currentPlayerObj.activatedCards.shoppingMall){
          gainedAmount += numFoodStand
        }
        return { money: gainedAmount }
      } else {
        return {money: 0}
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
  hoverURL:'/images/museum-overlay.png',
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
  cardDescription: "Get 5 coins from the player that has the most money, on your turn only",
  imgURL: '/images/wtc.png',
  hoverURL:'/images/wtc-overlay.png',
  // The function I wrote that determines who has the most separately for each business card the player who's rolling has (ensures they get the most possible coins, for example if the person who rolled has two business center cards and the other people have 5 and 6 coins, the player who rolled will get 10 coins (5 from each person) instead of just 6 from one person).
  cardFn: function (currentPlayer, gameState) {
    if (gameState.diceValue === this.diceValue) {
      // Find out how many business center cards the person who is rolling has.
      const playerTurnObj = gameState.players[gameState.turn];
      const playerTurnCardNum = playerTurnObj.cards.businessCenter;
      let sumForPlayerTurn = 0;
      // Create an object of how much money each player (besides the one who's turn it is) will give. Initialize it with each player's name and a value of 0 to start.
      let whoGivesMoneyObj = {};
      const playerNameArr = Object.keys(gameState.players);
      playerNameArr.forEach(player => {
        if (player !== gameState.turn) {
          whoGivesMoneyObj[player] = 0;
        }
      });
      for (var i = 0; i < playerTurnCardNum; i++) {
        // Create an object with player's names and their money.
        let playersMoney = {};
        const playersObj = gameState.players;
        for (var key in playersObj) {
          let playerName = key;
          if (playerName !== gameState.turn) {
            playersMoney[playerName] = playersObj[key].money;
          }
        }
        // Find the person with the most money and how much they have.
        let playerWithMost = null;
        let playerWithMostMoney = 0;
        for (var key2 in playersMoney) {
          if (playersMoney[key2] > playerWithMostMoney) {
            playerWithMost = key2;
            playerWithMostMoney = playersMoney[key2];
          }
        }
        // Find what the person with the most will give.
        if (playerWithMostMoney >= 5) {
          playerWithMostMoney = 5;
        }
        //If no one has money, break out of loop.
        if (playerWithMost === null) {
          break;
        }
        // Add this person and how much they are giving to the whoGivesMoneyObj.
        whoGivesMoneyObj[playerWithMost] += playerWithMostMoney;
        sumForPlayerTurn += playerWithMostMoney;
        // Now modify the gameState in the function to reflect this change in player's money.
        gameState.players[playerWithMost].money -= playerWithMostMoney;
      }
      // Now return the proper amount depending on who is the currentPlayer.
      if (currentPlayer === gameState.turn) {
        return { money: sumForPlayerTurn };
      } else {
        return { money: -whoGivesMoneyObj[currentPlayer] };
      }
    } else {
      return { money: 0 };
    }
  }
};

export const stadium = {
  refName: 'stadium',
  displayName: 'Stadium',
  diceValue: 6,
  cost: 6,
  industry: 'antenna',
  cardDescription: "Get 2 coins from all players, on your turn only",
  imgURL: '/images/stadium.png',
  hoverURL:'/images/stadium-overlay.png',
  cardFn: function (currentPlayer, gameState){
      if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[gameState.turn];
        const moneyRequested = playerObj.cards.stadium *2;
        if(currentPlayer === gameState.turn){
          const playersArr = Object.keys(gameState.players);
          let gainedAmount = 0;
          playersArr.forEach(player => {
            if (player !== currentPlayer){
              const money = gameState.players[player].money
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

export const comedyClub = {
  refName: 'comedyClub',
  displayName: 'Comedy club',
  diceValue: 6,
  cost: 7,
  industry: 'antenna',
  cardDescription: "Take 3 coins from all players, on your turn only",
  imgURL: '/images/comedy-club.png',
  hoverURL:'/images/comedy-club-overlay.png',
  //placeholder fn, update in the future
  cardFn: function (currentPlayer, gameState){
      if (gameState.diceValue === this.diceValue) {
        const playerObj = gameState.players[gameState.turn];
        const moneyRequested = playerObj.cards.comedyClub *3;
        if(currentPlayer === gameState.turn){
          const playersArr = Object.keys(gameState.players);
          let gainedAmount = 0;
          playersArr.forEach(player => {
            if (player !== currentPlayer){
              const money = gameState.players[player].money
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

export const powerPlant = {
  refName: 'powerPlant',
  displayName: 'Power Plant',
  diceValue: 7,
  cost: 5,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each 🐄 establishment that you own, on your turn only",
  imgURL: '/images/power-plant.png',
  hoverURL:'/images/power-plant-overlay.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const gainedAmount = currentPlayerObj.cards.river * 3 * currentPlayerObj.cards.powerPlant;
        return { money: gainedAmount }
      } else {
        return { money : 0 }
      }
    } else {
      return { money: 0 }
    }
  }
};

export const touristBus = {
  refName: 'touristBus',
  displayName: 'Tourist Bus',
  diceValue: 8,
  cost: 3,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each ⚙ establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png',
  hoverURL:'/images/tour-bus-overlay.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const gainedAmount = (currentPlayerObj.cards.museum + currentPlayerObj.cards.broadway) * 3 * currentPlayerObj.cards.touristBus;
        return { money: gainedAmount }
      } else {
        return { money: 0}
      }
    } else {
      return { money: 0 }
    }
  }
};

export const broadway = {
  refName: 'broadway',
  displayName: 'Broadway',
  diceValue: 9,
  cost: 6,
  industry: 'gear',
  cardDescription: "Get 5 coins from the bank, on anyone's turn",
  imgURL: '/images/broadway.png',
  hoverURL:'/images/broadway-overlay.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      const currentPlayerObj = gameState.players[currentPlayer];
      const numCards = currentPlayerObj.cards.broadway;
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
  diceValue: 10,
  cost: 3,
  industry: 'mug',
  cardDescription: "Get 2 coins from the player who rolled the dice",
  imgURL: '/images/bodega.png',
  hoverURL:'/images/bodega-overlay.png',
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
        let playersMoneyNeeded = {};
        let totalMoneyGiven = 0;
        for (var k = 0; k < playerOrderNames.length; k++) {
          let player = gameState.players[playerOrderNames[k]];
          let numBodegas = player.cards.bodega;
          let moneyToCollect = numBodegas * 2;
          if (player.activatedCards.shoppingMall === true) {
            moneyToCollect += numBodegas;
          }
          totalMoneyGiven += moneyToCollect;
          playersMoneyNeeded[playerOrderNames[k]] = {needs: moneyToCollect, gets: 0};
        }
        // Determine how much actual money each player will receive, taking into account how much money the player who's turn it is has.
        while (totalMoneyGiven > 0 && playerOnTurnMoney > 0) {
          for (var key in playersMoneyNeeded) {
            if (playerOnTurnMoney === 0) {
              break;
            }
            if (totalMoneyGiven === 0) {
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
  refName: 'wineShop',
  displayName: 'Wine Shop',
  diceValue: 11,
  cost: 3,
  industry: 'wheat',
  cardDescription: "Get 3 coins from the bank,on anyone's turn",
  imgURL: '/images/wine-shop.png',
  hoverURL:'/images/wine-shop-overlay.png',
  cardFn: function(currentPlayer, gameState){
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
  diceValue: 12,
  cost: 2,
  industry: 'fruit',
  cardDescription: "Get 2 coins from the bank for each 🌾 establishment that you own. On your turn only",
  imgURL: '/images/restaurant.png',
  hoverURL:'/images/restaurant-overlay.png',
  cardFn: function(currentPlayer, gameState){
    if (this.diceValue === gameState.diceValue) {
      if (gameState.turn === currentPlayer) {
        const currentPlayerObj = gameState.players[currentPlayer];
        const numWheat = currentPlayerObj.cards.farmersMarket + currentPlayerObj.cards.wineShop;
        const gainedAmount = numWheat * 2 * currentPlayerObj.cards.restaurant;
        return { money: gainedAmount }
      } else {
        return { money: 0}
      }
    } else {
      return {money: 0}
    }
  }
};

export const cardArray = [farmersMarket, river, bakery, bar, foodStand, museum, businessCenter, stadium, comedyClub, powerPlant, touristBus, broadway, bodega, wineShop, restaurant]


//UNLOCKABLE CARDS BELOW

export const radioTower = {
  refName: 'radioTower',
  displayName: 'Radio Tower',
  cost: 22,
  cardDescription: 'Once every turn you can choose to re-roll your dice',
  imgURL: '/images/radio-tower.png',
  hoverURL:'/images/radio-tower-overlay.png'
};
export const coneyIsland = {
  refName: 'coneyIsland',
  displayName: 'Coney Island',
  cost: 16,
  cardDescription: 'If you roll doubles, take another turn after this one',
  imgURL: '/images/coney-island.png',
  hoverURL:'/images/coney-island-overlay.png'
};
export const shoppingMall = {
  refName: 'shoppingMall',
  displayName: 'Shopping Mall',
  cost: 10,
  cardDescription: 'Each of your ☕ and 🏢 establishments earn +1 coin',
  imgURL: '/images/shopping-mall.png',
  hoverURL:'/images/shopping-mall-overlay.png'
};
export const subwayStation = {
  refName: 'subwayStation',
  displayName: 'Subway Station',
  cost: 4,
  cardDescription: 'You may roll 1 or 2 dice',
  imgURL: '/images/subway.png',
  hoverURL:'/images/subway-overlay.png'
};

export const unlockableArray = [radioTower, shoppingMall, coneyIsland, subwayStation]
