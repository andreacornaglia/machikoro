import {ref} from './firebase'

const updateDiceNum = (num) => {
  ref.update({
    diceValue: num,
    phase: "buy"
  })
}

const disableButton = () => {

}

export {updateDiceNum}
