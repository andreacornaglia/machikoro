import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux'

class WinModal extends Component {
  render() {
    return (
      <Modal
        show={true}
        container={this}
        aria-labelledby="contained-modal-title"
        bsSize="sm"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title">Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>🎉 🎊  The winner is {this.props.game.winner}! 🎉🎊 </p>
        </Modal.Body>
      </Modal>
    )
  }
}

export default connect(state => {
  return { game: state.game  }
})(WinModal)
