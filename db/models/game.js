const Sequelize = require('sequelize')
const db = require('APP/db')

const Game = db.define('games', {
  // this is for creating a game code for unique game
  gameLink: Sequelize.STRING,
  status: Sequelize.ENUM('ongoing', 'completed'),
  winner: Sequelize.STRING
})

module.exports = Game
