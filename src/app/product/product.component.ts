import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiDataService } from '../service/api-data.service';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag'
import { FormsModule, NgModel  } from '@angular/forms';

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
  @Input() product: any;

  constructor(private ApiDataService: ApiDataService){

  }
  getDiscountedPrice(product:any){
    const totalValue = product.price * ( (100 - product.discountPercentage ) / 100)
    return totalValue.toFixed(2) // wuth this we can decide how many decimal we want to show
  }
  
  getRating(index: number): boolean {
    
      return index < Math.round(this.product.rating);
  }

  productDetail(product:any){
    this.ApiDataService.productDetail(product)
  }
  
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
