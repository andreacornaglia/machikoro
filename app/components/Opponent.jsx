import React, { Component } from 'react';
import {unlockableArray} from '../cards/cards.js';
import {connect} from 'react-redux'

class Opponent extends Component{
  render(){
    const player = this.props.game.players[this.props.player];
    let unlockCards = player.activatedCards;
    let cardKeys = Object.keys(unlockCards);
    let turn = this.props.game.turn;
    const playerTurn = this.props.game.players[turn];
    const classNametoDiv = (player.name === playerTurn.name) ? 'highlight' : '';
    //the player.name is not the same as turn

    return (
      <div id="opponent" onClick ={this.handleOnClick}>
        <div id="opp-summary" className={classNametoDiv}>
          <div id="avatar"><img src={this.props.avatar} /></div>
          <div className="opp-details">
            <p className="opp-name">{player.name}</p>
            {player.name === playerTurn.name && this.props.game.phase === "roll"? <p className="opp-turn">Rolling...</p> : null}
            {/* Not sure if the code below that shows what the player rolled is working, can't test it until we are able to play with multiple players */}
            {player.name === playerTurn.name && this.props.game.phase === "buy" ? <p className="opp-turn">Rolled: {this.props.game.diceValue}</p> : null}

            <p className="opp-money">$ {player.money}</p>
          </div>
          <div id="unlockables">
            <p>Unlocked cards:</p>
            {cardKeys.map((card, index) => {
              var classFordiv;
              let imgURL;
              if (!unlockCards[card]){
                classFordiv = 'card-opp locked'
              } else {
                classFordiv = 'card-opp'
              }
              unlockableArray.forEach(element => {
                if (element.refName === card){
                  imgURL = element.imgURL
                }
              })
              return (<img key={index} src={imgURL} className={classFordiv} />)
            })}
          </div>
        </div>
      </div>
    )
  }

}

export default connect(state => {
  return {
    game: state.game,
    user: state.auth
  }
})(Opponent)
