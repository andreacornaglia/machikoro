import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {updateAfterCardPurchase} from '../firebaseFunctions'
import {createStatus} from '../reducers/statusMsg'

export default class CardModal extends Component{
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
      createStatus(`bought a ${cardType} card`)
      updateAfterCardPurchase(cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply, turnOrder)
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
            disabled={this.props.insufficientFunds}
            bsStyle="success"
            onClick={() => {
              this.handleClick(this.props.element)
              this.props.close()
            }}
          >Buy</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
