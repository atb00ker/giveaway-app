import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../app.routes';
import { AuthService } from '../auth.service';
import { HelperService } from '../helper.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService, public helper: HelperService) { }

  public userInfo: string;
  public isMenuCollapsed = true;
  private ngUnsubscribe = new Subject();
  // Path
  public HOME_PATH: string = '/' + AppRoutes.home;
  public ABOUT_PATH: string = '/' + AppRoutes.about;
  public CREATE_EVENT_PATH: string = '/' + AppRoutes.createEvent;

  ngOnInit() {
    this.helper.loggedInUser.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(email => this.userInfo = email);
    this.auth.checkCookiesEnabled();
    this.auth.isLoggedIn();
  }

  beginLogin() {
    this.auth.loginBegin('Google');
  }

  beginLogout() {
    this.auth.logoutBegin()
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
