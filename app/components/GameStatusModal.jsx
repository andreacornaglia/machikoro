import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux'

class GameStatusModal extends Component {
  constructor(){
    super()
  }

  render() {
    let close = () => this.setState({show: false})
    let game = this.props.game;
    let turn = game.turn;
    let turnUser = game.players[turn].name;
    
    console.log("STATUS", this.props.status)
    console.log('in game status, game is:',this.props.game)
    return (
      <Modal
        show={true}
        onHide={close}
        container={this}
        aria-labelledby="contained-modal-title"
        bsSize="sm"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Next Player's Turn!<br /><br />{this.props.game.status}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.props.closeModal}>Ok</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(state => {
  return { game: state.game  }
})(GameStatusModal)
