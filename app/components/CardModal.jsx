import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {updateAfterCardPurchase, changeGameStatus} from '../firebaseFunctions'
import {connect} from 'react-redux'
import {settingStatus} from '../reducers/statusMsg'

class CardModal extends Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(element){
    let game = this.props.game
    let currentTurn = game.turn;
    let currentTurnObj = game.players[currentTurn]
    let turnOrder = game.turnOrder;
    let cardCost = element.cost;
    let cardType = element.refName;
    let cardQuantity = game.cards[element.refName];
    let playerMoney = currentTurnObj.money
    let playerCardSupply = currentTurnObj.cards[element.refName]

    playerMoney -= cardCost
    cardQuantity--
    playerCardSupply++
    updateAfterCardPurchase(cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply, turnOrder)
    changeGameStatus(`${currentTurnObj.name} bought a ${element.displayName} card`)
  }

  render() {
    const element = this.props.element

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
        container={this}
        aria-labelledby="contained-modal-title"
        bsSize="sm"
        className="modal-on-card"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">{element.displayName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-card-div">
            <p><strong>Roll value:</strong> {element.diceValue} <span>&nbsp;&nbsp;</span><strong>Cost: </strong>{element.cost}</p>
            <img className="modal-card-img" src={element.imgURL}/>
            <p className="modal-card-desc">{element.cardDescription}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={this.props.insufficientFunds}
            className="modal-card-btn"
            bsStyle="info"
            onClick={() => {
              this.props.close()
              this.handleClick(this.props.element)
            }}
          >Buy ({this.props.quantity} left)</Button>
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


export default connect(null, mapDispatchToProps)(CardModal)
