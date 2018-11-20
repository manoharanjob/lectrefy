import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusdesc'
})
export class StatusDescriptionPipe implements PipeTransform {
  
  transform(value: any): string {
    if(value == "1" || value == 1)
      return "Active";
    else
      return "InActive";
  }
}