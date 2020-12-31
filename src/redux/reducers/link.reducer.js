const init_state = [];
const linkReducer = (state = init_state, action) => {
  switch (action.type) {
    case 'SET_LINKS':
      return action.payload;
    case 'RESET_LINKS':
      return init_state;
    default:
      return state;
  }
};

export default linkReducer;
