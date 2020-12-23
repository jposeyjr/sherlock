import { all } from 'redux-saga/effects';
import imageSaga from './image.saga';
import linkSaga from './link.saga';

export default function* rootSaga() {
  yield all([imageSaga(), linkSaga()]);
}
