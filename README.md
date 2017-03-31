# Introduction
Nyuyoku is a realtime multiplayer game based on a Japanese board-game called Machi Koro. We decided to re-theme it and actually create the artwork to represent some iconic NYC places, like bodegas and comedy clubs. Each turn, a player can buy one of these establishments to create their own city and gain coins, which depend on the dice value and their functionality.

## Deployed version
You can find our deployed game at: https://nyuyoku.herokuapp.com/

![nyuyoku screenshot](https://github.com/andreacornaglia/machikoro/blob/master/public/images/screenshot.png)


## How
This project was developed by Anne Zhou, Andrea Cornaglia, Raina Jacobskind & Susan Flanagan as part of our capstone project at Grace Hopper program at Fullstack Academy. We develop the app in a week and a half (March 2017)

## Technologies

We use the NERD stack(Node, Express, React, Sequelize, Redux) & Google Firebase, plus Sass, HTML and Javascript.

## Game State
One of the biggest technical challenge we faced was building out the lobby system with the flow of data from our backend to our real-time database. We needed to think about how players join the same game and what information needed to be available when you create a game versus when you actually start a game. 

To solve this, we used Redux to store games from our database as well as the entire game state from Firebase for each individual game. By doing so, not only can we access information about the game status and the players from the server but also information about the same game that’s constantly updating in Firebase such as the dice value--  all in the Redux store.

## Game Logic
The biggest challenge concerning the game logic was calculating changes in money. Each establishment card a player can buy executes an action when a particular dice value is rolled. Depending on the roll and each player’s individual circumstances, such as the type and amount of cards they own, how much money they have, and whether or not it is their turn, each player may gain, lose, or receive no change in their money. These differing outputs complicated the logic when dealing with a real-time, multiplayer game.
