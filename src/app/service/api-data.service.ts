import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  urlForProduct : string = "https://dummyjson.com/products/search?q=phone" 

  private product = new BehaviorSubject<any | null>(null);
  get product$(): Observable<string | null> {
    return this.product.asObservable(); 
  }

  constructor(private http:HttpClient) { }

  // in this function we are getting the launches data and sending this data  to the component 
  dataForProducts()
  {
    return this.http.get(this.urlForProduct)
  }

  fetchProductData(rocketId: string) {
    this.http.get(`https://dummyjson.com/products`).pipe(
      catchError(error => {
        console.error('Error fetching rocket data', error);
        return [null];  // Return null in case of error
      })
    ).subscribe(data => {
      this.product.next([data]);  // Store the fetched data in the subject
    });
  }

  
}
