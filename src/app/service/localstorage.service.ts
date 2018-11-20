import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
 
  user:User;
  arrayStore:any;

  setUser(value){
    this.user = value;
  }

  getUser(){
    return this.user;
  }

  getUserId() {
    return this.user ? this.user.userId : null;
  }

  getUserRole() {
    return this.user ? this.user.role : null;
  }

  setItem(key:any, value:any) {
    this.arrayStore[key] = value;
  }

  getItem(key:any) {
    return this.arrayStore ? this.arrayStore[key] : null;
  }

  removeItem(key:any) {
    this.arrayStore[key] = null;
  }

}
