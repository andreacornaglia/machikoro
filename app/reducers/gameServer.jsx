import axios from 'axios'

const reducer = (state=null, action) => {

  switch (action.type) {
    case "RECEIVE_DBGAME":
      return action.game
    }
  return state
}

//ACTION CREATORS

export const receivingDBGame = (game) => ({
  type: "RECEIVE_DBGAME", game
})

export const getDBGame = (gameLink) => {
  return dispatch => {
    axios.get(`/api/lobby/${gameLink}`)
    .then(res => res.data)
    .then(game => {
      dispatch(receivingDBGame(game))
    })
    .catch(console.error)
  }
}


export default reducer
