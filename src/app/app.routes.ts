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
    path: 'alta-producto',
    loadComponent: () =>
      import(
        './components/producto/alta-producto/alta-producto.component'
      ).then((m) => m.AltaProductoComponent),
  },
  {
    path: 'listado-productos',
    loadComponent: () =>
      import(
        './components/producto/listado-productos/listado-productos.component'
      ).then((m) => m.ListadoProductosComponent),
  },
  {
    path: 'listado-publico',
    loadComponent: () =>
      import(
        './components/producto/listado-publico/listado-publico.component'
      ).then((m) => m.ListadoPublicoComponent),
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
