const reducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_GAME':
      return action.game
  }
  return state
}

const SET_GAME = 'SET_GAME'

export const settingGame = game => {
  return { type: SET_GAME, game };
}

export default reducer
