import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Inventory } from '../../../model/inventory';
import { InventoryService } from '../../../service/inventory.service';

export interface PrimetimeData {
  bookedTimeAdSpace: string,
  bookedTimeSpotDate: string,
  bookedTimeSpotHour: string,
  bookedTimeUserBroker: number,
  bookedTimeUserId: number,
  campaignDisplayOrder: number,
  campaignId: number,
  contentUserId: number,
  startSlotCell: number,
  title: string
}

@Component({
  selector: 'app-primetime',
  templateUrl: './primetime.component.html',
  styleUrls: ['./primetime.component.css']
})
export class PrimeTimeComponent implements OnInit {

  displayedColumns: string[] = ['title', 'hour', 'campaignDisplayOrder', 'actions'];
  dataSource: MatTableDataSource<PrimetimeData>;
  inventory: Inventory;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public router:Router, private activatedroute:ActivatedRoute, private  inventoryService:  InventoryService) { 
    
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((params: Inventory) => {
      console.log("params");
      console.log(params);
      this.inventory = params;
      this.getMappedCampaigns();
    });
  } 
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mapCampaign(){
    this.router.navigate(['/inventory/mapcampaign'], { queryParams: this.inventory, skipLocationChange: true});
  }

  getMappedCampaigns(){
    // let params = "bookedTimeUserId=1&bookedTimeSpotDate=20181108&bookedTimeSpotHour=10&bookedTimeAdSpace=sd";
    // let params = "eId=";
    this.inventoryService.getMappedCampaigns(this.inventory.bookedTimeId).subscribe((data:any) => {
      console.log("all mappings");
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
