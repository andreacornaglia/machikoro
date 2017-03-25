import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux'

class GameStatusModal extends Component {
  constructor(){
    super()
  }

  render() {
    let close = () => this.setState({show: false})
    return (
      <Modal
        show={this.props.show}
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
          <Button onClick={close}>Ok</Button>
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
})(ChooseDiceNumModal)
