const db = require('APP/db')
const { Game, User } = require('../db/models')
const api = module.exports = require('express').Router()

api.post('/', (req, res, next) => {
  console.log('am in here')
  Game.create({
    status: 'ongoing'
  })
  .then(game => {
    console.log('game', game)
    res.send(game)
  })
  .catch(next)
})
