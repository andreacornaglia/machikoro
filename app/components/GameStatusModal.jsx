import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux'

class GameStatusModal extends Component {
  constructor(){
    super()
  }

  render() {
    let close = () => this.setState({show: false})
    console.log("STATUS", this.props.status)
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
          <p>Next Player's Turn! The previous player {this.props.status}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.props.closeModal}>Ok</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect(state => {
  return {
    game: state.game,
    status: state.status
  }
})(GameStatusModal)
