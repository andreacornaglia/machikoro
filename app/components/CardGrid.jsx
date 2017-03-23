import React, { Component } from 'react';
import {ref} from '../firebase'
import CardModal from './CardModal'
import { Col, Row, Tooltip, Modal, Button } from 'react-bootstrap';
import {cardArray} from '../cards/cards.js';
import {connect} from 'react-redux'
import {updateAfterCardPurchase} from '../firebaseFunctions'
import NotEnoughMoneyAlert from './NotEnoughMoneyAlert'

class CardGrid extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      modalElement: {}
    }
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
      this.setState({show: true})
    }
  }

  getQuantity(element){
    return this.props.game ? this.props.game.cards[element.refName] : null
  }

  render() {

    let close = () => this.setState({show: false})

    return (
     <div> 
    <div className="game-grid">
      <CardModal
        close={() => close()}
        show={this.state.show}
        element={this.state.modalElement}
      />
      {cardArray.map((element, index) => {
        return (
          <Col lg={4} className="col-lg-5ths card-cont modal-container" key={index} 
            onClick={(evt) => {
            console.log('ELEMENT', element)
            evt.preventDefault()
            this.setState({
              show: true,
              modalElement: element
            })
          }}>
            <Tooltip placement="top" className="in card-tooltip" id={index}>
              <p>Click for card details</p>
            </Tooltip>
            {this.state.show ? <CardModal close={close.bind(this)} element={element} /> : null}
            <img src={element.imgURL} className="card" />
          </Col>
        )
      })}
    </div>
        <NotEnoughMoneyAlert
          close={() => close()}
          show={this.state.show}
        />
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
