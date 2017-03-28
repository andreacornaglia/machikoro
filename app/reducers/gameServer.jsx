import axios from 'axios'

const reducer = (state=null, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case "RECEIVE_OWNER":
      newState.players = action.players
      break;

    default: return state;
    }
  return newState
}

//ACTION CREATORS

export const receivePlayers = (players) => ({
  type: "RECEIVE_PLAYERS", players
})


export default reducer
