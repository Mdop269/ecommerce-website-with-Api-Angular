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
import { LocalstorageService } from '../service/localstorage.service';
import { ApiToLocalstorageService } from '../service/api-to-localstorage.service';
import { NavbarComponent } from "../navbar/navbar.component";

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
  responsiveOptions: any[] | undefined;
  allProducts : any[] = []
  constructor(private ApiDataService: ApiDataService, private LocalstorageService: LocalstorageService, private ApiToLocalstorageService : ApiToLocalstorageService){ }

  ngOnInit() : void{
    // we are getting all product to change the value of stocks
    this.ApiToLocalstorageService.allProduct$.subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        this.allProducts = Object.values(data);
      } else {
        console.error('Data is not an object');
      }
      
    });

    // for the click product to be shown
    this.ApiToLocalstorageService.productDetails$.subscribe(data => 
      this.productDetails = data
    ),

    //  to suggest the product below 
    this.ApiDataService.product$.subscribe((data) => {
      if (data !=null){
        this.products = Object.values(data)[0] as any // in this we have to provide the type or it wont work
      }
    });
    
    // size resolution
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

  calculateVolume(dimensions : any) {
    return (dimensions.width * dimensions.height * dimensions.depth).toFixed(2);
  }

  // dont know primeng Function
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
  
  // whenever we click on new product details it will show this 
  productDetail(product:any){
    this.ApiToLocalstorageService.productDetail(product)
  }

  // whenever there is add to cart button clicked 
  addToCartButtonClicked(productDetails : any){
    // we are sending the data To the Service 
    this.LocalstorageService.addToCartButtonClicked(productDetails)
    //  if the stock is greater then we can perform cahnge the value of stock in localstorage
    if (productDetails.stock >= 1) {
      // it will find the same id of the product from the detail to whole array
    const existingProduct = this.allProducts.find(item => item.id === productDetails.id);     
      if (existingProduct) {
        existingProduct.stock -= 1;
        // then we saving that copy to the localStorage 
        this.ApiToLocalstorageService.saveAllProducts([...this.allProducts]); // Save a copy
      }
    }
  }
}
