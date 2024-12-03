import { Component } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'primeng/carousel';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    NgbCarouselModule,
    CarouselModule,
    MatButtonModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails : any;

  constructor(private ApiDataService: ApiDataService){ }
  ngOnInit(){
    this.ApiDataService.productDetails$.subscribe(data => this.productDetails = data)
  }
  addToCart(){

  }
  calculateVolume(dimensions : any) {
    return (dimensions.width * dimensions.height * dimensions.depth).toFixed(2);
  }
}
