import React, { Component } from 'react';
import SelfDashboard from './SelfDashboard';
import CardGrid from './CardGrid';
import Opponent from './Opponent';
import ChooseDiceNumModal from './ChooseDiceNumModal';
import GameStatusModal from './GameStatusModal';
import InstructionButton from './Instructions'
import { Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import {calculateMoney} from '../firebaseFunctions';
import WinModal from './WinModal'

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

  // This function checks to see if the phase has just changed from 'roll' to 'buy'. If it has, that means some player has just rolled and every player will call the calculateMoney function with their own userName and the game state to get their own change in money.
  componentWillReceiveProps(nextProps){

    if (this.props.game.phase === 'roll' && nextProps.game.phase === 'buy') {
      calculateMoney(this.props.user.name, nextProps.game);
    }
    if (this.props.game.phase === 'buy' && nextProps.game.phase === 'roll') {
        this.showStatusModal()
     }
  }

  oponentsOrder(){
      let turnOrder = this.props.game.turnOrder;
      const turnArr = Object.keys(turnOrder);
      let oppArr = []
      turnArr.forEach(element => {
        oppArr.push(turnOrder[element])
      })

      let turn = this.props.game.turn
      let players = this.props.game.players
      let user = this.props.user.name
      const playersObj = Object.keys(players)

      let currentPlayer;
      playersObj.forEach(player => {
        if (players[player].name === user) {
          currentPlayer = player
        }
      })

      //loop to find current turn position in array
      const end = oppArr.length + 1
      const idx = oppArr.indexOf(currentPlayer)
      const result = oppArr.slice(idx+1, end).concat(oppArr.slice(0,idx))
      return result
  }

  render() {
    // need to make sure game is also on state
    if (this.props.firebaseRef === null || this.props.game === null) {
      return <h1>Loading...</h1>
    }

    //check who is this computer's player
    const oponent = this.oponentsOrder()

    const players = this.props.game.players
    const numPlayers = Object.keys(players).length

    if (numPlayers === 2){
      return (
        <div className="global-board">
          <div className="row row-top">
            <Col sm={4}/>
            <Col sm={4}>
              <Opponent id='oponent-top' player={oponent[0]} avatar={'/images/avatar2.png'}/>
            </Col>
            <Col sm={4}>
              <InstructionButton />
            </Col>
          </div>
          <div className="row game-page-central">
            <Col sm={2} />
            <Col sm={8}>
              <CardGrid id="center"/>
            </Col>
            <Col sm={2}/>
          </div>
          <div className="row game-part-opponent">
            <SelfDashboard showModal={this.showDiceModal}/>
          </div>
          {this.state.diceModal ? <ChooseDiceNumModal closeModal={this.closeDiceModal} /> : null}

          {this.state.statusModal && !this.props.game.winner ? <GameStatusModal closeModal= {this.closeStatusModal} /> : null}

          {this.props.game.winner ? <WinModal /> : null}

        </div>
      )
    }


    if (numPlayers === 3){
      return (
        <div className="global-board">
          <div className="row row-top">
            <Col sm={4}/>
            <Col sm={4}/>
            <Col sm={4}>
              <InstructionButton />
            </Col>
          </div>
          <div className="row game-page-central">
            <Col sm={2}>
              <Opponent id='oponent-left' player={oponent[1]} avatar={'/images/avatar3.png'}/>
            </Col>
            <Col sm={8}>
              <CardGrid id="center"/>
            </Col>
            <Col sm={2}>
              <Opponent id='oponent-right' player={oponent[0]} avatar={'/images/avatar4.png'}/>
            </Col>
          </div>
          <div className="row game-part-opponent">
            <SelfDashboard showModal={this.showDiceModal}/>
          </div>
          {this.state.diceModal ? <ChooseDiceNumModal closeModal={this.closeDiceModal} /> : null}

          {this.state.statusModal && !this.props.game.winner ? <GameStatusModal closeModal= {this.closeStatusModal} /> : null}

          {this.props.game.winner ? <WinModal /> : null}

        </div>
      )
    }



    if (numPlayers === 4){
      return (
        <div className="global-board">
          <div className="row row-top">
            <Col sm={4}/>
            <Col sm={4}>
              <Opponent id='oponent-top' player={oponent[1]} avatar={'/images/avatar2.png'}/>
            </Col>
            <Col sm={4}>
              <InstructionButton />
            </Col>
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
            <SelfDashboard showModal={this.showDiceModal}/>
          </div>
          {this.state.diceModal ? <ChooseDiceNumModal closeModal={this.closeDiceModal} /> : null}

          {this.state.statusModal && !this.props.game.winner ? <GameStatusModal closeModal= {this.closeStatusModal} /> : null}

          {this.props.game.winner ? <WinModal /> : null}

        </div>
      )
    }



  }
}

export default connect(state => {
  return {
    firebaseRef: state.firebaseRef,
    game: state.game,
    user: state.auth
  }
})(GamePage)
