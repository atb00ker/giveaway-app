import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  public contactAuthorText: string = environment.app.contactAuthorText;
  public isAllowed = false;
  public displayStatus = 'normal';
  constructor() { }

  ngOnInit(): void {
    this.checkIsAllowed()
  }

  checkIsAllowed() {

  }
}
