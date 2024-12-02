import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  urlForProduct : string = "https://dummyjson.com/products/search?q=phone" 
  selectedValue : string = 'products'

  private product = new BehaviorSubject<any | null>(null);
  get product$(): Observable<string | null> {
    return this.product.asObservable(); 
  }

  constructor(private http:HttpClient) {
    this.fetchProductData()
   }

  // in this function we are getting the launches data and sending this data  to the component 
  dataForProducts()
  {
    const url = `https://dummyjson.com/${this.selectedValue}`;
    console.log(this.http.get(url))
    return this.http.get(url);
  }

  fetchProductData() {
    const url = `https://dummyjson.com/${this.selectedValue}`;
    this.http.get(url).pipe(
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
}
