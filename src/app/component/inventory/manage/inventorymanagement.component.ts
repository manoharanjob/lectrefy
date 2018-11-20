import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Inventory } from '../../../model/inventory';
import { InventoryService } from '../../../service/inventory.service';
import { LocalStorageService } from '../../../service/localstorage.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-inventorymanagement',
  templateUrl: './inventorymanagement.component.html',
  styleUrls: ['./inventorymanagement.component.css']
})
export class InventoryManagementComponent implements OnInit {

  displayedColumns: string[] = ['bookedLabel', 'bookingType', 'spotDate', 'adSpace'];
  dataSource: MatTableDataSource<Inventory>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user:User;

  constructor(public router:Router,
    private activatedroute:ActivatedRoute, 
    private  inventoryService:  InventoryService,
    private  localStorage:  LocalStorageService) {
  }
  
  ngOnInit() {
    // this.activatedroute.queryParams.subscribe((params:any) => {
    //   this.userId = params['userId'];
    //   this.getAll(this.userId);
    // });
    this.user = this.localStorage.getUser();
    this.getInventories(sessionStorage.getItem("userId"));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clickInventory(inventory:Inventory){
    this.router.navigate(['/inventory/listcampaign'], { queryParams: inventory, skipLocationChange: true});
  }
  
  getInventories(userId){
    this.inventoryService.getInventories(userId).subscribe((data:any) => {
      console.log(data);          
      if(data){
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
      else{
        alert("something went wrong")
      }
    });
  }

}
