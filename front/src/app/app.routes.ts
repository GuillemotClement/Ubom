import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Home } from './home/home';
import { Login } from './auth/login/login';
import { CreateProduct } from './product/create-product/create-product';

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
  {
    path: 'product/create',
    component: CreateProduct,
  },
];
