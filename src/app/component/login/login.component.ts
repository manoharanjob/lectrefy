import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../../service/login.service';
import { StaticDataConst } from 'src/app/constant/staticdata.constant';
import { User } from 'src/app/model/user';
import { LocalStorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loading = false;
  submitted:boolean =false;
  error = '';
  message: string;
  
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    //  private route: ActivatedRoute,
      private loginService: LoginService,
      private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required], [Validators.email]],
      password: ['', [Validators.required]]
    });

    // this.loginForm.valueChanges.subscribe(console.log);

    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.f.username.value, this.f.password.value);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return false;
    }

    this.loading = true;
    this.loginService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("login", data);
          if(data){
            StaticDataConst.setUser(data);
            this.localStorageService.setUser(data);
            this.router.navigate(["/home"], { queryParams: data, skipLocationChange: true});
          } else {
            console.log("Error Or Invalid");
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }      
  
}
  