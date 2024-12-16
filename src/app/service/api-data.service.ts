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
  skip : number = 0;

  // this is a behaviour subject in which whenever something change it gets here and whichever we will subscribe it will provide him instantly
  // product will be used if the User Changes the total number of product to be shown
  private product = new BehaviorSubject<any | null>(null);
  // observable is nothing but checking if something is changed or not with observable we cant send the data with next but we can subscribe the data 
  get product$(): Observable<string | null> {
    return this.product.asObservable(); 
  }

// if we want to send the user search to any other component we can do with this thing 

  // private newSearch = new BehaviorSubject<string>("");
  // get newSearch$(): Observable<string> {
  //   return this.newSearch.asObservable(); 
  // }
  
  // with this it will fetch the product whenever the site load and will send to the subscriber 
  constructor(private http:HttpClient) {
    this.fetchProductData()
  }

  // in this function we are getting the catergory data and sending this data  to the component 
  dataForCategory()
  {
    return this.http.get(this.urlForCategory);
  }

  // fetching all the product and we will use this in api-to-lovalstorage service 
  dataForAllProduct()
  {
    return this.http.get('https://dummyjson.com/products?limit=500');
  }

  // in this it will changes the limit and skip and it will send to its subscriber 
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

  // 
  setSelectedValue(CategoryValue : any){
    // we are using this because if the user go to next page so it will add skip value to the current skip then it wont show the product because it will skip
    this.limit = 10
    this.skip = 0
    // we are stroing the same to value to the selected value so when we call fetch product data it will run that api link only 
    this.selectedValue = CategoryValue;
    this.fetchProductData()
  }

  setLimitAndSkip(limit : number , skip : number){
    // in this function we are recieving limit and skip 
    this.limit = limit ;
    this.skip = skip ;
    this.fetchProductData()
  }

// this is optionaal if you want to send data to somewhere else 
  // onSearch(newText : string){
  //   this.newSearch.next(newText)
  // }

}
