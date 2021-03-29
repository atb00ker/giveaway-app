import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export class AppRoutes {
  public static home = 'home';
  public static about = 'about';
}

// TODO: Not working in prod: https://github.com/angular/angularfire/issues/2114
// const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([AppRoutes.home]);
// ...canActivate(redirectUnauthorizedToHome())

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.about, component: AboutComponent },
  { path: '**', component: HomeComponent },
];

export const RoutedComponents = [HomeComponent, AboutComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
