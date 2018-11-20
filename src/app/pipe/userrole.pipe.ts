import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userrole'
})
export class UserRolePipe implements PipeTransform {
  
  transform(value: any): string {
    if(value == "Super Admin")
      return "Agent Booking";
    else
      return "Broker Booking";
  }
}