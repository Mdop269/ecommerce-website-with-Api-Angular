import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  urlForCategory : string = "https://dummyjson.com/products/categories" 
  selectedValue : any = "https://dummyjson.com/products" ;
  limit : number = 10;
  skip : number = 0

  private product = new BehaviorSubject<any | null>(null);
  get product$(): Observable<string | null> {
    return this.product.asObservable(); 
  }

  private productDetails = new BehaviorSubject<any | null>(null);
  get productDetails$(): Observable<string | null> {
    return this.productDetails.asObservable(); 
  }

  constructor(private http:HttpClient) {
    this.fetchProductData()
   }

  // in this function we are getting the launches data and sending this data  to the component 
  dataForCategory()
  {
    return this.http.get(this.urlForCategory);
  }

  fetchProductData() {
    const url = this.selectedValue;
    const limit = this.limit
    const skip = this.skip
    this.http.get<any>(`${url}?limit=${limit}&skip=${skip}`).pipe(
      catchError(error => {
        console.error('Error fetching the data', error);
        return [null];  // Return null in case of error
      })
    ).subscribe(data => {
      this.product.next(data);  // Store the fetched data in the subject
    });
  }
  
  setSelectedValue(CategoryValue : any){
    this.selectedValue = CategoryValue;
    this.fetchProductData()
  }

  setLimitAndSkip(limit : number , skip : number){
    this.limit = limit ;
    this.skip = skip ;
    console.log(this.skip,this.limit)
    this.fetchProductData()
  }

  productDetail(product:any){
    this.productDetails.next(product)
  }
}
