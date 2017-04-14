import { noop } from 'lodash';
import Auth0Lock from 'auth0-lock';
import { WebAuth } from 'auth0-js';

export class AuthService {
  lock: any;
  webAuth: any;

  constructor(clientId, domain, hashParseCallback = noop) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token',
      },
    });
    this.webAuth = new WebAuth({
      domain,
      clientID: clientId,
    });
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    this.lock.on('hash_parsed', hashParseCallback.bind(this));
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
  }

  login() {
    this.logout();
    this.lock.show();
  }

  loggedIn() {
    return !!this.getToken();
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  resetPassword(email) {
    return new Promise((resolve, reject) => {
      this.webAuth.changePassword(
        {
          email,
          connection: 'Username-Password-Authentication',
        },
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve(response);
        },
      );
    });
  }
}
