import React, { Component } from 'react';
import Slider from 'react-slick'
import {connect} from 'react-redux'

class Carousel extends Component {
  render(){
    const settings = {
       className: 'center',
       centerMode: true,
       centerPadding: '20px',
       adaptiveHeight: true,
       infinite: true,
       slidesToShow: 4,
       slidesToScroll: 1,
       arrows: true,
       useCSS: true,
       cssEase: true,
       focusOnSelect: true,
       speed: 500
      //  variableWidth: true
     }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          <div className="content-container">
            <div className="slide-content" id="subwayStation"></div>
            {/*<div className="slide-content"></div>*/}
          </div>
          {/*<div>
            <div className="slide-content"><h1>2</h1></div>
          </div>
          <div>
            <div className="slide-content"><h1>3</h1></div>
          </div>
          <div>
            <div className="slide-content"><h1>4</h1></div>
          </div>*/}
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
