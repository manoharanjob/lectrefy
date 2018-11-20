import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:User;

  constructor(private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((params: User) => {
      console.log("user", params);
      this.user = params;
    });
  }

}
