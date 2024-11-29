import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../service/api-data.service';
import { ProductComponent } from "../product/product.component";
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule }from '@angular/flex-layout'

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductComponent,
    MatCardModule,
    FlexLayoutModule
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = [];
  productArray: any[] = [];

  constructor(private ApiDataService: ApiDataService){}

  ngOnInit() : void{
    this.ApiDataService.dataForProducts().subscribe((data) => 
      {
        // console.log(data)
        this.products = Object.values(data)[0] // with this we can get only the main data 

      }  )

  }
 

}
