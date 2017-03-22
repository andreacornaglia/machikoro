import React, { Component } from 'react';
import {cardArray} from '../cards/cards.js';

export default class Opponent extends Component{
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
    const player = {
      name: 'Player 1',
      money: 10,
      unlocked: cardArray.slice(0, 4)
    }
    return (
      <div id="opponent" onClick = {this.handleOnClick}>
        <div id="opp-summary">
          <div id="avatar"></div>
          <div className="opp-details">
            <p>{player.name}</p>
            <p>{player.money} coins</p>
          </div>
          <div id="unlockables">
            <p>Unlocked cards: </p>
            {player.unlocked.map((card, index) => <img key={index} src={card.imgURL} />)}
          </div>
        </div>
        <div id="opp-extension">
          {cardArray.map((card, index) => (
            <div key={index} className="opp-cards">
              <img src={card.imgURL} />
              <p>1</p>
          </div>
          ))}
        </div>
      </div>
    )
  }
}
