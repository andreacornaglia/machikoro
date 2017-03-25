const db = require('APP/db')
const { Game, User } = require('../db/models')
const api = module.exports = require('express').Router()

api.post('/', (req, res, next) => {
  return Game.create({
    status: 'ongoing',
    owner: req.user.name
  })
  .then(game => {
    // creating user association for person creating the game in join table
    // game.setUsers(req.user.id)
    res.send(game)
  })
  .catch(next)
})

// need to create association for people joining a game that has already been created -- GET request
