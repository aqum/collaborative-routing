import './polyfills';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import { App } from './components/app/app';
import { appReducer } from './reducers';
import { init } from './api/index';
import { fetchAllComments } from './actions/comments';
import { fetchRoute } from './actions/route';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

init(middlewares => createStore(
  appReducer,
  composeEnhancers(applyMiddleware(...middlewares, thunk))
))
  .then(store => {
      store.dispatch(fetchAllComments());
      store.dispatch(fetchRoute());

      render(
        <Provider store={store}>
        <App />
        </Provider>,
        document.getElementById('app')
      );
    }
  )
  .catch(err => {
    console.error(err);
    alert(`Couldn't connect to server.`);
  });
