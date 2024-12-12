import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag'
import { FormsModule } from '@angular/forms';
import { ApiToLocalstorageService } from '../../service/api-to-localstorage.service';

@Component({
  selector: 'app-product',
  imports: [
    MatCardModule,
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    TagModule,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // we are getting the data from the parent component 
  @Input() product: any;

  // with constructor we are calling the service and storing it in the var 
  constructor(private ApiToLocalstorageService : ApiToLocalstorageService){}


  getDiscountedPrice(product:any){
    const totalValue = product.price * ( (100 - product.discountPercentage ) / 100)
    return totalValue.toFixed(2) // with this we can decide how many decimal we want to show
  }
  
  getRating(index: number): boolean {
    // with this it will check the index is it less then a rating then it is true or false
      return index < Math.round(this.product.rating);
  }

  // so whenever someone click on the product this function will pass the particular data which got clicked to the service 
  productDetail(product:any){
    this.ApiToLocalstorageService.productDetail(product)
  }
  
  // not really sure it is PrimeNg function 
  getSeverity(status: string) {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'danger';
      default:
        return 'info';
    }
  }
}
