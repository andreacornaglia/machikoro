import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

const InstructionModal = (props) => {
  return (
    <Modal {...props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Game Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Objective</h4>
          <p>The player who unlocks all four landmarks first is the winner of the game</p>
          <h4>Game Components</h4>
          <h3>Establishments</h3>
          <p>Establishments are cards that may be purchased during your turn. These cards enable the player who owns them to earn money, depending on the card description. Establishment cards are activated for monetary reward when the dice value signified on the card is rolled</p>
          <h3>Landmarks</h3>
          <p>These cards are pre-supplied to each player, and may be unlocked by the player at their disgression, provided they have enough money to do so. When you unlock a landmark, you also gain access to the benefit described in the card description. Whichever player unlocks all four landmarks first wins the game</p>
          <h3>Money</h3>
          <p>All players are provided 3 units of money at the start of the game. Each player use money to buy establishments and landmarks</p>
          <p>a</p>
          <p>j</p>
          <p>a</p>
          <p>c</p>
          <p>o</p>
          <p>b</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}

export class InstructionButton extends Component {
  constructor(){
    super()
    this.state = {show: false}
  }

  render(){
    let lgClose = () => this.setState({show: false})
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={() => this.setState({ show: true })}>
          Instructions
        </Button>
        <InstructionModal show={this.state.show} onHide={lgClose} />
      </ButtonToolbar>
    )
  }
}

export default InstructionButton
