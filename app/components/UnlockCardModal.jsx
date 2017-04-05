import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {unlockSpecialCard, changeGameStatus} from '../firebaseFunctions'
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

    if (playerMoney >= unlockableCardCost) {
      playerMoney -= unlockableCardCost
      currentTurnObj.activatedCards[cardType] = true

      let unlockedCardsObj = currentTurnObj.activatedCards
      let unlockedCardsArr = Object.keys(unlockedCardsObj)
      let unlockedCount = 0;

      unlockedCardsArr.forEach(card => {
        if (unlockedCardsObj[card] === true){
          unlockedCount++
        }
      })

      unlockSpecialCard(cardType, currentTurn, playerMoney, turnOrder, unlockedCount, currentTurnObj)
      changeGameStatus(`${currentTurnObj.name} unlocked a ${element.displayName} card`)
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
        className="unlockcard-modal-card"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">{element.displayName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p><strong>Cost: </strong>{element.cost}</p>
            <img src={element.imgURL} />
            <p className="modal-card-desc">{element.cardDescription}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={this.props.insufficientFunds}
            bsStyle="info"
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

const mapDispatchToProps = dispatch => {
  return {
    settingStatus: (msg) => dispatch(settingStatus(msg))
  }
}


export default connect(null, mapDispatchToProps)(UnlockCardModal)
