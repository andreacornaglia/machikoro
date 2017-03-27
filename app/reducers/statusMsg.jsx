

const reducer = (state=null, action) => {

  switch (action.type) {

    case 'SET_STATUS':
      return action.msg
  }
  return state
}

const SET_STATUS = 'SET_STATUS'

export const settingStatus = msg => ({
  type: SET_STATUS, msg
})

export const createStatus = message => {
  return dispatch => {
    console.log("In Create Status")
    dispatch(settingStatus(message))
  }
}

export default reducer
