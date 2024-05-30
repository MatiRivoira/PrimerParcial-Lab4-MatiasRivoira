import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'bienvenida',
    loadComponent: () =>
      import('./components/bienvenida/bienvenida.component').then(
        (m) => m.BienvenidaComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        './components/auth/forgot-password/forgot-password.component'
      ).then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'alta-repartidor',
    loadComponent: () =>
      import(
        './components/repartidor/alta-repartidor/alta-repartidor.component'
      ).then((m) => m.AltaRepartidorComponent),
  },
  {
    path: 'listado-repartidores',
    loadComponent: () =>
      import(
        './components/repartidor/listado-repartidor/listado-repartidor.component'
      ).then((m) => m.ListadoRepartidorComponent),
  },
  {
    path: 'listado-helados',
    loadComponent: () =>
      import(
        './components/helado/listado-helados/listado-helados.component'
      ).then((m) => m.ListadoHeladosComponent),
  },
  {
    path: '',
    redirectTo: '/bienvenida',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/bienvenida',
    pathMatch: 'full',
  },
];
