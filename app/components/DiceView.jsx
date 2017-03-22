import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {ref} from '../firebase'

export default class DiceView extends Component {
    constructor(props){
      super(props)
      this.state = {
        turn: "playerOne",
        player: "playerOne",
        diceValue: 1
      }
      this.rollDice = this.rollDice.bind(this)
      this.chooseDiceNum = this.chooseDiceNum.bind(this)
    }

    rollDice(diceNum){
      let newDiceNum;
      if (diceNum === 1) {
        newDiceNum = Math.floor(Math.random() * (6) + 1);
      }
      if (diceNum === 2){
        newDiceNum = Math.floor(Math.random() * (12) + 1);
      }
      this.props.onDiceRoll(newDiceNum)
    }


    chooseDiceNum(){
      const game = this.props.game
      console.log('props', this.props)
      const currPlayer = this.state.player

       if (game.turn === this.state.player) {
         this.rollDice(1)
        //  if (game.players.currPlayer.activatedCards.subwayStation === true) {
        //    // Ask player if they want to roll 1 or 2. Then offer them a roll dice button that will roll that amount.
         //
        //  } else {
        //    // Offer a roll dice button that will only roll one die.
        //    this.rollDice(1)
        //  }
       }
    }

    // componentWillMount(){
    //   let newDiceNum = this.rollDice(1);
    //   this.props.onDiceRoll(newDiceNum)
    //     // console.log('newdice', this.state.diceValue)
    // }

    render() {
        const game = this.props.game
        console.log('game', game)

        return (
            <div className="diceContainer">
              <p>Player Turn: {game.turn} </p>
              <p>Dice Value: {game.diceValue}</p>
              <Button bsSize="xsmall" bsStyle="success">Roll Dice!</Button>
            </div>
        )
    }
}
