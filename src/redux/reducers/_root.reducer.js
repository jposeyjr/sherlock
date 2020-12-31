import { combineReducers } from 'redux';
import image from './image.reducer';
import link from './link.reducer';

//used to hold all the reducers to break up code for easier testing and scalability
const rootReducer = combineReducers({
  image,
  link,
});

export default rootReducer;
