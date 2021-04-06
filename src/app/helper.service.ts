import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { BehaviorSubject } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';
// Giveaway Organizer
import { environment } from '../environments/environment';
import { NgbToastsService } from './ngbootstrap/ngtoasts.service';

@Injectable({ providedIn: 'root' })
export class HelperService {

  public thirdCookiesEnabled = false;
  public loggedInUser: BehaviorSubject<string>;
  public contactAuthor: string = environment.app.contactAuthor;

  constructor(private clipboard: ClipboardService, private toaster: NgbToastsService) {
    this.loggedInUser = new BehaviorSubject<string>('loading');
  }

  getUrlSafeRandomString(strLength) {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(strLength)].reduce(a => a + p[~~(Math.random() * p.length)], '');
  }

  copyAuthorEmail() {
    this.clipboard.copyFromContent(this.contactAuthor);
    this.toaster.showClipboardToast();
  }

  md5Hash(value): string {
    return new Md5().appendStr(value).end().toString().toUpperCase();
  }
}
