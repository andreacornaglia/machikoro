import React, { Component } from 'react'
import {Button} from 'react-bootstrap'

export default class DiceView extends Component {
    constructor(props){
      super(props)

    }

    render() {
        return (
            <div className="diceContainer">
              <p>Player Turn: {} </p>
              <p>Dice Value: {}</p>
              <Button bsSize="xsmall" bsStyle="success">I'm Ready</Button>
            </div>
        )
    }
}
