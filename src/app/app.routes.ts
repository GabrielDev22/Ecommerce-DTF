import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { HomeComponent } from './Ecommerce/home/home.component';
import { VenderComponent } from './Ecommerce/vender/vender/vender.component';
import { ProductComponent } from './Ecommerce/product/product.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'vender', component: VenderComponent},
    {path: 'products', component: ProductComponent},
    {path: 'home', component: HomeComponent}
];
