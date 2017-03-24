const db = require('APP/db')
const { Game, User } = require('../db/models')
const api = module.exports = require('express').Router()

// do we need to create routes via /game path instead of /lobby?
// GET request?

// retrieving a particular game - does this belong here?
api.get('/:gameLink', (req, res, next) => {
  Game.findOne({
    where: {
      gameLink: req.params.gameLink
    }
  })
  .then(game => {
    console.log('gettingGame', game)
    res.send(game)
  })
  .catch(next)
})
