import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormattedPrice'
})
export class FormattedPricePipe implements PipeTransform {

  transform(value: number): string {
    let format =value.toFixed(2);
    format=format.replace('.',',');
    format += "$";

    return format;
  }

}
