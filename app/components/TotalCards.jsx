import React, { Component } from 'react';
import {connect} from 'react-redux'

const Sum = (props) => {
  return (
    <h1>{props.total}</h1>
  )
}

export default connect(state => {
  if (!state.game) return {total: 0}
  let keys = Object.keys(state.game.cards);
  let total = 0
  keys.forEach(key => {
    total += state.game.cards[key]
  })
  console.log('state', state)
  return {total: total}
})(Sum)
