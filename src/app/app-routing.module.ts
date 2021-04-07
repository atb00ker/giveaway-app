import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventComponent } from './event/event.component';
import { PickEventWinnerComponent } from './pick-event-winner/pick-event-winner.component';
import { AppRoutes } from './app.routes';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([AppRoutes.home]);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  {
    path: AppRoutes.createEvent, component: CreateEventComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  { path: AppRoutes.pickEventWinner, component: PickEventWinnerComponent },
  { path: AppRoutes.event, component: EventComponent },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent, CreateEventComponent,
  EventComponent, PickEventWinnerComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
