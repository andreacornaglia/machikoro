import React, { Component } from 'react';
import CenterMode from 'react-slick'
import {connect} from 'react-redux'

class Carousel extends Component {
  render(){
    var settings = {
       className: 'center',
       centerMode: true,
       centerPadding: '60px',
       infinite: true,
       slidesToShow: 2,
       slidesToScroll: 1,
       swipeToSlide: true,
       arrows: true,
       useCSS: true,
       focusOnSelect: true
     }
    return (
      <div className="container">
        <CenterMode {...settings}>
          <div><h1>1</h1></div>
          <div><h1>2</h1></div>
          <div><h1>3</h1></div>
          <div><h1>4</h1></div>
        </CenterMode>
      </div>
    )
  }
}

export default connect(state => {
  if (!state.game) return {total: 0}
  let keys = Object.keys(state.game.cards);
  let total = 0
  keys.forEach(key => {
    total += state.game.cards[key]
  })
  return {total: total}
})(Carousel)
