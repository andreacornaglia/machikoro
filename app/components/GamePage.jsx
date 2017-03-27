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
    diceModal: false
  }
  this.showModal = this.showModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.oponentsOrder = this.oponentsOrder.bind(this);
  }

  showModal(){
    this.setState({diceModal: true});
  }
  closeModal(){
    this.setState({diceModal: false});
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
            <CardGrid id="center"/>
          </Col>
          <Col sm={2}>
            <Opponent id='oponent-right' player={oponent[0]} avatar={'/images/avatar4.png'}/>
          </Col>
        </div>
        <div className="row game-part-opponent">
          <SelfDashboard showModal={this.showModal}/>
        </div>
        {this.state.diceModal ? <ChooseDiceNumModal closeModal={this.closeModal} /> : null}
      </div>
    )
  }
}

export default connect(state => {
  return {
    game: state.game
    //find user here via oauth
  }
})(GamePage)
