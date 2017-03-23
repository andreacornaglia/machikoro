import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {connect} from 'react-redux'

class NotEnoughMoneyAlert extends Component {

  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title"> <strong>Holy Guacamole! </strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You don't have enough money!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>Okay</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(state => {
  return {
    game: state.game
  }
})(NotEnoughMoneyAlert)
