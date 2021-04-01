import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelperService } from './helper.service';
import { User, Event, Participant } from './app.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;


@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private firestore: AngularFirestore, private helper: HelperService) { }

  checkCreateAllowed(email: string): Observable<DocumentSnapshot<User>> {
    return this.firestore.doc<User>(`giveaway/users/priviledged/${this.helper.md5Hash(email)}`).get();
  }

  createEvent(email: string, name: string, randomEventId: string): Promise<void> {
    const event: Event = { name, created: new Date() };
    return this.firestore.doc(`giveaway/events/${email}/${randomEventId}`).set(event);
  }

  addParticipant(participant: Participant, code: string, eventId: string) {
    const hashedEmail = this.helper.md5Hash(participant.email),
      path = `giveaway/events/${code}/${eventId}/participants/${hashedEmail}`;
    return this.firestore.doc(path).set(participant);
  }
}
