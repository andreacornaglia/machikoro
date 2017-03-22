import React, { Component } from 'react';
import {ref} from '../firebase'
import { Col, Row, Tooltip } from 'react-bootstrap';
import {cardArray} from '../../db/cards';
import {connect} from 'react-redux'


class CardGrid extends Component {
  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
    this.getQuantity = this.getQuantity.bind(this)
  }

  onClick(evt){
    //console.log('onClick on:', evt)
  }

  getQuantity(element){
    return this.props.snapshot ? this.props.snapshot.cards[element.refName] : null
  }

  render() {
    return (
    <div className="game-grid">
      {cardArray.map((element, index) => {
        return (
          <Col lg={4} className="col-lg-5ths card-cont" key={index} onClick={evt => {evt.preventDefault()
              console.log('this is the element clicked', element)
              }}>
            <Tooltip placement="top" className="in card-tooltip" id={index}>
              <p><strong>Card: </strong>{element.displayName}</p>
              <p><strong>Function:<br /></strong>{element.cardDescription}</p>
              <p><strong>Roll value:</strong> {element.rollValue}</p>
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
    snapshot: state.game
  }
}

export default connect(mapStateToProps)(CardGrid)
