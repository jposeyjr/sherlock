import { combineReducers } from 'redux';
import image from './image.reducer';
import link from './link.reducer';

const rootReducer = combineReducers({
  image,
  link,
});

export default rootReducer;
