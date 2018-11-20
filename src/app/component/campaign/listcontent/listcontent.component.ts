import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Content } from '../../../model/content';
import { Campaign } from '../../../model/campaign';
import { CampaignService } from '../../../service/campaign.service';

@Component({
  selector: 'app-listcontent',
  templateUrl: './listcontent.component.html',
  styleUrls: ['./listcontent.component.css']
})
export class ListContentComponent implements OnInit {

  displayedColumns: string[] = ['title', 'uploaderBrand', 'dateCreated'];
  dataSource: MatTableDataSource<Content>;
  campaign: Campaign;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public router:Router, private activatedroute:ActivatedRoute, private campaignService: CampaignService) { 
    
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((params: Campaign) => {
      console.log("params", params);
      this.campaign = params;
      this.getMappedContents();
    });
  } 
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mapContent(){
    this.router.navigate(['/campaign/mapcontent'], { queryParams: this.campaign, skipLocationChange: true});
  }

  getMappedContents(){
    // let params = "userId="+this.campaign.userId+"&campaignId="+this.campaign.campaignId;
    // let params = "bookedTimeId="this.campaign.;
    this.campaignService.getMappedContents(this.campaign.campaignId).subscribe((data:any) => {
      console.log("contents", data);
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

  deleteContent(content: Content) {
    let params = "";
    this.campaignService.deleteContent(params).subscribe((data:any) => {
      console.log("content deleted");
      console.log(data);
       
    });
  }
}
