import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Home } from './home/home';

export const routeConfig: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'register',
    component: Register,
  },
];
