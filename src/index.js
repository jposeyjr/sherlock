import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './redux/reducers/_root.reducer';
import rootSage from './redux/sagas/_root.sage';

const sageMiddleware = createSagaMiddleware();

//prevent logger when not in dev mode
const devCheck =
  process.env.NODE_ENV === 'development'
    ? [sageMiddleware, logger]
    : [sageMiddleware];
const store = createStore(rootReducer, applyMiddleware(...devCheck));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
