import React, { Component } from 'react';
import SelfDashboard from './SelfDashboard';
import CardGrid from './CardGrid';
import Opponent from './Opponent';
import DiceView from '../components/DiceView';
import { Col, Row, Tooltip } from 'react-bootstrap';
import {connect} from 'react-redux'

class GamePage extends Component {
  render() {
    if (this.props.game === null) {
      return <h1>Loading...</h1>
    }
    return (
      <div className="global-board">
        <div className="row row-top">
          <Col lg={4}/>
          <Col lg={4}>
            <Opponent id='oponent-top'/>
          </Col>

          <Col lg={2}/>

          <Col lg={2}>
            <DiceView />
          </Col>
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

export default connect(state => {
  return {
    game: state.game
  }
})(GamePage)
