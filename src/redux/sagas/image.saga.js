import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* imageSaga() {
  yield takeLatest('GET_IMAGES', getImages);
}

function* getImages(action) {
  try {
    const response = yield axios.post('/api/images', action.payload);
    yield put({ type: 'SET_IMAGES', payload: response.data });
  } catch (error) {
    console.log('Error trying to post data from image saga', error);
  }
}

export default imageSaga;
