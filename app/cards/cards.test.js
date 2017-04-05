import chai, {expect} from 'chai'
import * as cardFunctions from './cards';
import {calculateMoney} from '../firebaseFunctions'

describe('Card functions', () => {

    it('is an object', () => {
        expect(cardFunctions).to.be.an('object');
    });

    describe('Farmers Market', () => {

        it('has an action function', () => {
            expect(cardFunctions.farmersMarket.cardFn).to.be.a('function');
        });

        it('should return { money: 1 } when player has one farmers market', () => {
            const gainedAmount = cardFunctions.farmersMarket.cardFn('raina', {
                diceValue: 1,
                players: {
                    raina: {
                        cards: {
                            farmersMarket: 1
                        }
                    }
                }
            });
            expect(gainedAmount.money).to.be.equal(1);
        });

        it('should return { money: 4 } when player has four farmers market', () => {
            const gainedAmount = cardFunctions.farmersMarket.cardFn('raina', {
                diceValue: 1,
                players: {
                    raina: {
                        cards: {
                            farmersMarket: 4
                        }
                    }
                }
            });
            expect(gainedAmount.money).to.be.equal(4);
        });

        it('should return { money: 4 } when player has four farmers market even on not her turn', () => {
            const gainedAmount = cardFunctions.farmersMarket.cardFn('raina', {
                turn: 'susan',
                diceValue: 1,
                players: {
                    raina: {
                        cards: {
                            farmersMarket: 1
                        }
                    }
                }
            });
            expect(gainedAmount.money).to.be.equal(1);
        });

        it('should return { money: 0 } if she has no farmers markets', () => {
            const gainedAmount = cardFunctions.farmersMarket.cardFn('raina', {
                turn: 'susan',
                diceValue: 1,
                players: {
                    raina: {
                        cards: {
                            farmersMarket: 0
                        }
                    }
                }
            });
            expect(gainedAmount.money).to.be.equal(0);
        });
        it('should return { money: 0 } if dice is not 1', () => {
        const gainedAmount = cardFunctions.farmersMarket.cardFn('raina', {
            turn: 'susan',
            diceValue: 2,
            players: {
                raina: {
                    cards: {
                        farmersMarket: 4
                    }
                }
            }
        });
        expect(gainedAmount.money).to.be.equal(0);
    });

    });

    describe('Bodega', () => {

        it('has a function', () => {
            expect(cardFunctions.bodega.cardFn).to.be.a('function');
        });

        const game = {
          diceValue: 10,
          turn: 'playerTwo',
          turnOrder: {
            first: 'playerOne',
            second: 'playerTwo',
            third: 'playerThree',
            fourth: 'playerFour'
          },
          players: {
            playerOne: {
              cards: {
                bodega: 1
              },
              activatedCards: {
                shoppingMall: false
              },
              money: 20
            },
            playerTwo: {
              cards: {
                bodega: 2
              },
              activatedCards: {
                shoppingMall: false
              },
              money: 5
            },
            playerThree: {
              cards: {
                bodega: 1
              },
              activatedCards: {
                shoppingMall: false
              },
              money: 5
            },
            playerFour: {
              cards: {
                bodega: 1
              },
              activatedCards: {
                shoppingMall: true
              },
              money: 5
            }
          }
        };

        it('should return { money: -5 } when player rolls 9-10 and other players have bodegas', () => {
            const gainedAmount = cardFunctions.bodega.cardFn('playerTwo', game);
            expect(gainedAmount.money).to.be.equal(-5);
        });

        it('should return { money: 2 } when other player rolls 9-10 and current player has bodega cards', () => {
            const gainedAmount = cardFunctions.bodega.cardFn('playerFour', game);
            expect(gainedAmount.money).to.be.equal(2);
        });
    });


    describe('Business Center', () => {

        it('has an action function', () => {
            expect(cardFunctions.businessCenter.cardFn).to.be.a('function');
        });

            const game = {
                diceValue: 6,
                turn: 'playerTwo',
                players: {
                    playerOne: {
                        cards: {
                            bodega: 1
                        },
                        activatedCards: {
                            shoppingMall: false
                        },
                        money: 0
                    },
                    playerTwo: {
                        cards: {
                            bodega: 2,
                            businessCenter: 2
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 5
                    },
                    playerThree: {
                        cards: {
                            bodega: 1
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 0
                    }
                }
            };

        it('should return { money: 0 } when no players have money', () => {
            const gainedAmount = cardFunctions.businessCenter.cardFn('playerTwo', game);
            expect(gainedAmount.money).to.be.equal(0);
        });

            const game2 = {
                diceValue: 6,
                turn: 'playerTwo',
                players: {
                    playerOne: {
                        cards: {
                            bodega: 1
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 6
                    },
                    playerTwo: {
                        cards: {
                            bodega: 2,
                            businessCenter: 2
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 5
                    },
                    playerThree: {
                        cards: {
                            bodega: 1
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 5
                    }
                }
            };

        it('should return { money: 10 } when the current player is the one whose turn it is, they have two business cards, and the other two players have 5 and 6 coins.', () => {
            const gainedAmount = cardFunctions.businessCenter.cardFn('playerTwo', game2);
            expect(gainedAmount.money).to.be.equal(10);
        });

            const game3 = {
                diceValue: 6,
                turn: 'playerTwo',
                players: {
                    playerOne: {
                        cards: {
                            bodega: 1
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 6
                    },
                    playerTwo: {
                        cards: {
                            bodega: 2,
                            businessCenter: 2
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 5
                    },
                    playerThree: {
                        cards: {
                            bodega: 1
                        },
                        activatedCards:{
                            shoppingMall: false
                        },
                        money: 5
                    }
                }
            };

        it('should return { money: -5 } when the current player is the one whose turn it is, they have two business cards, and the other two players have 5 and 6 coins.', () => {
            const gainedAmount = cardFunctions.businessCenter.cardFn('playerThree', game3);
            expect(gainedAmount.money).to.be.equal(-5);
        });

});


describe('Calculate money', () => {
   it('is a function', () => {
        expect(calculateMoney).to.be.an('function');
    });

     const game = {
          diceValue: 1,
          turn: 'playerOne',
          turnOrder: {
            first: 'playerOne',
            second: 'playerTwo',
            third: 'playerThree',
            fourth: 'playerFour'
          },
          players: {
            playerOne: {
              cards: {
                farmersMarket: 1
              },
              activatedCards:{
                shoppingMall: false
              },
              money: 20
            },
            playerTwo: {
              cards: {
                farmersMarket: 1
              },
              activatedCards:{
                shoppingMall: false
              },
              money: 5
            },
            playerThree: {
              cards: {
                bodega: 1
              },
              activatedCards:{
                shoppingMall: false
              },
              money: 5
            },
            playerFour: {
              cards: {
                bodega: 1
              },
              activatedCards:{
                shoppingMall: true
              },
              money: 5
            }
          }
        };

    it('returns correct new amount of money for player based on dice value', () => {
        //const cardArray = cardFunctions.cardArray;
        const result = calculateMoney('playerOne', game)
        expect(result).to.be.equal(21);
    });

  })
})
