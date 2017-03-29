import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux'

class GameStatusModal extends Component {
  constructor(){
    super()
  }
  
  componentDidMount() {
    setTimeout(() => {
        this.props.closeModal()
    }, 3000);
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
          <Modal.Title id="contained-modal-title">Next Player's Turn!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.game.status}</p>
        </Modal.Body>
      </Modal>
    )
  }
}

export default connect(state => {
  return { game: state.game  }
})(GameStatusModal)
