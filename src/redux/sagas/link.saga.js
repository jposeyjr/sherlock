import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* linkSaga() {
  yield takeLatest('GET_LINKS', getLinks);
}

function* getLinks(action) {
  try {
    const response = yield axios.post('/api/links', action.payload);
    yield put({ type: 'SET_LINKS', payload: response.data });
  } catch (error) {
    console.log('Error trying to post data from link saga', error);
  }
}

export default linkSaga;
