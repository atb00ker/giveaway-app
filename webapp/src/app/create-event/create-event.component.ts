import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title } from "@angular/platform-browser";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Giveaway Organizer
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [ApiService]
})
export class CreateEventComponent implements OnInit {

  public contactAuthorText: string = environment.app.contactAuthorText;
  public isAllowed = false;
  public displayStatus = 'progress';
  private ngUnsubscribe = new Subject();

  constructor(private titleService: Title, private api: ApiService, public auth: AuthService) {
    this.titleService.setTitle("Giveaway! | Create new giveaway!");
  }

  ngOnInit(): void {
    this.checkIsAllowed()
  }

  checkIsAllowed() {
    this.api.checkCreateAllowed(this.auth.uidAuthUser, this.auth.authToken)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          if (data) {
            this.displayStatus = 'normal';
            this.isAllowed = true;
          } else {
            this.displayStatus = 'error';
          }
        },
        () => { this.displayStatus = 'error'; }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
