'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const OAuth = require('./oauth')
const Game = require('./game')

OAuth.belongsTo(User)
User.hasOne(OAuth)


Game.belongsToMany(User, {through: 'GameUser' })
User.belongsToMany(Game, {through: 'GameUser' })

module.exports = {User, Game}
