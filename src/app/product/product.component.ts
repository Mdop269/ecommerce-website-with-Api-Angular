import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-product',
  imports: [
    MatCardModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product: any;
  imageUrl :string = "";
  
  // ngOnInit() {
  //  this.imageUrl = this.product?.imageUrls[0] ?? '';
  // }
}
