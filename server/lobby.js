const db = require('APP/db')
const { Game, User } = require('../db/models')
const api = module.exports = require('express').Router()

api.get('/:gameLink', (req, res, next) => {
    Game.findOne({
      include: [{model: User}],
      where: {
        gameLink: req.params.gameLink
      }
    })
    .then(game => {
      return game.getUsers()
        .then(users => {
          console.log('users', users)
          // users is an array of objects
          // use array.SOME - go through every element that returns true/false
          const UserAlreadyInGame = () => {
            return users.some(user => {
              return user.id === req.user.id
            })
          }
          // check if user is not in game or if total number of players is less than 4. if they're not, add to game
          if (users.length < 4 && !UserAlreadyInGame()) {
            return game.addUser(req.user.id)
              .then(newGame => {
                // CR: Requery for the game
                res.send(game)
              })
              .catch(next)
          } else {
            res.send(game)
          }
        })
        .catch(next)
    })
    .catch(next)
})

api.post('/', (req, res, next) => {
  Game.create({
    status: 'ongoing',
    owner: req.user.id
  })
  // .then(game => {
  //   return game.addUser(req.user.id)
  // })
  .then(updatedGame => {
    console.log(updatedGame)
    res.send(updatedGame)
  })
  // .catch(next)
})

// need to create association for people joining a game that has already been created -- GET request
