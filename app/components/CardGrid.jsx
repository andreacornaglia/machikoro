import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export const CardGrid = () => (
  <div className="game-grid">
    {array.forEach(element => {
      console.log(element)
      return (
        <Col lg={2} id='Farm'>
          <img src="./piggy.png" className='card'/>
        </Col>
      )
    })}
  </div>
)

export default CardGrid