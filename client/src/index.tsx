import './polyfills';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import { appReducer } from './reducers';
import { AuthService } from './utils/auth0.service';
import { ICurrentUserStore, initialCurrentUserStore } from './reducers/stores/current-user';
import { config } from '../config/config';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CRoutesList } from './containers/c-routes-list';
import { initialMetaStore } from './reducers/stores/meta';
import { CLoader } from './containers/c-loader';
import { currentUserMiddleware } from './api/current-user';
import { createSocket, connectChannel } from './api/utils';
import { mapMiddleware } from './api/map';
import { CApp } from './containers/c-app';

const auth = new AuthService(
  config.auth0.appId,
  config.auth0.appBaseUrl,
);

bootstrapApp();

// function handleHashParse(result) {
  // const isError = result instanceof Error;

  // // initial login when token is not yet set
  // if (result && !isError) {
    // checkProfile(result.idToken);
    // return;
  // }

  // if (this.loggedIn()) {
    // checkProfile(this.getToken());
    // return;
  // }

  // if (isError) {
    // alert(`Couldn't parse auth0 response. Please log in again.`);
  // }

  // this.logout();
  // this.login();
// }

// function checkProfile(token) {
  // auth.lock.getProfile(
    // token,
    // (error, profile) => {
      // if (error) {
        // alert(`Coulnd't load your profile. Please log in again.`);
        // auth.logout();
        // auth.login();
        // return;
      // }

      // bootstrapApp({
        // isAnonymous: false,
        // email: profile.email,
        // name: profile.name,
        // routes: [],
        // token,
      // });
    // },
  // );
// }

function bootstrapApp(currentUser: ICurrentUserStore = initialCurrentUserStore) {
  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

  return createSocket(currentUser.token)
    .catch(err => {
      console.log(err);
      alert(`Couldn't connect to server.`);
    })
    .then(socket => {
      connectChannel(socket, 'main')
        .catch(err => {
          console.log(err);
          alert(`Couldn't connect to main channel.`);
        })
        .then(mainChannel => {
          const initialState = {
            currentUser,
            meta: Object.assign({}, initialMetaStore, { socket, mainChannel }),
          };
          const store = createStore(
            appReducer,
            initialState,
            composeEnhancers(applyMiddleware(
              currentUserMiddleware,
              mapMiddleware,
              thunk,
            )),
          );

          render(
            <Provider store={store}>
              <Router>
                <div>
                  <CLoader className='cr-app__loader' />
                  <Route exact path='/' component={CRoutesList} />
                  <Route exact path='/map/:routeId' component={CApp} />
                </div>
              </Router>
            </Provider>,
            document.getElementById('app'),
          );
        });
    });
}
