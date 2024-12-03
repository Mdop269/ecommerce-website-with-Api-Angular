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
import {MatSelectModule} from '@angular/material/select';

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
    MatFormFieldModule,
    MatSelectModule
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  selected = 'All';
  products: any[] = [];
  searchText = '';
  toggleSearch: boolean = false;

  @ViewChild('searchbar') searchbar!: ElementRef;

  constructor(private ApiDataService: ApiDataService){}

  ngOnInit() : void{
    this.ApiDataService.product$.subscribe((data) => {
      if (data !=null){
        this.products = Object.values(data)[0] as any // in this we have to provide the type or it wont work
      }
    })
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
  
  onSelectionChange(event: any): void {
    this.ApiDataService.setSelectedValue(event.value);
  }



}
