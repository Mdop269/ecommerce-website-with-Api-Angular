import { Component } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails : any;

  constructor(private ApiDataService: ApiDataService){ }
  ngOnInit(){
    this.ApiDataService.productDetails$.subscribe(data => this.productDetails = data)
  }
}
