import { noop } from 'lodash';
import Auth0Lock from 'auth0-lock';

export class AuthService {
  lock: any;

  constructor(clientId, domain, hashParseCallback = noop) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token',
      },
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
}
