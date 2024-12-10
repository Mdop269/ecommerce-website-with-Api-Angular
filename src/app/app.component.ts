import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CartsDetailComponent } from "./carts/carts-detail/carts-detail.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    NavbarComponent,
    CartsDetailComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-website-with-Api';
}
