import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PathLocationStrategy } from '@angular/common';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastsComponent } from './ngbootstrap/ngbtoasts.compontent';
// Giveaway Organizer
import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth.service';
import { CopyIconComponent } from './app.templates';
import { JsonParsePipe } from './pipes/jsonparse.pipe'


@Component({
  selector: 'app-root',
  template: `
  <app-nav></app-nav>
  <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Giveaway!';
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NgbToastsComponent,
    CopyIconComponent,
    JsonParsePipe,
    RoutedComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    AngularFireAnalyticsModule,
    ClipboardModule,
    NgbModule
  ],
  providers: [
    AuthService,
    ScreenTrackingService,
    UserTrackingService,
    PathLocationStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
