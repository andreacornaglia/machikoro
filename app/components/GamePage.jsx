import React, { Component } from 'react';
import SelfDashboard from './SelfDashboard';
import CardGrid from './CardGrid';
import Opponent from './Opponent';
import { Col, Row, Tooltip } from 'react-bootstrap';

export default class GamePage extends Component {
  render() {
    return (
      <div className="global-board">
        <div className="row row-top">
          <Col lg={4}/>
          <Col lg={4}>
            <Opponent id='oponent-top'/>
          </Col>
          <Col lg={4}/>
        </div>
        <div className="row game-page-central">
          <Col lg={2}>
            <Opponent id='oponent-left'/>
          </Col>
          <Col lg={8}>
            <CardGrid id="center"/>
          </Col>
          <Col lg={2}>
            <Opponent id='oponent-right'/>
          </Col>
        </div>
        <div className="row game-part-opponent">
          <SelfDashboard/>
        </div>
      </div>
    )
  }
}
