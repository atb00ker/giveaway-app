import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HelperService } from './helper.service';
import { User, Event, Participant } from './app.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable()
export class ApiService {

  private database = 'giveaway';
  constructor(private firestore: AngularFirestore, private helper: HelperService) { }

  checkCreateAllowed(email: string): Observable<DocumentSnapshot<User>> {
    return this.firestore.doc<User>(`${this.database}/users/priviledged/${this.helper.md5Hash(email)}`).get();
  }

  createEvent(email: string, name: string, randomEventId: string): Promise<void> {
    const event: Event = { name, created: new Date() };
    return this.firestore.doc(`${this.database}/events/${email}/${randomEventId}`).set(event);
  }

  addParticipant(participant: Participant, code: string, eventId: string): Promise<void> {
    const hashedEmail = this.helper.md5Hash(participant.email),
      path = `${this.database}/events/${code}/${eventId}/participants/${hashedEmail}`;
    return this.firestore.doc(path).set(participant);
  }

  getAllParticipants(code: string, eventId: string): Observable<QuerySnapshot<Participant>> {
    return this.firestore.doc(`${this.database}/events/${code}/${eventId}`)
      .collection<Participant>('participants').get();
  }
}
