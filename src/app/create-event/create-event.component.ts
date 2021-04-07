import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title } from "@angular/platform-browser";
import { FormControl, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Giveaway Organizer
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { User } from '../app.interface';
import { NgbToastsService } from '../ngbootstrap/ngtoasts.service';
import { AppRoutes } from '../app.routes';

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
  public disableCreateBtn = false;
  public user: User;
  public eventUrl: string;
  public winnerUrl: string;
  private ngUnsubscribe = new Subject();

  constructor(private titleService: Title, private clipboard: ClipboardService,
    private api: ApiService, public helper: HelperService, private toaster: NgbToastsService) {
    this.titleService.setTitle("Giveaway! | Create new giveaway");
  }

  ngOnInit(): void {
    this.helper.loggedInUser.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(email => {
        if (!email)
          this.displayStatus = 'error';
        else if (email != 'loading')
          this.checkIsAllowed(email);
      });
  }

  checkIsAllowed(email) {
    this.api.checkCreateAllowed(email).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.user = response.data();
          this.displayStatus = 'normal';
          this.isAllowed = true;
        },
        error => {
          this.displayStatus = 'error';
          console.error(error);
        }
      );
  }

  eventName = new FormControl(null, [Validators.required]);
  createEventClick() {
    this.disableCreateBtn = true;
    this.displayStatus = 'progress';
    let email = this.helper.md5Hash(this.helper.loggedInUser.value);
    let randomEventId = this.helper.getUrlSafeRandomString(21);
    this.api.createEvent(email, this.eventName.value, randomEventId)
      .then(() => {
        const parameters = `?code=${email}&event=${randomEventId}`;
        this.eventUrl = this.helper.joinToBaseUrl(`${AppRoutes.event}${parameters}`);
        this.winnerUrl = this.helper.joinToBaseUrl(`${AppRoutes.pickEventWinner}${parameters}`);
        this.displayStatus = 'success';
      })
      .catch(error => {
        console.error(error);
        this.displayStatus = 'error';
      })
      .finally(() => this.disableCreateBtn = false)
  }

  copiedToClipboard(text: string) {
    this.clipboard.copyFromContent(text);
    this.toaster.showClipboardToast();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
