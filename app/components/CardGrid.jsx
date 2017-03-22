import React, { Component } from 'react';
import {ref} from '../firebase'
import { Col, Row, Tooltip, Alert } from 'react-bootstrap';
import {cardArray} from '../cards/cards.js';
import {connect} from 'react-redux'
import {updateAfterCardPurchase} from '../firebaseFunctions'


class CardGrid extends Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.getQuantity = this.getQuantity.bind(this)
  }

  handleClick(element){
    console.log('onClick on:', element)
    // evt.preventDefault();

    let game = this.props.game
    let currentTurn = game.turn;
    let currentTurnObj = game.players[currentTurn]

    let cardCost = element.cost
    let cardType = element.refName;
    let cardQuantity = game.cards[element.refName];

    let playerMoney = currentTurnObj.money
    let playerCardSupply = currentTurnObj.cards[element.refName]

    if (playerMoney >= cardCost) {
      console.log('gotin', playerMoney)
      console.log('cardtype', cardType)
      playerMoney -= cardCost
      cardQuantity--
      playerCardSupply++
      updateAfterCardPurchase(cardType, cardQuantity, currentTurn, playerMoney, playerCardSupply)
      console.log('playermoneyavail', playerMoney)
      console.log('cardtype', cardType)
    }
    else {
      return (
        <Alert bsStyle="warning">
          <strong>Holy guacamole!</strong> You don't have enough money!
        </Alert>
      )
    }

  }

  getQuantity(element){
    return this.props.game ? this.props.game.cards[element.refName] : null
  }

  render() {
    return (
    <div className="game-grid">
      {cardArray.map((element, index) => {
        return (
          <Col lg={4} className="col-lg-5ths card-cont" key={index} onClick={() => this.handleClick.bind(this, element)()}>
            <Tooltip placement="top" className="in card-tooltip" id={index}>
              <p><strong>Card: </strong>{element.displayName}</p>
              <p><strong>Function:<br /></strong>{element.cardDescription}</p>
              <p><strong>Roll value:</strong> {element.diceValue}</p>
              <p><strong>Cost: </strong>{element.cost}</p>
              <p><strong>Industry: </strong>{element.industry}</p>
              <p><strong>Qty Remaining: </strong>{this.getQuantity(element)}</p>
            </Tooltip>
            <img src={element.imgURL} className="card" />
          </Col>
        )
      })}
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps)(CardGrid)
