import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './redux/reducers/_root.reducer';
import rootSaga from './redux/sagas/_root.saga';

const sageMiddleware = createSagaMiddleware();

//prevent logger when not in dev mode
const devCheck =
  process.env.NODE_ENV === 'development'
    ? [sageMiddleware, logger]
    : [sageMiddleware];
const store = createStore(rootReducer, applyMiddleware(...devCheck));

sageMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
