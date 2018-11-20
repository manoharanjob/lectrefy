import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginApi } from '../constant/restapi.constant';
import { StaticDataConst } from '../constant/staticdata.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    let body =  {'email': username, "password": password }
    return this.http.post(LoginApi.login, body, StaticDataConst.getHeader())
      .pipe(map(user => {
        // login successful if there's a user in the response
        if (user) {
          // store user details and basic auth credentials in local storage 
          // to keep user logged in between page refreshes
          // console.log(user.authData);
          // user.authToken = window.btoa(username + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
