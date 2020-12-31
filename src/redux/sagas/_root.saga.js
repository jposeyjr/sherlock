import { all } from 'redux-saga/effects';
import imageSaga from './image.saga';
import linkSaga from './link.saga';

//used to hold all the saga calls to allow for easier testing and scalability
export default function* rootSaga() {
  yield all([imageSaga(), linkSaga()]);
}
