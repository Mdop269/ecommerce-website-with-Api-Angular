import { Component, Inject, Input,  } from '@angular/core';
import { ApiDataService } from '../../service/api-data.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { LocalstorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-carts-detail',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './carts-detail.component.html',
  styleUrl: './carts-detail.component.css'
})
export class CartsDetailComponent {
  faMinus = faMinus;
  faPlus = faPlus;
  cartForQuantity : any[] = [];
  constructor(private LocalstorageService: LocalstorageService){
  }

  // in this whatever data we got from the cart we will store it in the array 
  ngOnInit(): void{
    this.LocalstorageService.SendDataToCart$.subscribe((data) => {
      if (data != null) {
        this.cartForQuantity = [...data];
      }
    });
  } 

  minus(cart: any): void {
    if (cart.quantity > 1) {
      cart.quantity -= 1;
    } else {
      const index = this.cartForQuantity.findIndex(item => item.id === cart.id);
      if (index !== -1) {
        this.cartForQuantity.splice(index, 1); // Remove from array
      }
    }
    this.LocalstorageService.saveProducts([...this.cartForQuantity]); // Save a copy
  }
  
  plus(cart: any): void {
    if (cart.quantity < cart.stock) {
      cart.quantity += 1;
      this.LocalstorageService.saveProducts([...this.cartForQuantity]); // Save a copy
    }
  }
}
