import { Component, ViewChild } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import {MatButtonModule} from '@angular/material/button';
import { TagModule } from 'primeng/tag'
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FilterPipe } from "../pipe/filter.pipe"; 

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    NgbCarouselModule,
    CarouselModule,
    MatButtonModule,
    TagModule,
    FormsModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails : any;
  products: any[] = [];
  searchText : string = ''
  responsiveOptions: any[] | undefined;

  constructor(private ApiDataService: ApiDataService){ }

  ngOnInit() : void{
    this.ApiDataService.newSearch$.subscribe(text => {
      if(text != null){
        this.searchText = text
      }
      }),
    this.ApiDataService.productDetails$.subscribe(data => this.productDetails = data),
    this.ApiDataService.product$.subscribe((data) => {
      if (data !=null){
        this.products = Object.values(data)[0] as any // in this we have to provide the type or it wont work
      }
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  addToCart(){

  }
  calculateVolume(dimensions : any) {
    return (dimensions.width * dimensions.height * dimensions.depth).toFixed(2);
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
  
  productDetail(product:any){
    this.ApiDataService.productDetail(product)
  }
}
