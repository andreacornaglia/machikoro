import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default ({close, element}) => {
  return (
    <Modal
      // show={this.state.show}
      onHide={close}
      container={this}
      aria-labelledby="contained-modal-title"
      bsSize="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">{element.displayName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p><strong>Function:<br /></strong>{element.cardDescription}</p>
          <p><strong>Roll value:</strong> {element.rollValue}</p>
          <p><strong>Cost: </strong>{element.cost}</p>
          <p><strong>Industry: </strong>{element.industry}</p>
          <p><strong>Qty Remaining: </strong></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="success">Buy</Button>
      </Modal.Footer>
    </Modal>
  )
}
