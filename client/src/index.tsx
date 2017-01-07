import 'core-js/fn/object/assign';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './index.scss';
import { App } from './components/app/app';
import { appReducer } from './reducers';
import { init } from './api/index';
import { fetchAllComments } from './actions/meta';

init(middlewares => createStore(
  appReducer,
  applyMiddleware(...middlewares)
))
  .then(store => {
      store.dispatch(fetchAllComments());

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
