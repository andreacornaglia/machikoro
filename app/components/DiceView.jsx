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
        show: false,
        showRollAgain: false
      }
      this.rollDice = this.rollDice.bind(this)
      this.checkIfSubwayUnlocked = this.checkIfSubwayUnlocked.bind(this)
      this.checkIfRadioTowerUnlocked = this.checkIfRadioTowerUnlocked.bind(this)
      this.displayChooseDiceNumModal = this.displayChooseDiceNumModal.bind(this)
    }

    rollDice(diceNum){
      let newDiceNum;
      if (diceNum === 1) {
        newDiceNum = Math.floor(Math.random() * (6) + 1);
      }
      if (diceNum === 2){
        newDiceNum = Math.floor(Math.random() * (12) + 1);
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
      //because we still don't have auth, we will harcode a value here
      //come back after doing oauth and refactor this part
      let currentPlayer = 'playerOne'
      if (this.checkIfSubwayUnlocked() === true){
        this.setState({ show: true})
      } else {
        let newDiceVal = this.rollDice(1)
        //use promise to guarantee we use the latest dice value
        updateDiceNum(newDiceVal)
          .then(()=>calculateMoney(currentPlayer, this.props.game))
          .catch(console.error)
      }
    }

    // for when we want to retrigger dice value
    // changing from about to roll to have rolled
    // componentWillReceiveProps(nextProps){
    //   this.setState({game: nextProps.game})
      // let game = nextProps.game

    // }

    render() {
      console.log('state', this.state.show)
      let game = this.props.game
      console.log('props', game)

        return (
            <div className="diceContainer">
              <p>Player Turn: {game.turn}</p>
              <p>Dice Value: {game.diceValue}</p>
              <Button
                bsSize="xsmall"
                bsStyle="success"
                onClick={() => {
                  this.displayChooseDiceNumModal()
                }}
                >Roll Dice!</Button>


                <ChooseDiceNumModal
                  rollDice={this.rollDice}
                  show={this.state.show}
                  close={() => this.setState({ show: false})}
                />
            </div>
        )
    }
}


export default connect(state => {
  return {
    game: state.game
  }
})(DiceView)
