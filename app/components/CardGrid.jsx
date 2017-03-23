import React, { Component } from 'react';
import {ref} from '../firebase'
import { Col, Row, Tooltip, Modal, Button } from 'react-bootstrap';
import {cardArray} from '../../db/cards';
import CardModal from './CardModal'


export default class CardGrid extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      modalElement: {}
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(evt){
    //console.log('onClick on:', evt)
  }

  render() {
    let close = () => this.setState({show: false})
    let quantityRemaining
    return (
    <div className="game-grid">
      <CardModal
        close={() => close()}
        show={this.state.show}
        element={this.state.modalElement}
      />
      {cardArray.map((element, index) => {
          ref.on('value', snap => {
            quantityRemaining = snap.val().cards[element.refName]
          })
        return (
          <Col lg={4} className="col-lg-5ths card-cont modal-container" key={index} onClick={(evt) => {
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
    )
  }
}
