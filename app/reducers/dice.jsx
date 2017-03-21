import {ref} from '../firebase'

const reducer = (state=null, action) => {
  switch(action.type) {

  case 'ROLL_DICE':
    return action.dice
  }

  return state
}

const ROLL_DICE = 'ROLL_DICE'

export const rollingDice = dice => ({
  type: ROLL_DICE, dice
})


export const getNewDiceVal = (diceVal) => {
  return dispatch => {
    ref.on('value', snap => {
      let newDice = ref.update({
        diceValue: diceVal
      })
      dispatch(rollingDice(newDice))
    })
  }
}

export default reducer
