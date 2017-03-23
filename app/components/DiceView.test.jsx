import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import DiceView, {rollDice} from './DiceView'

describe('<DiceView />', () => {
  // let root
  // beforeEach('render the root', () =>
  //   root = shallow(<DiceView />)
  // )
  //
  // it('has a rollDice button', () => {
  //   const roll = root.find('input[type="submit"]')
  //   expect(roll).to.have.length(1)
  // })

  describe('roll dice function', () => {

    it('is a function', () => {
       expect(rollDice).to.be.an('function');
   });

    it('should return a number from 1 - 6 when one player rolls one dice', () => {
        const result = rollDice(1)
        expect(result).to.be.within(1,6);
    });

    it('should return a number from 1 - 12 when one player rolls dice dice', () => {
        const result = rollDice(2)
        expect(result).to.be.within(1,12);
    });

  })
})
