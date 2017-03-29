import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateDiceNum} from '../firebaseFunctions'
import ChooseDiceNumModal from './ChooseDiceNumModal'
import firebase from 'firebase'
import {calculateMoney} from '../firebaseFunctions'

class DiceView extends Component {
    constructor(props){
      super(props)
      this.state = {
        showRollAgain: false
      }
      this.rollDice = this.rollDice.bind(this)
      this.checkIfSubwayUnlocked = this.checkIfSubwayUnlocked.bind(this)
      this.checkIfRadioTowerUnlocked = this.checkIfRadioTowerUnlocked.bind(this)
      this.displayChooseDiceNumModal = this.displayChooseDiceNumModal.bind(this)
    }

    // componentWillReceiveProps(nextProps){
    //   console.log('in will receive props: ', this.props.game)
    //   if (this.props.game.phase === 'roll' && nextProps.game.phase === 'buy') {
    //     calculateMoney(this.props.user.name, nextProps.game);
    //   }
    // }

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

    checkIfRadioTowerUnlocked(){
      let game = this.props.game
      let currentTurn = game.turn;
      let currentTurnObj = game.players[currentTurn]
      if (currentTurnObj.activatedCards.radioTower) {
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
          // .then(() => {
          //   calculateMoney(this.props.user.name, this.props.game)
          // })
          // .catch(console.error)
      }
    }

    // for when we want to retrigger dice value
    // changing from about to roll to have rolled
    // componentWillReceiveProps(nextProps){
    //   this.setState({game: nextProps.game})
      // let game = nextProps.game

    // }

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
