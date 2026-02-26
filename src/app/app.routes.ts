import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { authGuard } from './auth-guard'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard'; 
import { SignupComponent } from './signup/signup'; 
import { CartComponent } from './cart/cart';
import { ProductDetailsComponent } from './product-details/product-details';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailsComponent }, 
  
  { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { path: '**', redirectTo: '' }
];