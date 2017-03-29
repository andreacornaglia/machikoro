const initialState = {
    showModal: false,
    element: {}
};

const reducer = (state=initialState, action) => {

  switch(action.type) {

    case 'TOGGLE_MODAL':
      state.showModal = !state.showModal;
      break;

    case 'CHANGE_ELEMENT':
      state.element = action.element;
      break;
  }

  return state
}

const SET_GAME = 'SET_GAME'

export const toggleModal = () => {
  return { type: 'TOGGLE_MODAL'};
}

export const changeElement = element => {
    return {
        type: 'CHANGE_ELEMENT',
        element
    }
}

export default reducer;