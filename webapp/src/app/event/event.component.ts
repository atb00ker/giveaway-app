import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { Participant } from '../app.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [ApiService]
})
export class EventComponent implements OnInit {

  constructor(private titleService: Title, private api: ApiService,
    private route: ActivatedRoute, public helper: HelperService) {
    this.titleService.setTitle("Giveaway! | Participate in event");
  }

  public contactAuthorText: string = environment.app.contactAuthorText;
  public displayStatus = 'progress';
  public isAllowed = false;
  public disableSubmitBtn = false;
  private ngUnsubscribe = new Subject();
  public organizer: string;
  public eventId: string;

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        this.organizer = params['code'];
        this.eventId = params['event'];
      });
    this.helper.loggedInUser.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(email => {
        if (!email) {
          this.isAllowed = false;
          this.displayStatus = 'error';
        }
        else if (email != 'loading') {
          this.isAllowed = true;
          this.displayStatus = 'normal';
        }
      });
  }

  addParticipantForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [])
  });

  addParticipantSubmit() {
    this.displayStatus = 'progress';
    this.disableSubmitBtn = true;
    console.log(this.addParticipantForm.value.message);
    let participant: Participant = {
      name: this.addParticipantForm.value.name,
      email: this.helper.loggedInUser.value,
      message: JSON.stringify(this.addParticipantForm.value.message)
    }
    this.api.addParticipant(participant, this.organizer, this.eventId)
      .then(() => {
        this.displayStatus = 'success';
      })
      .catch(error => {
        console.error(error);
        this.displayStatus = 'error';
      })
      .finally(() => this.disableSubmitBtn = false)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
