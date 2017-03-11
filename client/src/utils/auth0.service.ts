import Auth0Lock from 'auth0-lock';

export class AuthService {
  lock: any;

  constructor(clientId, domain, hashParseCallback) {
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
    console.log('token set');
    this.setToken(authResult.idToken);
  }

  login() {
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
