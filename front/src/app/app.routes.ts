import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Home } from './home/home';
import { Login } from './auth/login/login/login';

export const routeConfig: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
];
