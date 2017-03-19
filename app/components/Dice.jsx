import React, { Component } from 'react'
import yesno from 'yesno' //yesno reference: https://github.com/tcql/node-yesno
import {ref} from '../firebase'

export const Dice = (props) => {
    // let currentTurn = ref.turn
    // let currentTurnObj = ref.players[currentTurn] //might cause an issue because currentTurn is a string?
    //let reply =

    return (
      <div>
        {yesno.ask("Your Subway Station is unlocked! Would you like to roll 2 dice?", true, ok => {
          if (ok) {console.log("you're using 1 die")}
          else {console.log("You're using 2 dice")}
        }, ['I want to roll 1 die'], ['I want to roll 2 dice'])}}
      </div>
    )
}

// export default connect(state => {
//   let currentTurn = ref.turn
//   let currentTurnObj = ref.players[currentTurn]
// })(Dice)

//{if (currentTurnObj.activatedCards.subwayStation){}}
