import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {
        path:'',
        component:ProductsComponent
    },
    {
        path:'productDetails',
        component:ProductDetailsComponent
    }
];
