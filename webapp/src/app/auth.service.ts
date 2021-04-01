
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HelperService } from './helper.service';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private auth: AngularFireAuth, private helper: HelperService) { }

  // Third-Party Cookies
  checkCookiesEnabled() {
    const receiveMessage = evt => {
      if (evt.data === 'MM:3PCunsupported') {
        this.helper.thirdCookiesEnabled = false;
      } else if (evt.data === 'MM:3PCsupported') {
        this.helper.thirdCookiesEnabled = true;
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }

  // Firebase Authentication
  loginBegin(provider) {
    if (this.helper.thirdCookiesEnabled === false) {
      alert('Please enable third-party cookies to login!');
    } else {
      const providerObject = this._getProviderObject(provider);
      this.auth.setPersistence('local').then(() => {
        this.auth.signInWithPopup(providerObject)
          .then(() => this.isLoggedIn())
          .catch(error => console.log(error.code));
      });
    }
  }

  private _getProviderObject(provider) {
    if (provider === 'Google') { return new firebase.auth.GoogleAuthProvider(); }
  }

  async isLoggedIn() {
    const user = await this.auth.authState.pipe(first()).toPromise();
    if (user)
      this.helper.loggedInUser.next(user.email);
    else
      this.helper.loggedInUser.next(null);
  }

  logoutBegin(reload = true) {
    this.auth.signOut();
    this.helper.loggedInUser.next(null);
    if (reload)
      location.reload();
  }
}
