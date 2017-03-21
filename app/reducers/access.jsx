import {ref} from '../firebase'

const ACCESS_DATA = 'ACCESS_DATA'

const reducer = (state=null, action) => {
  switch (action.type) {
  case ACCESS_DATA:
    return action.snapshot
  }
  return state
}

export const accessData = snapshot => ({
  type: ACCESS_DATA, snapshot
})

export const fetchData = () => {
  return (dispatch) => {
    ref.on('value', (snap) => {
      dispatch(accessData(snap.val()))
    })
  }
}

export default reducer
