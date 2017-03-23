import React, { Component } from 'react';
import {unlockableArray} from '../cards/cards.js';
import { Tooltip, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import UnlockCardModal from './UnlockCardModal'

class SelfSummary extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      modalElement: {},
      insufficientFunds: true
    }
    this.disableButton = this.disableButton.bind(this)

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

        let game = this.props.game
        let currentTurn = game.turn;
        let currentTurnObj = game.players[currentTurn]
        let playerMoney = currentTurnObj.money


        return (
            <div className="summaryContainer">
              <div className="row">
                <img src='./piggy.png'/>
                <h3>Andrea <span>${playerMoney}</span></h3>
              </div>
              <div className="unlockableSelf">

                <UnlockCardModal
                  game={this.props.game}
                  close={() => close()}
                  show={this.state.show}
                  insufficientFunds={this.state.insufficientFunds}
                  element={this.state.modalElement}
                />
              {unlockableArray.map((element, index) => {
                return (
                  <Col lg={2.5} className="unlockCards card-cont modal-container" key={index}
                    onClick={(evt) => {
                    console.log('ELEMENT', element)
                    evt.preventDefault()
                    this.setState({
                      show: true,
                      modalElement: element
                    })
                    this.disableButton(element)
                  }}>
                    <Tooltip placement="top" className="in card-tooltip" id={index}>
                      <p>Card details</p>
                    </Tooltip>
                    {this.state.show ? <UnlockCardModal close={close.bind(this)} element={element} /> : null}
                    <img src={element.imgURL} className="card" />
                  </Col>
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

export default connect(mapStateToProps)(SelfSummary)
