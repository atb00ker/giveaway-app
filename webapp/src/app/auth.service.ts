
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  thirdCookiesEnabled = true;
  uidAuthUser: string = null;
  emailAuthUser: string = null;
  authToken: string = null;

  // Third-Party Cookies
  checkCookiesEnabled() {
    const receiveMessage = evt => {
      if (evt.data === 'MM:3PCunsupported') {
        this.thirdCookiesEnabled = false;
      } else if (evt.data === 'MM:3PCsupported') {
        this.thirdCookiesEnabled = true;
      }
    };
    window.addEventListener('message', receiveMessage, false);
  }

  // Firebase Authentication
  loginBegin(provider) {
    if (this.thirdCookiesEnabled === false) {
      alert('Please enable third-party cookies to login!');
    } else {
      const providerObject = this.getProviderObject(provider);
      this.auth.signInWithPopup(providerObject).then(result => {
        this.uidAuthUser = result.user.uid;
        this.emailAuthUser = result.user.email;
        result.user.getIdToken().then((token) => {
          this.authToken = token;
          localStorage.setItem('afb_giveaway_token', JSON.stringify(this.authToken));
        });
        localStorage.setItem('afb_giveaway_uid', JSON.stringify(this.uidAuthUser));
        localStorage.setItem('afb_giveaway_email', JSON.stringify(this.emailAuthUser));
        location.reload();
      }).catch(error => {
        console.log(error.code);
      });
    }
  }

  getProviderObject(provider) {
    if (provider === 'Google') { return new firebase.auth.GoogleAuthProvider(); }
  }


  getUserLoggedIn() {
    if (localStorage.getItem('afb_giveaway_uid')) {
      this.uidAuthUser = JSON.parse(localStorage.getItem('afb_giveaway_uid'));
      this.emailAuthUser = JSON.parse(localStorage.getItem('afb_giveaway_email'));
      this.authToken = JSON.parse(localStorage.getItem('afb_giveaway_token'));
    }
  }

  logoutBegin() {
    this.auth.signOut();
    localStorage.removeItem('afb_giveaway_uid');
    localStorage.removeItem('afb_giveaway_email');
    localStorage.removeItem('afb_giveaway_token');
    location.reload();
  }
}
