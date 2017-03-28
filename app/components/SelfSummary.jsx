import React, { Component } from 'react';
import {unlockableArray} from '../cards/cards.js';
import { Tooltip, Col, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import UnlockCardModal from './UnlockCardModal';
import DiceView from '../components/DiceView';
import {changeTurn} from '../firebaseFunctions'
import {settingStatus} from '../reducers/statusMsg'

class SelfSummary extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      modalElement: {},
      insufficientFunds: true,
      diceModal: false,
    }
    this.disableButton = this.disableButton.bind(this);
  }

  disableButton(element){
    if (this.props.game.players[this.props.game.turn].money < element.cost) {
      this.setState({insufficientFunds: true})
    } else {
      this.setState({insufficientFunds: false})
    }
  }

  render() {
        let close = () => this.setState({show: false})
        let game = this.props.game;
        //for now hardcoded, but eventually change it to work with whoAmI
        let currentUser = game.players['playerOne']
        let playerMoney = currentUser.money
        let playerUnlocked = currentUser.activatedCards
        let cardKeys = Object.keys(playerUnlocked);
        return (
            <div className="summaryContainer">
              <div className="row">
                <img src='/images/avatar1.png'/>
                <h3>{currentUser.name}
                  <span>${playerMoney}</span>
                  {(this.props.game.turn === 'playerOne' && this.props.game.phase !== 'roll') ? <span>You rolled: {this.props.game.diceValue}
                    <Button
                        id="end-turn-btn"
                        bsSize="xsmall"
                        bsStyle="warning"
                        onClick={() => {
                          changeTurn(this.props.game.turn, this.props.game.turnOrder)
                          this.props.settingStatus(`decided to take no action during their turn`)
                          this.props.showStatus()
                        }}
                    >End Turn</Button></span>  : null}
                  {(this.props.game.turn === 'playerOne' && this.props.game.phase === 'roll') ? <DiceView showModal={this.props.showModal}/> : null }
                </h3>
              </div>
              <div className="unlockableSelf">
                <UnlockCardModal
                  game={this.props.game}
                  close={() => close()}
                  show={this.state.show}
                  insufficientFunds={this.state.insufficientFunds}
                  element={this.state.modalElement}
                  showStatus={this.props.showStatus}
                />
                {cardKeys.map((card, index) => {
                  //get if the card is active or not, and change css property accordingly to show if active or not
                  var classFordiv;
                  if(!playerUnlocked[card]){
                    classFordiv = 'card locked'
                  } else {
                    classFordiv = 'card'
                  }
                  var element;
                  //need to find card name in unlockable array to grab information and put it into an element
                  unlockableArray.forEach(thing => {
                    if(thing.refName === card){
                      element = thing;
                    }
                })
                return (
                  <div className="unlockCards card-cont modal-container" key={index}
                    onClick={(evt) => {
                      console.log('ELEMENT', element)
                      evt.preventDefault()
                      this.setState({
                        show: true,
                        modalElement: element
                      })
                      this.disableButton(element)
                    }}>
                    {this.state.show ? <UnlockCardModal close={close.bind(this)} element={element} /> : null}
                    <img src={element.imgURL} className={classFordiv} />
                  </div>
                )
              })}
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    settingStatus: (msg) => dispatch(settingStatus(msg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfSummary)
