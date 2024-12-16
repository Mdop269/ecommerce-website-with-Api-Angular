import { Component } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { LocalstorageService } from '../../service/localstorage.service';
import { ApiToLocalstorageService } from '../../service/api-to-localstorage.service';


@Component({
  selector: 'app-carts-detail',
  imports: [
    FontAwesomeModule,
],
  templateUrl: './carts-detail.component.html',
  styleUrl: './carts-detail.component.css'
})
export class CartsDetailComponent {

  // it is font awsome icon
  faMinus = faMinus;
  faPlus = faPlus;
  cartForQuantity : any[] = [];
  allProducts : any[] = [];
  constructor(private LocalstorageService: LocalstorageService, 
    private ApiToLocalstorageService : ApiToLocalstorageService ,
  ){
  }

  // in this whatever data we got from the cart we will store it in the array 
  ngOnInit(): void{
    // in this we are getting data from the service 
    this.ApiToLocalstorageService.allProduct$.subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        this.allProducts = Object.values(data);
      } else {
        console.log('Data is not an object');
      }
    })

    // in this the we are getting data of indiviual person
    this.LocalstorageService.SendDataToCart$.subscribe((data) => {
      if (data != null) {
        this.cartForQuantity = [...data];
      }
    });
  } 

  // in this we will minus the value of product and with this it will append the stock also 
  minus(cart: any): void {
    // if the quantity is greater then it will perform minus
    if (cart.quantity > 1) {
      cart.quantity -= 1;
      // in this we are finding the id of the product which got minus in all the products 
      const existingProduct = this.allProducts.find(item => item.id === cart.id);   
      
      // if there is any product 
      if (existingProduct) {
        // it will append the stock value 
        existingProduct.stock += 1;
        // and we will store directly to the localstorage 
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
    } 
    // if there the product quantity is 1 
    else {
      // in this we are removing the product from the index of the userCart
      const index = this.cartForQuantity.findIndex(item => item.id === cart.id);
      // if there is no index then it give -1 value thats why in if statement i have used minus 1 
      if (index !== -1) {
        // it will remove the array
        this.cartForQuantity.splice(index, 1); // Remove from array
      }
      // now we are finding the product again for updating 
      const existingProduct = this.allProducts.find(item => item.id === cart.id);     
      if (existingProduct) {
        existingProduct.stock += 1;
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
    }
    // when everything is done we will save the cart 
    this.LocalstorageService.saveCart([...this.cartForQuantity]); // Save a copy
  }
  
  // whenever someone want to increase the product 
  plus(cart: any): void {
    // it will check if the quantity is less then a stock then we will let it add or we wont as we cant sell product more then the stock 
    if (cart.quantity < cart.stock) {
      cart.quantity += 1;
      // again same upper process find the product and we will update that stock 
      const existingProduct = this.allProducts.find(item => item.id === cart.id);     
      if (existingProduct) {
        existingProduct.stock -= 1;
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
      this.LocalstorageService.saveCart([...this.cartForQuantity]); // Save a copy
    }
  }
}

