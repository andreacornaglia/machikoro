import React, { Component } from 'react';
import {connect} from 'react-redux'
import {cardArray} from '../cards/cards'

class Carousel extends Component {
  constructor(){
    super();
    this.checkUserCards = this.checkUserCards.bind(this);
  }

  checkUserCards(){
    let game = this.props.game;
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

    let currentUser = game.players[currentPlayer]
    let cards = currentUser.cards;
    let cardKeys = Object.keys(cards);
    let info = []
    //traverse cards object to find which card the user has, and how many
    cardKeys.forEach(card => {
      if (cards[card] > 0){
        //find card information from our cardArray
        var imgURL;
        cardArray.forEach(element => {
          if (element.refName === card){
            imgURL = element.imgURL
          }
        })
        info.push({amount:cards[card], imgURL:imgURL})
      }
    })
    return info;
  }

  render(){
    return (
      <div className="carousel-container">
        <div id="visible-carousel">
          {this.checkUserCards().map((card, index) => {
            return(
              <div key={index}>
                <img className="carousel-img" src={card.imgURL}/>
                <p>x {card.amount}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {game: state.game, user: state.auth}
})(Carousel)
