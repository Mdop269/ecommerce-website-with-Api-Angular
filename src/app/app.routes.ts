import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartsDetailComponent } from './carts/carts-detail/carts-detail.component';

export const routes: Routes = [

    {
        path:'',
        component:ProductsComponent
    },
    {
        path:'productDetails',
        component:ProductDetailsComponent
    },
    {
        path:'cart',
        component: CartsDetailComponent
    }
];
