const linkReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LINKS':
      return action.payload;
    case 'RESET_LINKS':
      return [];
    default:
      return state;
  }
};

export default linkReducer;
