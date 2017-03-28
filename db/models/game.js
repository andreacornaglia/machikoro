const Sequelize = require('sequelize')
const db = require('APP/db')

const Game = db.define('games', {
  // this is for creating a game code for unique game
  gameLink: Sequelize.STRING,
  status: Sequelize.ENUM('ongoing', 'completed'),
  winner: Sequelize.STRING,
  owner: Sequelize.INTEGER
}, {
  hooks: {
    beforeCreate: function(game){
      let code = Math.floor(Math.random() * 1000000);
      game.gameLink = code;

      // Game.findOne({
      //   where: {
      //     gameLink: code
      //   }
      // })
      // .then(gameInst => {
      //   if (gameInst === null) game.gameLink = code;
      // })
      // .catch(console.error)

    }
  }
})

module.exports = Game
