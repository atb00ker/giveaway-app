import { HostListener, Component, OnInit } from '@angular/core';
import { AppRoutes } from '../app-routing.module';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor() { }

  // Path
  public HOME_PATH: string = '/' + AppRoutes.home;
  public ABOUT_PATH: string = '/' + AppRoutes.about;
  public collapseEnabled = 'NavBar';

  ngOnInit() {
  }

  @HostListener('window:resize')
  enableBootstrapCollapse() {
    if (window.innerWidth > 768) {
      this.collapseEnabled = 'NavBar';
    } else {
      this.collapseEnabled = 'collapsibleNavbar';
    }
  }
}
