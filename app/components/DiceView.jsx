import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateDiceNum} from '../firebaseFunctions'

class DiceView extends Component {
    constructor(props){
      super(props)
      this.state = {
        showRollAgain: false
      }
      this.rollDice = this.rollDice.bind(this)
      this.checkIfSubwayUnlocked = this.checkIfSubwayUnlocked.bind(this)
      this.displayChooseDiceNumModal = this.displayChooseDiceNumModal.bind(this)
    }

    //this function generates a new dice value
    rollDice(diceNum){
      let newDiceNum;
      if (diceNum === 1) {
        newDiceNum = Math.ceil(Math.random() * (6));
      }
      if (diceNum === 2){
        newDiceNum = Math.ceil(Math.random() * (12));
      }
      return newDiceNum;
    }


    checkIfSubwayUnlocked(){
      let game = this.props.game
      let currentTurn = game.turn;
      let currentTurnObj = game.players[currentTurn]
      if (currentTurnObj.activatedCards.subwayStation) {
        return true;
      } else {
        return false;
      }
    }

    displayChooseDiceNumModal(){
      let game = this.props.game
      let turn = this.props.game.turn
      let players = this.props.game.players
      let user = this.props.user.name
      const playersObj = Object.keys(players)
      let currentPlayer;

      playersObj.forEach(player => {
        if (players[player].name === user) {
          currentPlayer = player
        }
      })

      if (this.checkIfSubwayUnlocked()){
        this.props.showModal()
      } else {
        let newDiceVal = this.rollDice(1)
        //use promise to guarantee we use the latest dice value
        updateDiceNum(newDiceVal)
      }
    }

    render() {
        return (
          <Button
            bsSize="xsmall"
            bsStyle="success"
            onClick={() => {
              this.displayChooseDiceNumModal()
            }}>
            Roll Dice!
            </Button>
        )
    }
}

export default connect(state => {
  return {
    game: state.game,
    user: state.auth
  }
})(DiceView)
