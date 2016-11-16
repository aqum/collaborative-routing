import 'core-js/fn/object/assign';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.scss';
import { App } from './components/app/app';
import { appReducer } from './reducers';

const store = createStore(appReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
