import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './productsHomePage/products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartsDetailComponent } from './carts/carts-detail/carts-detail.component';
import { LoginComponent } from './validation/login/login.component';
import { SignupComponent } from './validation/signup/signup.component';
import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [

    {
        path:'products',
        component:ProductsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'productDetails',
        component:ProductDetailsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'cart',
        component: CartsDetailComponent,
        canActivate: [AuthGuardService]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];
