import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventComponent } from './event/event.component';

export class AppRoutes {
  public static home = 'home';
  public static about = 'about';
  public static createEvent = 'create-event';
  public static event = 'giveaway';
}

// TODO: Not working in prod: https://github.com/angular/angularfire/issues/2114
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([AppRoutes.home]);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  {
    path: AppRoutes.createEvent, component: CreateEventComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  { path: AppRoutes.event, component: EventComponent },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent, CreateEventComponent, EventComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
