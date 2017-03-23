import React, { Component } from 'react';
import {connect} from 'react-redux'
//import Slider from 'react-slick'
import {cardArray} from '../cards/cards'

class Carousel extends Component {
  constructor(){
    super();
    this.checkUserCards = this.checkUserCards.bind(this);
  }
  
  checkUserCards(){
    let game = this.props.game
    //check with oauth username, here harcoded, come and fix later
    let currentUser = game.players['playerOne']
    let cards = currentUser.cards
    let cardKeys = Object.keys(cards);
    let info = []
    //traverse cards object to find which card the user has, and how many
    cardKeys.forEach(card => {
      if(cards[card] > 0){
        //find card position in cardArray
        var imgURL;
        cardArray.forEach(element => {
          if(element.refName === card){
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
        {this.checkUserCards().map((card, index) => {
          return(
            <div key={index}>
              <img className="carousel-img" src={card.imgURL}/>
              <p>{card.amount}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(state => {
  return {game: state.game}
})(Carousel)
