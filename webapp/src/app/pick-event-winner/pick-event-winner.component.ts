import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';
// Giveaway Organizer
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { Participant } from '../app.interface';
import { NgbToastsService } from '../ngbootstrap/ngtoasts.service';

@Component({
  selector: 'app-pick-event-winner',
  templateUrl: './pick-event-winner.component.html',
  styleUrls: ['./pick-event-winner.component.scss'],
  providers: [ApiService]
})
export class PickEventWinnerComponent implements OnInit {

  public contactAuthorText: string = environment.app.contactAuthorText;
  public isAllowed = false;
  public displayStatus = 'progress';
  public winner: Participant;
  public participantList: Participant[] = [];
  public organizer: string;
  public eventId: string;
  private ngUnsubscribe = new Subject();

  constructor(private titleService: Title, private route: ActivatedRoute,
    private api: ApiService, public helper: HelperService,
    private clipboard: ClipboardService, private toaster: NgbToastsService) {
    this.titleService.setTitle("Giveaway! | Pick a winner!");
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.organizer = params['code'];
        this.eventId = params['event'];
      });
    this.helper.loggedInUser.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(email => {
        if (!email)
          this.displayStatus = 'error';
        else if (email != 'loading')
          this.getAllParticipants();
      });
  }

  getAllParticipants() {
    this.api.getAllParticipants(this.organizer, this.eventId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          response.docs.map(record => this.participantList.push(record.data()));
          this.displayStatus = 'normal';
          if (this.participantList.length === 0) {
            this.displayStatus = 'error';
            setTimeout(() => this.getAllParticipants(), 5000);
          }
          this.isAllowed = true;
        },
        error => {
          this.displayStatus = 'error';
          console.error(error);
        }
      );
  }

  pickRandomWinner() {
    this.displayStatus = 'progress';
    if (this.participantList.length > 0) {
      this._pickRandomWinner();
      this.displayStatus = 'success';
    } else {
      this.getAllParticipants();
      this.displayStatus = 'error';
    }
  }

  // Do not remove detailed documentation here, it is linked in about page to
  // explain how winner is drawn.
  _pickRandomWinner() {
    // Variable `this.participantList` contains the list of all the participants.
    // The operation `Math.random() * this.participantList.length` returns a random number
    // in the length of the list. if the random number is 5.5 it is converted to 5.
    let randomNumber = ~~(Math.random() * this.participantList.length);
    // The person who is in `randomNumber` place in the list is stored in
    // `this.winner` variable which is displayed on the browser.
    this.winner = this.participantList[randomNumber];
    // Shows the name of winner on the developer console, so that it can be verified.
    // If the console output matches and this code is not manipulated, then we can conclude
    // that winner was reasonably likely randomly chosen.
    console.info(`Picked winner: ${this.winner.name}`);
  }

  copyEmailToClipboard() {
    this.clipboard.copyFromContent(this.winner.email);
    this.toaster.showClipboardToast();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
