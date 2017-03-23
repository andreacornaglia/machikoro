import chai, {expect} from 'chai'
// import * as cardFunctions from './cards';
import {rollDice} from './DiceView'

describe('Roll Dice function', () => {

    it('is a function', () => {
       expect(rollDice).to.be.an('function');
   });

    describe('Roll dice functionality', () => {

        it('should return a number from 1 - 6 when one player rolls one dice', () => {

            const result = rollDice(1)
            expect(result).to.be.within(1,6);
        });

        it('should return a number from 1 - 12 when one player rolls dice dice', () => {

            const result = rollDice(2)
            expect(result).to.be.within(1,12);
        });
    });

});
