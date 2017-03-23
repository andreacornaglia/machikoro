import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default (props) => {
  console.log('PROPS', props)
  return (
    <Modal
      show={props.show}
      onHide={props.close}
      container={this}
      aria-labelledby="contained-modal-title"
      bsSize="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">{props.element.displayName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p><strong>Function:<br /></strong>{props.element.cardDescription}</p>
          <p><strong>Roll value:</strong> {props.element.rollValue}</p>
          <p><strong>Cost: </strong>{props.element.cost}</p>
          <p><strong>Industry: </strong>{props.element.industry}</p>
          <p><strong>Qty Remaining: </strong></p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="success">Buy</Button>
      </Modal.Footer>
    </Modal>
  )
}
