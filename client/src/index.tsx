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
import { AuthService } from './utils/auth0.service';
import { ICurrentUserStore } from './reducers/stores/current-user';
import { config } from '../config/config';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CRoutesList } from './containers/c-routes-list';

const auth = new AuthService(
  config.auth0.appId,
  config.auth0.appBaseUrl,
  handleHashParse
);

function handleHashParse(result) {
  const isError = result instanceof Error;

  // initial login when token is not yet set
  if (result && !isError) {
    checkProfile(result.idToken);
    return;
  }

  if (this.loggedIn()) {
    checkProfile(this.getToken());
    return;
  }

  if (isError) {
    alert(`Couldn't parse auth0 response. Please log in again.`);
  }

  this.logout();
  this.login();
}

function checkProfile(token) {
  auth.lock.getProfile(
    token,
    (error, profile) => {
      if (error) {
        alert(`Coulnd't load your profile. Please log in again.`);
        auth.logout();
        auth.login();
        return;
      }

      bootstrapApp({
        email: profile.email,
        name: profile.name,
        routes: [],
        token,
      });
    }
  );
}

function bootstrapApp(currentUser: ICurrentUserStore) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return init(middlewares => createReduxStore(
    appReducer,
    { currentUser },
    composeEnhancers(applyMiddleware(...middlewares, thunk))
  ), currentUser.token)
    .catch(err => {
      console.log(err);
      alert(`Couldn't connect to server.`);
    })
    .then(store => {
      // store.dispatch(fetchAllComments());
      // store.dispatch(fetchRoute());

      render(
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path='/' component={CRoutesList} />
              <Route exact path='/route/:routeId' component={App} />
            </div>
          </Router>
        </Provider>,
        document.getElementById('app')
      );
    });

  // wrapper just to get rid of typescript errors when overriding state
  function createReduxStore(reducer: any, state: any, middleware: any) {
    return createStore(reducer, state, middleware);
  }
}
