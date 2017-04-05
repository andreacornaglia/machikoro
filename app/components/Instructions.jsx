import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

const InstructionModal = (props) => {
  return (
    <Modal {...props} bsSize="large" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg"><strong>Game Instructions</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Objective</h3>
        <p>The player who unlocks all four landmark cards first is the winner of the game</p>
        <h3>Game Components</h3>
        <h4>Establishments</h4>
        <p>Establishments are cards that may be purchased during your turn. Only one may be purchased per turn. These cards enable the player who owns them to earn money, depending on the card description. Establishment cards are activated for monetary reward when the dice value signified on the card is rolled</p>
        <h4>Landmarks</h4>
        <p>These cards are pre-supplied to each player, and may be unlocked by the player at their disgression, provided they have enough money to do so. When you unlock a landmark, you also gain access to the benefit described in the card description. Whichever player unlocks all four landmarks first wins the game</p>
        <h4>Money</h4>
        <p>All players are provided 3 units of money at the start of the game. Each player uses money to buy establishments and landmarks</p>
        <h3>Game Flow</h3>
        <p>Players take turns. A turn consists of the following three phases: <br />    1. Roll Dice<br />    2. Earn Income<br />    3. Purchase Establishment or Landmark</p>
        <h3>Roll Dice</h3>
        <p>To begin their turn a player rolls the dice. At the start of the game each player will roll a single die. Once a player has built their Subway Station, they may roll one or two dice on their turn. When rolling two dice, the dice are always summed together.</p>
        <h3>Earn Income</h3>
        <p>Players earn income based on the dice roll and the effects of the Establishments that they own that match the dice roll. If a player owns multiple copies of a single Establishment, the effects are multiplied by the number of Establishments of that type owned.</p>
        <h3>Building New Establishments and Completing Landmarks</h3>
        <p>To conclude a player's turn, he or she may pay to construct one single Establishment OR pay to finish construction on a single Landmark by paying the cost shown on the lower left-hand corner of the card.</p>
        <p>Once constructed, an Establishment is taken from the supply and added to the player's play area. When constructing a Landmark, the Landmark card is unlocked an the Landmark's effects are now active. Landmarks may be constructed in any order the player chooses.</p>
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
        <Button id="instructions" bsStyle="warning" onClick={() => this.setState({ show: true })}>
          ?
        </Button>
        <InstructionModal show={this.state.show} onHide={lgClose} />
      </ButtonToolbar>
    )
  }
}

export default InstructionButton
