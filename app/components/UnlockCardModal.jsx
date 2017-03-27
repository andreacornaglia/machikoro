import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {unlockSpecialCard} from '../firebaseFunctions'
import {connect} from 'react-redux'
import {settingStatus} from '../reducers/statusMsg'

class UnlockCardModal extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(element){

    let game = this.props.game
    let currentTurn = game.turn;
    let currentTurnObj = game.players[currentTurn]
    let turnOrder = game.turnOrder;
    let unlockableCardCost = element.cost
    let cardType = element.refName;

    let playerMoney = currentTurnObj.money

    console.log('onUnlockableCardClick on:', element)

    if (playerMoney >= unlockableCardCost) {
      console.log('gotin', playerMoney)
      console.log('cardtype', cardType)
      playerMoney -= unlockableCardCost
      currentTurnObj.activatedCards[cardType] = true
      unlockSpecialCard(cardType, currentTurn, playerMoney, turnOrder)
      this.props.settingStatus(`unlocked a ${element.displayName} card`)
      this.props.showStatus()

    }
  }

  render(){
    const element = this.props.element
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
        container={this}
        aria-labelledby="contained-modal-title"
        bsSize="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">{element.displayName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p><strong>Function:<br /></strong>{element.cardDescription}</p>
            <p><strong>Cost: </strong>{element.cost}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={this.props.insufficientFunds}
            bsStyle="success"
            onClick={() => {
              this.props.close()
              this.handleClick(this.props.element)
            }}
            >Unlock</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    settingStatus: (msg) => dispatch(settingStatus(msg))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UnlockCardModal)
