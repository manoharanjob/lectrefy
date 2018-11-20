import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cdateformat'
})
export class CustomDateFormatPipe implements PipeTransform {
  
  transform(value: string): string {
    let dateStr = value.toString();
    return [dateStr.slice(0, 4), "-", dateStr.slice(4, 6), "-", dateStr.slice(6, 8)].join('');
  }
}