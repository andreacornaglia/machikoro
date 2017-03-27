import React, { Component } from 'react';
import {cardArray, unlockableArray} from '../cards/cards.js';
import {connect} from 'react-redux'

class Opponent extends Component{
  constructor (){
    super()
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick(){
    const shown = document.getElementById('opp-extension').style.display
    const extension = document.getElementById('opp-extension');
    if (shown === 'none'){
      extension.style.display = 'inline-block';
    } else {
      extension.style.display = 'none';
    }
  }

  render(){
    const player = this.props.game.players[this.props.player];
    let unlockCards = player.activatedCards;
    let cardKeys = Object.keys(unlockCards);
    let turn = this.props.game.turn;
    const playerTurn = this.props.game.players[turn];
    const classNametoDiv = (player.name === playerTurn.name) ? 'highlight' : '';
    //the player.name is not the same as turn
    console.log(player.name, turn)
    return (
      <div id="opponent" className={classNametoDiv} onClick ={this.handleOnClick}>
        <div id="opp-summary">
          <div id="avatar"><img src={this.props.avatar}/></div>
          <div className="opp-details">
            <p className="opp-name">{player.name}</p>
            {player.name === playerTurn.name ? <p className="opp-turn">TURN</p> : null}
            
            <p className="opp-money">$ {player.money}</p>
          </div>
          <div id="unlockables">
            <p>Unlocked cards:</p>
            {cardKeys.map((card, index) => {
              var classFordiv;
              let imgURL;
              if(!unlockCards[card]){
                classFordiv = 'card-opp locked'
              } else {
                classFordiv = 'card-opp'
              }           
              unlockableArray.forEach(element => {
                if(element.refName === card){
                    imgURL = element.imgURL
                  }
              })
              return(<img key={index} src={imgURL} className={classFordiv}/>)
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    game: state.game
  }
})(Opponent)
