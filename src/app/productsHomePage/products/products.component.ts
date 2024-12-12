import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../../service/api-data.service';
import { ProductComponent } from "../product/product.component";
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'
import { FilterPipe } from "../../pipe/filter.pipe";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductComponent,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: any[] = [];
  limit: number = 10;
  skip: number = 0;
  totalProducts = 0;
  pageSizes = [5, 10, 15, 20];

  @ViewChild(MatOption, { static: false }) matOption!: MatOption;

  constructor(private ApiDataService: ApiDataService) { }

  ngOnInit(): void {
    // we are getting the product from the service through the Behaviour Subject 
    this.ApiDataService.product$.subscribe((data) => {
      if (data != null) {
        // we have to write this as the data is inside one more array and with any we are giving the datatype 
        this.products = Object.values(data)[0] as any;
        // in the second property there is total product which we are passing in to the var 
        this.totalProducts = Object.values(data)[1] as any;
      }
    });
  }

  searchClose() {
// whenever the reset button is click the old value has been passed through 
    this.limit = 10;
    this.skip = 0
    // in setselected value functio the api fetching will work and as we are resetting we have to passs the parametere
    this.ApiDataService.setSelectedValue('https://dummyjson.com/products');
  }

  // Pagination logic
  nextPage(): void {
    // in this we are checking skip and limit total is less then the actual total if yes then only it should work  
    if (this.skip + this.limit < this.totalProducts) {
      // as because we are changing to then next page so the current skip will be added to the 10 and the limit will be the same as we are displaing limited product 
      this.skip += this.limit;
      // in the below function we are passing the limit and skip with which we will pass to the service 
      this.ApiDataService.setLimitAndSkip(this.limit, this.skip);
    }
  }

  prevPage(): void {
    // if the  skip is greater then 0 then only it should work 
    if (this.skip > 0) {
      // in this as we are going behind we will minus from the this.limit 
      this.skip -= this.limit;
      this.ApiDataService.setLimitAndSkip(this.limit, this.skip);
    }
  }

  // Update the limit and reset skip (go back to the first page when the page size is changed)
  onPageSizeChange(newLimit: any): void {
    this.limit = Number(newLimit); // need to convert this dont know how ngmodel works but it making this a string 
    this.skip = 0; // Reset to the first page
    this.ApiDataService.setLimitAndSkip(this.limit, this.skip);
  }

  // Calculate the current page range (e.g., 1-10)
  getCurrentPageRange(): string {
    const start = this.skip + 1; // Start from 1 (not 0)
    const end = Math.min(this.skip + this.limit, this.totalProducts); // Ensure the end doesn't exceed total products
    return `${start}-${end}`;
  }

  // Calculate the total number of pages
  getTotalPages(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }

  // Get the current page number
  getCurrentPageNumber(): number {
    return Math.floor(this.skip / this.limit) + 1;
  }

}
