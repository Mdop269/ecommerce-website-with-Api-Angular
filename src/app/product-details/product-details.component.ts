import { Component, ViewChild } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import {MatButtonModule} from '@angular/material/button';
import { TagModule } from 'primeng/tag'
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    NgbCarouselModule,
    CarouselModule,
    MatButtonModule,
    TagModule,
    FormsModule,
    NgbCarousel,
    
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails : any;
  products: any[] = [];
  responsiveOptions: any[] | undefined;

  paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;


  constructor(private ApiDataService: ApiDataService){ }

  ngOnInit() : void{
    this.ApiDataService.productDetails$.subscribe(data => this.productDetails = data)
    this.ApiDataService.product$.subscribe((data) => {
      if (data !=null){
        this.products = Object.values(data)[0] as any // in this we have to provide the type or it wont work
      }
    });
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
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
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return undefined;
    }
  } 
  

}
