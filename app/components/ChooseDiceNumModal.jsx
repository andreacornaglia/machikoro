import React, { Component } from 'react';
import { Col, Row, Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux'
import {updateDiceNum} from '../firebaseFunctions'

class ChooseDiceNumModal extends Component {

  render() {
    console.log('diceprops', this.props)
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Would you like to roll one die or two dice?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={() => {
                this.props.close()
                let diceVal = this.props.rollDice(1)
                updateDiceNum(diceVal)
              }}>1</Button>
              <Button onClick={() => {
                  this.props.close()
                  let diceVal = this.props.rollDice(2)
                  updateDiceNum(diceVal)
                }}>2</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}

export default connect(state => {
  return {
    game: state.game
  }
})(ChooseDiceNumModal)
