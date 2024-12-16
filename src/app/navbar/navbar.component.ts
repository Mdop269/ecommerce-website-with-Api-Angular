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
import { Router, RouterModule } from '@angular/router';
import { ApiToLocalstorageService } from '../service/api-to-localstorage.service';
import { LocalstorageService } from '../service/localstorage.service';


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
  isAuthenticated : boolean = true 
  categories: any = [];
  searchText : string = '';
  allProducts: any[] = [];
  products: any[] = [];


  constructor(
    private ApiDataService: ApiDataService, 
    private ApiToLocalstorageService : ApiToLocalstorageService, 
    private router : Router) { 
  }
  

  ngOnInit(): void {
    this.ApiDataService.dataForCategory().subscribe(data => this.categories = data);

    this.ApiToLocalstorageService.allProduct$.subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        this.allProducts = Object.values(data);
      } else {
        console.error('Data is not an object');
      }
    });

    this.ApiDataService.product$.subscribe((data) => {
      if (data != null) {
        this.products = Object.values(data)[0] as any;
      }
    });

  }

  // if the category changes 
  onSelectionChange(event: any): void {
    // with event we will know the value there might be a different approach but i used this 
    this.ApiDataService.setSelectedValue(event.value);
  }
  
  // when someone search then this funtion will run 
  productDetail(product:any){
    this.ApiToLocalstorageService.productDetail(product)
  }

  // for logout 
  logout() {
    // if someone logout it will remove the current user from the local storage and it navigate to the login page 
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    
  }


}
