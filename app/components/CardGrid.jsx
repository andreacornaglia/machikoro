import React, { Component } from 'react';
import CardModal from './CardModal'
import { Col } from 'react-bootstrap';
import {cardArray} from '../cards/cards.js';
import {connect} from 'react-redux'

class CardGrid extends Component {
  constructor(){
    super()
    this.state = {
      showCardInfo: false,
      modalElement: {},
      insufficientFunds: true
    }
    this.disableButton = this.disableButton.bind(this)
  }

  disableButton(element){
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

    if (turn !== currentPlayer){
      this.setState({insufficientFunds: true})
    } else {
        //they are on buy phase
        if (this.props.game.phase !== 'buy'){
          this.setState({insufficientFunds: true})
        } else {
            //they have enough money - if so, all conditions are met
            //and user can buy card
            const turn = this.props.game.turn
            const turnPlayer = this.props.game.players[turn]
            const turnPlayerMoney = turnPlayer.money
            const cardQuantity = this.props.game.cards[element.refName]
            if (turnPlayerMoney < element.cost || cardQuantity === 0){
              this.setState({insufficientFunds: true})
            } else {
               this.setState({insufficientFunds: false})
            }
          }
      }
  }

  render() {
    let close = () => this.setState({showCardInfo: false})
    return (
      <div className="game-grid">
        <CardModal
          game={this.props.game}
          close={() => close()}
          show={this.state.showCardInfo}
          insufficientFunds={this.state.insufficientFunds}
          element={this.state.modalElement}
          quantity={this.props.game.cards[this.state.modalElement.refName]}
          showStatus={this.props.showStatus}
        />
        {cardArray.map((element, index) => {
          return (
            <Col sm={4} className="col-lg-5ths card-cont modal-container" key={index}
              onClick={(evt) => {
              evt.preventDefault()
              this.setState({
                showCardInfo: true,
                modalElement: element
              })
              this.disableButton(element)
            }}>
              {this.state.showCardInfo ? <CardModal close={close.bind(this)} element={element} /> : null}
              <div className="card">
                <img src={element.hoverURL} className="card-overlay"/>
                <img src={element.imgURL} className="card-image" />
              </div>
            </Col>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: state.game,
    user: state.auth
  }
}

export default connect(mapStateToProps)(CardGrid)
