import React, { Component } from 'react';
import Slider from 'react-slick'
import {connect} from 'react-redux'

class Carousel extends Component {
  render(){
    const settings = {
       className: 'center',
       adaptiveHeight: true,
       infinite: true,
       slidesToShow: 5,
       slidesToScroll: 1,
       arrows: true,
       useCSS: true,
       cssEase: true,
       speed: 500
     }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="content-container">
            <div className="slide-content" id="wine-shop"></div>
          </div>
          <div className="content-container">
            <div className="slide-content" id="wine-shop"></div>
          </div>
        </Slider>
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
