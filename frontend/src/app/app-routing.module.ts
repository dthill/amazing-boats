import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConstants } from './constants/route.constants';
import { loggedOutGuard } from './guards/loggedOut.guard';
import { loggedInGuard } from './guards/loggedIn.guard';

const routes: Routes = [
  {
    path: routeConstants.home,
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((x) => x.HomeComponent),
    canActivate: [loggedInGuard],
  },
  {
    path: routeConstants.login,
    loadComponent: () =>
      import('./pages/login/login.component').then((x) => x.LoginComponent),
    canActivate: [loggedOutGuard],
  },
  {
    path: routeConstants.register,
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (x) => x.RegisterComponent
      ),
    canActivate: [loggedOutGuard],
  },
  {
    path: routeConstants.notFound,
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (x) => x.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: routeConstants.notFound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
