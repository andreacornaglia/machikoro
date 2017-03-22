import React, { Component } from 'react';
import {unlockableArray} from '../cards/cards.js';
import { Tooltip, Col } from 'react-bootstrap';

export default class SelfSummary extends Component {
  constructor(){
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick(evt){
    console.log('onUnlockableCardClick on:', evt)
  }

    render() {
        return (
            <div className="summaryContainer">
              <div className="row">
                <img src='./piggy.png'/>
                <h3>Andrea <span>$10</span></h3>
              </div>
              <div className="unlockableSelf">
              {unlockableArray.map((card, index) => {
                return (
                  <Col lg={2.5} className="unlockCards card-cont" id={card.refName} key={index} onClick={evt => {evt.preventDefault()
                      console.log('this is the element clicked', card)
                      }}>
                      <Tooltip placement="top" className="in card-tooltip" id={index}>
                        <p>Cost: {card.cost}</p>
                        <p>{card.cardDescription}</p>
                      </Tooltip>
                  </Col>
                )
              })}

            </div>
          </div>
        )
    }
}
