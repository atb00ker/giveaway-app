import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  private databasebaseUrl = environment.app.databaseUrl;

  private jsonHttpheaders = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) { }

  checkCreateAllowed(userId, authToken): Observable<boolean> {
    const path = `giveaway/users/${userId}/organizer.json?auth=${authToken}`;
    return this.http.get<boolean>(this.databasebaseUrl + path, { headers: this.jsonHttpheaders });
  }
}
