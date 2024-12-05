import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelectModule} from '@angular/material/select';
import { ApiDataService } from '../service/api-data.service';
import {MatInputModule} from '@angular/material/input';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FilterPipe } from "../pipe/filter.pipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatOption,
    MatSelectModule,
    MatInputModule,
    MatToolbar,
    MatToolbarRow,
    MatAutocompleteModule,
    FilterPipe,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  categories: any = [];
  searchText : string = '';
  allProducts: any[] = [];
  products: any[] = [];


  constructor(private ApiDataService: ApiDataService) { 
    this.onSearch()
  }
  

  ngOnInit(): void {
    this.ApiDataService.dataForCategory().subscribe(data => this.categories = data);

    this.ApiDataService.product$.subscribe((data) => {
      if (data != null) {
        this.products = Object.values(data)[0] as any;
      }
    });

    this.ApiDataService.dataForAllProduct().subscribe((data) => {
      if (data != null) {
        this.allProducts = Object.values(data)[0];
      }
    });
  }

  onSelectionChange(event: any): void {
    this.ApiDataService.setSelectedValue(event.value);
  }
  onSearch(){
    this.ApiDataService.onSearch(this.searchText)
  }

  
  productDetail(product:any){
    this.ApiDataService.productDetail(product)
  }


}
