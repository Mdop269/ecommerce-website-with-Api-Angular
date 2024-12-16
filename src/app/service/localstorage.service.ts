import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  cartForQuantity: any[] = [];

  // assinging behaviour subject which will transfer the data
  public SendDataToCart = new BehaviorSubject<any[]>([])
  SendDataToCart$ = this.SendDataToCart.asObservable();  // observvable for component to subscribe to 


  constructor() {
    this.loadCart()
  }

  loadCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      // as when we login we stored current user in to the local storage we are fetching that 
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // we are getting the all users data 
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // in this we will find the user as the email cant be same twice 
    const user = users.find((u: any) => u.email === currentUser.email);

    if (user) {
      // we are storing user cart in this 
      this.cartForQuantity = user.cart || [];
      // we are sending the cart to the subscriber 
      this.SendDataToCart.next(this.cartForQuantity); 
    }
    }
  }
  

  


  addToCartButtonClicked(CartProduct : any){
    // in this the argument which we got from the catalog component we are displaying the value of it 
    console.log('Adding product:', CartProduct);
    
    // it will find if the existing product is available in the cart or not through unique id
    const existingProduct = this.cartForQuantity.find(item => item.id === CartProduct.id);
    
    // if its available it will apend the data or it will execute else statement
      if (existingProduct) {
        if(existingProduct.quantity < CartProduct.stock){
          existingProduct.quantity += 1;
        }
      } else {
        this.cartForQuantity.push({
          // it is a spread operator in this ...product 
          // it will assign the whole array and add the it assign the new object with the new value 
          // but it wont change the oriinal like product it will just assign in new object in which case 
          // our is cartForQuantity
          ...CartProduct,
          quantity: 1,
        });
      }
      // we will save the cart 
    this.saveCart(this.cartForQuantity)
  }

  saveCart(updatedCarts: any[]) {
    this.cartForQuantity = updatedCarts
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
// if there is no user the index value will be -1 
    if (userIndex !== -1) {
      // in this we are finding that index and updating the current cart 
      users[userIndex].cart = this.cartForQuantity;
      localStorage.setItem('users', JSON.stringify(users));
      // and we will send this cart to the component 
      this.SendDataToCart.next(updatedCarts); 
    }
  }

}
