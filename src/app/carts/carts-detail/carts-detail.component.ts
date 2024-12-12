import { Component, Inject, Input,  } from '@angular/core';
import { ApiDataService } from '../../service/api-data.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { LocalstorageService } from '../../service/localstorage.service';
import { ApiToLocalstorageService } from '../../service/api-to-localstorage.service';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-carts-detail',
  imports: [
    FontAwesomeModule,
],
  templateUrl: './carts-detail.component.html',
  styleUrl: './carts-detail.component.css'
})
export class CartsDetailComponent {

  
  faMinus = faMinus;
  faPlus = faPlus;
  cartForQuantity : any[] = [];
  allProducts : any[] = [];
  constructor(private LocalstorageService: LocalstorageService, 
    private ApiDataService: ApiDataService, 
    private ApiToLocalstorageService : ApiToLocalstorageService ,
  ){
  }

  // in this whatever data we got from the cart we will store it in the array 
  ngOnInit(): void{
    this.ApiToLocalstorageService.allProduct$.subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        this.allProducts = Object.values(data);
      } else {
        console.log('Data is not an object');
      }
    })
    this.LocalstorageService.SendDataToCart$.subscribe((data) => {
      if (data != null) {
        this.cartForQuantity = [...data];
      }
    });
  } 

  minus(cart: any): void {
    if (cart.quantity > 1) {
      cart.quantity -= 1;
      const existingProduct = this.allProducts.find(item => item.id === cart.id);     
      if (existingProduct) {
        existingProduct.stock += 1;
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
    } else {
      const index = this.cartForQuantity.findIndex(item => item.id === cart.id);
      if (index !== -1) {
        this.cartForQuantity.splice(index, 1); // Remove from array
      }
      const existingProduct = this.allProducts.find(item => item.id === cart.id);     
      if (existingProduct) {
        existingProduct.stock += 1;
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
    }
    this.LocalstorageService.saveCart([...this.cartForQuantity]); // Save a copy
  }
  
  plus(cart: any): void {
    if (cart.quantity < cart.stock) {
      cart.quantity += 1;
      const existingProduct = this.allProducts.find(item => item.id === cart.id);     
      if (existingProduct) {
        existingProduct.stock -= 1;
        console.log(existingProduct)
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
      this.LocalstorageService.saveCart([...this.cartForQuantity]); // Save a copy
    }
  }
}

