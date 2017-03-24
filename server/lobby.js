const db = require('APP/db')
const { Game, User } = require('../db/models')
const api = module.exports = require('express').Router()


api.get('/:id', (req, res, next) => {
  Game.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(game => {
    console.log('gettingGame', game)
    res.send(game)
  })
  .catch(next)
})

api.post('/', (req, res, next) => {
  console.log('am in here')
  return Game.create({
    status: 'ongoing'
  })
  .then(game => {
  console.log('game', game)
    // game.setUsers
    res.send(game)

  })
  .catch(next)
})
