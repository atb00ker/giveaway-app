import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateEventComponent } from './create-event/create-event.component';

export class AppRoutes {
  public static home = 'home';
  public static about = 'about';
  public static createEvent = 'create-event';
}

// TODO: Not working in prod: https://github.com/angular/angularfire/issues/2114
// const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([AppRoutes.home]);
// ...canActivate(redirectUnauthorizedToHome())

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  {
    path: AppRoutes.createEvent, component: CreateEventComponent
  },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent, CreateEventComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
