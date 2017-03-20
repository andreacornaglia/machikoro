import React, { Component } from 'react';
import {unlockableArray} from '../../db/cards';
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
                <h3>Summary</h3>
                <h4>Name</h4>
                <h4>Money</h4>
                <br></br>
                {unlockableArray.map((card, index) => {
                  return (
                    <Col lg={2.5} className="unlockCards card-cont" id={card.name} key={index} onClick={evt => {evt.preventDefault()
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
        )
    }
}
