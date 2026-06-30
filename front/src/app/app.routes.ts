import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Home } from './home/home';
import { Login } from './auth/login/login';
import { CreateProduct } from './product/create-product/create-product';
import { ListProduct } from './product/list-product/list-product';

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
    path: 'products',
    component: ListProduct,
  },
  {
    path: 'products/create',
    component: CreateProduct,
  },
];
