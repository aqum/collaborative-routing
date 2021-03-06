import './polyfills';
import './typings';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import { appReducer } from './reducers';
import { AuthService } from './utils/auth0.service';
import { initialCurrentUserStore } from './reducers/stores/current-user';
import { config } from '../config/config';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initialMetaStore } from './reducers/stores/meta';
import { CLoader } from './containers/c-loader';
import { currentUserMiddleware } from './api/current-user';
import { createSocket, connectChannel } from './api/utils';
import { mapMiddleware } from './api/map';
import { CApp } from './containers/c-app';
import { Dashboard } from './components/dashboard/dashboard';
import { AccountPage } from './components/account-page/account-page';
import { fetchProfile } from './actions/current-user';

const authService = new AuthService(
  config.auth0.appId,
  config.auth0.appBaseUrl,
  handleHashParse,
);

function handleHashParse(result) {
  const mapTokenMatch = location.href.match(/\/map\/.+accessToken=([^&]*)/);
  if (mapTokenMatch) {
    const mapToken = mapTokenMatch[1];
    bootstrapApp({ isAnonymous: true }, mapToken);
    return;
  }

  const isError = result instanceof Error;
  if (result && !isError) {
    checkProfile(result.idToken);
    return;
  }

  if (authService.loggedIn()) {
    checkProfile(this.getToken());
    return;
  }

  authService.login();
}

function checkProfile(token) {
  authService.lock.getProfile(
    token,
    (error, profile) => {
      if (error) {
        alert(`Coulnd't load your profile. Please log in again.`);
        authService.logout();
        authService.login();
        return;
      }

      bootstrapApp({
        isAnonymous: false,
        email: profile.email,
        name: profile.name,
        userId: profile.user_id,
        token,
      });
    },
  );
}

function bootstrapApp(userData = {}, mapToken?: string) {
  return createSocket({ token: userData['token'], email: userData['email'] })
    .catch(err => {
      console.log(err);
      alert(`Couldn't connect to server. Try refreshing the page.`);
    })
    .then(socket => {
      const initialState = {
        currentUser: Object.assign({}, initialCurrentUserStore, userData),
        meta: Object.assign({}, initialMetaStore, { socket, authService }),
      };

      if (initialState.currentUser.isAnonymous) {
        startApp(initialState);
        return;
      }

      connectChannel(socket, 'main')
        .catch(err => {
          console.log(err);
          alert(`Couldn't connect to main channel. Try refreshing the page.`);
        })
        .then(mainChannel => {
          initialState.meta.mainChannel = mainChannel;
          startApp(initialState);
        });
    });
}

function startApp(initialState) {
  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
  const store = createStore(
    appReducer,
    initialState,
    composeEnhancers(applyMiddleware(
      currentUserMiddleware,
      mapMiddleware,
      thunk,
    )),
  );

  if (!initialState.currentUser.isAnonymous) {
    store.dispatch(fetchProfile());
  }

  render(
    <Provider store={store}>
      <Router>
        <div>
          <CLoader className='cr-app__loader' />
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/map/:routeId' component={CApp} />
          <Route exact path='/account' component={AccountPage} />
        </div>
      </Router>
    </Provider>,
    document.getElementById('app'),
  );
}
