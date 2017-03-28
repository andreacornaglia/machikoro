const Sequelize = require('sequelize')
const db = require('APP/db')

const Game = db.define('games', {
  // this is for creating a game code for unique game
  gameLink: Sequelize.STRING,
  status: Sequelize.ENUM('ongoing', 'completed'),
  winner: {
    type: Sequelize.STRING,
    allowNull: true
  },
  owner: Sequelize.INTEGER
}, {
  hooks: {
    beforeCreate: function(game){
      let code = Math.floor(Math.random() * 1000000);
      game.gameLink = code;
    }
  }
})

module.exports = Game
