import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';
import { LocalStorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.css']
})
export class HeadderComponent implements OnInit {

  user:User;

  constructor(private localStorageService: LocalStorageService) {
    
  }

  ngOnInit() {
    this.user = this.localStorageService.getUser();
  }

}
