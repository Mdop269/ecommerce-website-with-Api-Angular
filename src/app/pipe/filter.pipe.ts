import { Pipe, PipeTransform } from '@angular/core';
import { ApiDataService } from '../service/api-data.service';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(products: any[], searchText: string): any[] {
    if(!products) return [];
    if(!searchText) return products;
searchText = searchText.toLowerCase();
return products.filter( it => {
      return it.title.toLowerCase().includes(searchText) || it.category.toLowerCase().includes(searchText);
    });
   }

}
