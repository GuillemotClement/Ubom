import { Routes } from '@angular/router';
import { Register } from './_older/auth/register/register';
import { Login } from './_older/auth/login/login';
import { CreateProduct } from './features/assets/product/create-product/create-product';
import { ListProduct } from './features/assets/product/list-product/list-product';
import { Home } from './features/home/home/home';

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
  // branchement du sous routeur
  {
    path: 'assets',
    loadChildren: () => import('./features/assets/assets.routes').then((m) => m.assetRouteConfig),
  },
];
