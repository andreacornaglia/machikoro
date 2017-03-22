import { connect } from 'react-redux';
import DiceView from '../components/DiceView.jsx'
import {getNewDiceVal} from '../reducers/dice'

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDiceRoll: (diceVal) => dispatch(getNewDiceVal(diceVal))
  }
}

const DiceViewContainer = connect(mapStateToProps, mapDispatchToProps)(DiceView);

export default DiceViewContainer;
