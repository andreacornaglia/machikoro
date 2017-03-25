import React, { Component } from 'react';
import {cardArray, unlockableArray} from '../cards/cards.js';

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
    let unlockCards = this.props.player.activatedCards;
    let cardKeys = Object.keys(unlockCards);
    let playerTurn = this.props.player
    console.log(unlockCards)
    return (
      <div id="opponent" onClick ={this.handleOnClick}>
        <div id="opp-summary">
          <div id="avatar"><img src={this.props.avatar}/></div>
          <div className="opp-details">
            <p className="opp-name">{this.props.player.name}</p>
            <p className="opp-turn"></p>
            <p className="opp-money">$ {this.props.player.money}</p>
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
        <div id="opp-extension">
          //currently hardcoded, should get from db
          {cardArray.map((card, index) => (
            <div key={index} className="opp-cards">
              <img src={card.imgURL}/>
              <p>1</p>
          </div>
          ))}
        </div>
      </div>
    )
  }
}
