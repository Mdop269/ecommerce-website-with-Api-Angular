import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductComponent } from "./product/product.component";
import { ProductsComponent } from "./products/products.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ProductComponent, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-website-with-Api';
}
