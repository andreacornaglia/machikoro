import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {updateAfterCardPurchase} from '../firebaseFunctions'

export default class CardModal extends Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(element){
    let game = this.props.game
    let currentTurn = game.turn;
    let currentTurnObj = game.players[currentTurn]

    let cardCost = element.cost
    let cardType = element.refName;
    let cardQuantity = game.cards[element.refName];

    let playerMoney = currentTurnObj.money
    let playerCardSupply = currentTurnObj.cards[element.refName]

      playerMoney -= cardCost
      cardQuantity--
      playerCardSupply++
      updateAfterCardPurchase(cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply)
      document.getElementById('buy-button').disabled = true
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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">{element.displayName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p><strong>Function:<br /></strong>{element.cardDescription}</p>
            <p><strong>Roll value:</strong> {element.diceValue}</p>
            <p><strong>Cost: </strong>{element.cost}</p>
            <p><strong>Industry: </strong>{element.industry}</p>
            <p><strong>Qty Remaining: </strong>{this.props.quantity}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="buy-button"
            disabled={this.props.insufficientFunds}
            bsStyle="success"
            onClick={() => this.handleClick(this.props.element)}
          >Buy</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
