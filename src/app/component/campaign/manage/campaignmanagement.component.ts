import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Campaign } from '../../../model/campaign';
import { CampaignService } from '../../../service/campaign.service';
import { StaticDataConst } from 'src/app/constant/staticdata.constant';

export interface UserData {
  title: string;
  uploaderBrand: string;
  digitalAgency: number;
  campaignStatus:string;
  description:string;
}

@Component({
  selector: 'app-campaignmanagement',
  templateUrl: './campaignmanagement.component.html',
  styleUrls: ['./campaignmanagement.component.css']
})  
export class CampaignManagementComponent implements OnInit {
  
  displayedColumns: string[] = ['title', 'uploaderBrand', 'digitalAgency', 'campaignStatus', 'description', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  campaignItems: Campaign[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public router:Router, private  campaignService:  CampaignService) {
  }
  
  ngOnInit() {
    this.getCampaigns(StaticDataConst.getUserId());
  } 
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createCampaign(){
    this.router.navigate(['/campaign/create'], { queryParams: {mode: 'create'}, skipLocationChange: true});
  }

  clickCampaign(campaign:Campaign) {
    this.router.navigate(['/campaign/listcontent'], { queryParams: campaign, skipLocationChange: true});
  }

  getCampaigns(userId){
    this.campaignService.getCampaigns(userId).subscribe((data:any) => {
      console.log("camplist", data);          
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

  editCampaign(campaign: Campaign) {
    campaign["mode"] = "edit";
    this.router.navigate(['/campaign/create'], { queryParams: campaign, skipLocationChange: true});
  }

  deleteCampaign(campaign: Campaign) {
    let params = {
        status: 0,
        campaignStatus: 0
    }
    this.campaignService.deleteCampaign(campaign.campaignId, params).subscribe((data:any) => {
      console.log("campaign deleted");
      console.log(data);
    });
  }

}
