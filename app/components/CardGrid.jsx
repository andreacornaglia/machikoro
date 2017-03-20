import React, { Component } from 'react';
import { Col, Row, Tooltip } from 'react-bootstrap';
import {cardArray} from '../../db/cards';


export default class CardGrid extends Component {
  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
  }
  
  onClick(evt){
    console.log('onClick on:', evt)
  }
  
  render() {
    return (
    <div className="game-grid">
      {cardArray.map((element, index) => {
        console.log(element)
        return (
          <Col lg={4} className="col-lg-5ths card-cont" key={index} onClick={evt => {evt.preventDefault()
              console.log('this is the element clicked', element)
              }}>
            <Tooltip placement="top" className="in card-tooltip" id={index}>
              <p>Roll value: {element.rollValue}</p>
              <p>Cost: {element.cost}</p>
              <p>Industry: {element.industry}</p>
              <p>{element.cardDescription}</p>
            </Tooltip>
            <img src={element.imgURL} className='card'/>
          </Col>
        )
      })}
    </div>
    )
  }
}