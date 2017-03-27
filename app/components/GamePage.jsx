import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import SelfDashboard from './SelfDashboard';
import CardGrid from './CardGrid';
import Opponent from './Opponent';
import DiceView from '../components/DiceView';
import ChooseDiceNumModal from './ChooseDiceNumModal';
import GameStatusModal from './GameStatusModal';
import { Col, Row, Tooltip } from 'react-bootstrap';
import {connect} from 'react-redux'

class GamePage extends Component {

constructor(){
  super()
  this.state = {
    diceModal: false,
    statusModal: false
  }
  this.showDiceModal = this.showDiceModal.bind(this);
  this.closeDiceModal = this.closeDiceModal.bind(this);
  this.showStatusModal = this.showStatusModal.bind(this);
  this.closeStatusModal = this.closeStatusModal.bind(this);
  this.oponentsOrder = this.oponentsOrder.bind(this);
  }

  showDiceModal(){
    this.setState({diceModal: true});
  }
  closeDiceModal(){
    this.setState({diceModal: false});
  }
  showStatusModal(){
    this.setState({statusModal: true});
  }
  closeStatusModal(){
    this.setState({statusModal: false});
  }

  oponentsOrder(){
    const turnOrder = this.props.game.turnOrder;
    const turnArr = Object.keys(turnOrder);
    let oppArr = []
    turnArr.forEach(element => {
      oppArr.push(turnOrder[element])
    })
    console.log(oppArr)
    //when firebase is updated, change 'playerOne' for user.name
    const currentPlayer = 'playerOne';
    //loop to find current turn position in array
    const end = oppArr.length + 1
    const idx = oppArr.indexOf(currentPlayer)
    const result = oppArr.slice(idx+1, end).concat(oppArr.slice(0,idx))

    console.log('oponents is:',result)
    return result
  }

  render() {
    if (this.props.game === null) {
      return <h1>Loading...</h1>
    }
    if (!this.props.user){
      browserHistory.push('/home')
    }
    //check who is this computer's player
    const oponent = this.oponentsOrder()
    //check on the pla
    return (
      <div className="global-board">
        <div className="row row-top">
          <Col sm={4}/>
          <Col sm={4}>
            <Opponent id='oponent-top' player={oponent[1]} avatar={'/images/avatar2.png'}/>
          </Col>
          <Col sm={4}/>
        </div>
        <div className="row game-page-central">
          <Col sm={2}>
            <Opponent id='oponent-left' player={oponent[2]} avatar={'/images/avatar3.png'}/>
          </Col>
          <Col sm={8}>
            <CardGrid id="center" showStatus={this.showStatusModal} />
          </Col>
          <Col sm={2}>
            <Opponent id='oponent-right' player={oponent[0]} avatar={'/images/avatar4.png'}/>
          </Col>
        </div>
        <div className="row game-part-opponent">
          <SelfDashboard showStatus={this.showStatusModal} showModal={this.showDiceModal}/>
        </div>
        {this.state.diceModal ? <ChooseDiceNumModal closeModal={this.closeDiceModal} /> : null}
        {this.state.statusModal ? <GameStatusModal closeModal= {this.closeStatusModal} /> : null}
      </div>
    )
  }
}

export default connect(state => {
  return {
    game: state.game,
    user: state.auth
    //find user here via oauth
  }
})(GamePage)
