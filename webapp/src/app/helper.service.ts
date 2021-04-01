import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HelperService {

  public thirdCookiesEnabled = false;
  public loggedInUser: BehaviorSubject<string>;

  constructor() {
    this.loggedInUser = new BehaviorSubject<string>('loading');
  }

  getUrlSafeRandomString(strLength) {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(strLength)].reduce(a => a + p[~~(Math.random() * p.length)], '');
  }

  md5Hash(value): string {
    return new Md5().appendStr(value).end().toString().toUpperCase();
  }
}
