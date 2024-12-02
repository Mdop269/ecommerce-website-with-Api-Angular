import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-product',
  imports: [
    MatCardModule,
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product: any;
  imageUrl :string = "";

  Arr = Array;
  Math = Math
  getDiscountedPrice(product:any){
    const totalValue = product.price * ( (100 - product.discountPercentage ) / 100)
    return totalValue.toFixed(2) // wuth this we can decide how many decimal we want to show
  }
  
  getRating(index: number): boolean {
    
      return index < Math.round(this.product.rating);
  }

}
