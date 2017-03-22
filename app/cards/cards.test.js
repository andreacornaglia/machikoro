import chai, {expect} from 'chai'
import * as cardFunctions from './cards';

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
      
      
    ///////
    });

});