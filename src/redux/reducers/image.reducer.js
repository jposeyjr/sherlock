const init_state = [];
const imageReducer = (state = init_state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return action.payload;
    case 'RESET_IMAGES':
      return init_state;
    default:
      return state;
  }
};

export default imageReducer;
