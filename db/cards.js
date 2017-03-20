
export const farmersMarket = {
  rollValue: 1,
  cost: 1,
  industry: 'wheat',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/wine-shop.png'
};
export const river = {
  rollValue: 1,
  cost: 1,
  industry: 'cow',
  cardDescription: "Get 1 coin from bank on anyone's turn",
  imgURL: '/images/subway.png'
};
export const bakery = {
  rollValue: 2 || 3,
  cost: 1,
  industry: 'building',
  cardDescription: "Get 1 coin from the bank, on your turn only",
  imgURL: '/images/wine-shop.png'
};
export const cafe = {
  rollValue: 3,
  cost: 2,
  industry: 'mug',
  cardDescription: "Get 1 coin from the player who rolled the dice",
  imgURL: '/images/wine-shop.png'
};
export const convenienceStore = {
  rollValue: 4,
  cost: 2,
  industry: 'building',
  cardDescription: "Get 3 coins from the bank, on your turn only",
  imgURL: '/images/subway.png'
};
export const museum = {
  rollValue: 5,
  cost: 3,
  industry: 'gear',
  cardDescription: "Get 1 coin from the bank, on anyone's turn",
  imgURL: '/images/museum.png'
};
export const businessCenter = {
  rollValue: 6,
  cost: 8,
  industry: 'antenna',
  cardDescription: "Trade one non [antenna icon] establishment with another player, on your turn only",
  imgURL: '/images/subway.png'
};
export const stadium = {
  rollValue: 6,
  cost: 6,
  industry: 'antenna',
  cardDescription: "Get 2 coins from all players, on your turn only",
  imgURL: '/images/museum.png'
};
export const tvStation = {
  rollValue: 6,
  cost: 7,
  industry: 'antenna',
  cardDescription: "Take 5 coins from anny one player, on your turn only",
  imgURL: '/images/radio-tower.png'
};
export const powerPlant = {
  rollValue: 7,
  cost: 5,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [cow icon] establishment that you own, on your turn only",
  imgURL: '/images/power-plant.png'
};
export const touristBus = {
  rollValue: 8,
  cost: 3,
  industry: 'factory',
  cardDescription: "Get 3 coins from the bank for each [gear icon] establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png'
};
export const theater = {
  rollValue: 9,
  cost: 6,
  industry: 'gear',
  cardDescription: "Get 5 coins from the bank, on anyone's turn",
  imgURL: '/images/subway.png'
};
export const bodega = {
  rollValue: 9 || 10,
  cost: 3,
  industry: 'mug',
  cardDescription: "Get 2 coins from the player who rolled the dice",
  imgURL: '/images/coney-island.png'
};
export const wineShop = {
  rollValue: 10,
  cost: 3,
  industry: 'wheat',
  cardDescription: "Get 3 coins from the bank,on anyone's turn",
  imgURL: '/images/wine-shop.png'
};
export const restaurant = {
  rollValue: 11 || 12,
  cost: 2,
  industry: 'fruit',
  cardDescription: "Get 2 coins from the bank for each [wheat icon] establishment that you own. On your turn only",
  imgURL: '/images/tour-bus.png'
};

export const cardArray = [farmersMarket, river, bakery, cafe, convenienceStore, museum, businessCenter, stadium, tvStation, powerPlant, touristBus, theater, bodega, wineShop, restaurant]


//UNLOCKABLE CARDS BELOW

export const radioTower = {
  name: "radio-tower",
  cost: 22,
  cardDescription: 'Once every turn you can choose to re-roll your dice',
  imgURL: '/images/radio-tower.png'
};
export const shoppingMall = {
  name: "shopping-mall",
  cost: 10,
  cardDescription: 'If you roll doubles, take another turn after this one',
  imgURL: '/images/radio-tower.png'
};
export const coneyIsland = {
  name: "coney-island",
  cost: 16,
  cardDescription: 'Each of your ☕ and 🏢 establishments earn +1 coin',
  imgURL: '/images/coney-island.png'
};
export const subwayStation = {
  name: "subway",
  cost: 4,
  cardDescription: 'You may roll 1 or 2 dice',
  imgURL: '/images/subway.png'
};

export const unlockableArray = [radioTower, shoppingMall, coneyIsland, subwayStation]
