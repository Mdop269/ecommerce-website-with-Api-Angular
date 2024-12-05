import { Pipe, PipeTransform } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(allProducts: any[], searchText: string): any[] {
    if(!allProducts) return [];
    if(!searchText) return allProducts;
    searchText = searchText.toLowerCase();
    return allProducts.filter( it => {
          return it.title.toLowerCase().includes(searchText) || it.category.toLowerCase().includes(searchText);
        });
      }

} 
