import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../service/api-data.service';
import { ProductComponent } from "../product/product.component";
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule }from '@angular/flex-layout';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgModel  } from '@angular/forms';
import {MatListModule} from '@angular/material/list'
import { FilterPipe } from "../pipe/filter.pipe"; 
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductComponent,
    MatCardModule,
    FlexLayoutModule,
    MatToolbar,
    MatIconModule,
    MatToolbarRow,
    FormsModule,
    MatListModule,
    FilterPipe,
    MatToolbarModule,
    MatFormFieldModule
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private ApiDataService: ApiDataService){}

  ngOnInit() : void{
    this.ApiDataService.dataForProducts().subscribe((data) => 
      {
        // console.log(data)
        this.products = Object.values(data)[0] // with this we can get only the main data 

      }  )  
  }
  
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';

  toggleSearch: boolean = false;

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
 

}
