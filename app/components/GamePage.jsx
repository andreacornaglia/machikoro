import React, { Component } from 'react';
import SelfDashboard from './SelfDashboard';
import CardGrid from './CardGrid';
import Opponent from './Opponent';
import DiceView from '../components/DiceView';
import ChooseDiceNumModal from './ChooseDiceNumModal';
import { Col, Row, Tooltip } from 'react-bootstrap';
import {connect} from 'react-redux'

class GamePage extends Component {

constructor(){
  super()
  this.state = {
    diceModal: false,
  }
  this.showModal = this.showModal.bind(this)
  this.closeModal = this.closeModal.bind(this)
}

showModal(){
  this.setState({diceModal: true})
}
closeModal(){
  this.setState({diceModal: false});
}

  render() {
    if (this.props.game === null) {
      return <h1>Loading...</h1>
    }
    const player2 = this.props.game.players.playerTwo
    const player3 = this.props.game.players.playerThree
    const player4 = this.props.game.players.playerFour
    return (
      <div className="global-board">
        <div className="row row-top">
          <Col sm={4}/>
          <Col sm={4}>
            <Opponent id='oponent-top' player={player2}/>
          </Col>

          <Col sm={2}/>

          <Col sm={2}>
            <DiceView
              showModal={this.showModal}
            />
          </Col>
        </div>
        <div className="row game-page-central">
          <Col sm={2}>
            <Opponent id='oponent-left' player={player3}/>
          </Col>
          <Col sm={8}>
            <CardGrid id="center"/>
          </Col>
          <Col sm={2}>
            <Opponent id='oponent-right' player={player4}/>
          </Col>
        </div>
        <div className="row game-part-opponent">
          <SelfDashboard/>
        </div>
        {this.state.diceModal ? <ChooseDiceNumModal closeModal={this.closeModal} /> : null}
      </div>
    )
  }
}

export default connect(state => {
  return {
    game: state.game
  }
})(GamePage)
