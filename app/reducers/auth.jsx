import axios from 'axios'
import { browserHistory } from 'react-router';

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const signup = (name, email, password) =>
  dispatch =>
    axios.post('/api/auth/signup/local',
      {name, email, password})
      .then(() => dispatch(whoami()))
      .then((user) => browserHistory.push('/lobby'))
      .catch(() => dispatch(whoami()))

// add third parameter gameLink to check if we are redirecting user after they get a gameLink from another player
export const login = (username, password, gameLink) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .then(() => {
        if (gameLink) {
          browserHistory.push(`/lobby/${gameLink}`)
        } else {
          browserHistory.push('/lobby')
        }
      })
      .catch(() => dispatch(whoami()))


export const guestLogin = () =>
  dispatch =>
    axios.get('/api/auth/guestLogin')
      .then(() => dispatch(whoami()))
      .then(() => browserHistory.push('/lobby'))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .then(() => browserHistory.push('/'))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => {
        dispatch(authenticated(null))
        browserHistory.push('/')
      })

export default reducer
