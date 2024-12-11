import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  cartForQuantity: any[] = [];
  
  // // behaviour subject is used for passing the data from one component to another component in behavuour subject we have to define the initial value
  // public SendDataToCart = new Subject<any[]>
  // get SendDataToCart$(): Observable<any[]> {
  //   return this.SendDataToCart.asObservable(); 
  // }

  // assinging behaviour subject which will transfer the data
  public SendDataToCart = new BehaviorSubject<any[]>([])
  SendDataToCart$ = this.SendDataToCart.asObservable();  // observvable for component to subscribe to 


  constructor() {
    // Load cart from localStorage if available
    // if (typeof window !== 'undefined' && window.localStorage) {
    //   const savedCarts = localStorage.getItem('carts');
    //   if (savedCarts) {
    //     this.cartForQuantity = JSON.parse(savedCarts);
    //     this.SendDataToCart.next(this.cartForQuantity); 
    //   }
    // }
    this.loadCart()
  }

  loadCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === currentUser.email);

    if (user) {
      this.cartForQuantity = user.cart || [];
      this.SendDataToCart.next(this.cartForQuantity); 
    }
    }
  }
  

  


  addToCartButtonClicked(CartProduct : any){
    // in this the argument which we got from the catalog component we are displaying the value of it 
    console.log('Adding product:', CartProduct);
    
    // it will find if the existing product is available in the cart or not through unique id
    const existingProduct = this.cartForQuantity.find(item => item.id === CartProduct.id);
    
    // if its available it will ppend the data or it will execute else statement
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

    this.saveCart(this.cartForQuantity)
  }

  saveCart(updatedProducts: any[]) {
    this.cartForQuantity = updatedProducts
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === currentUser.email);

    if (userIndex !== -1) {
      users[userIndex].cart = this.cartForQuantity;
      localStorage.setItem('users', JSON.stringify(users));
      this.SendDataToCart.next(updatedProducts); 
    }
  }

  // authenticated(isauthenticated : boolean){
  //   isauthenticated 
  // }
}
