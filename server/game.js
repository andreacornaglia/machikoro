const db = require('APP/db')
const {Game, User} = require('../db/models')
const api = module.exports = require('express').Router()

// retrieving a particular game
api.get('/:gameLink', (req, res, next) => {
  console.log('arewe in here')
  Game.findOne({
    where: {
      gameLink: req.params.gameLink
    }
  })
    .then(game => res.send(game))
    .catch(next)
})
