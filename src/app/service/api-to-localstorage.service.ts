import { Injectable, OnInit } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiToLocalstorageService{
  allProducts: any[] = [];

  private productDetails = new BehaviorSubject<any | null>(null);
  get productDetails$(): Observable<string | null> {
    return this.productDetails.asObservable(); 
  }

  private allProduct = new BehaviorSubject<any | null>(null);
  get allProduct$(): Observable<string | null> {
    return this.allProduct.asObservable(); 
  }

  
  constructor(private ApiDataService: ApiDataService) {
    // Load cart from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCarts = localStorage.getItem('allProducts');
      if (savedCarts) {
        this.allProducts = JSON.parse(savedCarts);
        this.allProduct.next(this.allProducts); 
      }
    }

    // if the data gets removed we can call api and update the localstorage
    // this.ApiDataService.dataForAllProduct().subscribe((data) => {
    //   if (data != null) {
    //     this.allProducts = Object.values(data)[0];
    //     this.addingAllProductToStorage()
    //   }
    // })
   }


  addingAllProductToStorage(){
    // Load cart from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('allProducts', JSON.stringify(this.allProducts))
    }
  }

  productDetail(product:any){
    
    const existingProduct = this.allProducts.find(item => item.id === product.id);
    // console.log(this.allProducts)
    // console.log(existingProduct)
    this.productDetails.next(existingProduct)
  }

  saveAllProducts(updatedProducts: any[]) {
  if (typeof window !== 'undefined' && window.localStorage) {
      this.allProducts = updatedProducts; 
      localStorage.setItem('allProducts', JSON.stringify(updatedProducts));
      this.allProduct.next(this.allProducts); 
    }
  }

}
