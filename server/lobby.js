const db = require('APP/db')
const { Game, User } = require('../db/models')
const api = module.exports = require('express').Router()

api.get('/:gameLink', (req, res, next) => {
  // console.log('user', req.user)
  // if (req.user === ""){
  //  res.redirect('/lobby')
  // }
  // else {
    Game.findOne({
      where: {
        gameLink: req.params.gameLink
      }
    })
    .then(game => {
      return game.getUsers()
        .then(users => {
          // users is an array of objects
          // use array.SOME - go through every element that returns true/false
          const UserAlreadyInGame = () => {
            return users.some(user => {
              return user.id === req.user.id
            })
          }
          console.log('useringame', UserAlreadyInGame())
          // check if user is not in game or if total number of players is less than 4. if they're not, add to game
          if (users.length < 4 && !UserAlreadyInGame()) {
            game.addUser(req.user.id)
              .then(game => {
                res.send(game)
              })
          } else {
            res.send(game)
          }
        })
    })
    .catch(next)
  // }

})

api.get('/owner/:gameLink', (req, res, next) => {
    Game.findOne({
      where: {
        gameLink: req.params.gameLink
      }
    })
    .then(game => {
      let owner = game.owner
      return User.findOne({
        where: {
          name: owner
        }
      })
    })
    .then(user => {
      res.send(user)
    })
    .catch(next)

})

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
