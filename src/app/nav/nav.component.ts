import { HostListener, Component, OnInit } from '@angular/core';
import { AppRoutes } from '../app.routes';
import { AuthService } from '../auth.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService, public helper: HelperService) { }

  // Path
  public HOME_PATH: string = '/' + AppRoutes.home;
  public ABOUT_PATH: string = '/' + AppRoutes.about;
  public CREATE_EVENT_PATH: string = '/' + AppRoutes.createEvent;
  // Path
  public collapseEnabled = 'NavBar';
  public userInfo = 'NavBar';

  ngOnInit() {
    this.helper.loggedInUser.subscribe(email => this.userInfo = email);
    this.auth.checkCookiesEnabled();
    this.auth.isLoggedIn();
    this.enableBootstrapCollapse();
  }

  @HostListener('window:resize')
  enableBootstrapCollapse() {
    if (window.innerWidth > 768) {
      this.collapseEnabled = 'NavBar';
    } else {
      this.collapseEnabled = 'collapsibleNavbar';
    }
  }

  beginLogin() {
    this.auth.loginBegin('Google');
  }

  beginLogout() {
    this.auth.logoutBegin()
  }
}
