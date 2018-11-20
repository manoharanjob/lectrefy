import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventory } from '../../../model/inventory';
import { Campaign } from '../../../model/campaign';
import { InventoryService } from '../../../service/inventory.service';
import { StaticDataConst } from '../../../constant/staticdata.constant';
import { LocalStorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-mapcampaign',
  templateUrl: './mapcampaign.component.html',
  styleUrls: ['./mapcampaign.component.css']
})
export class MapCampaignComponent implements OnInit {

  mapCampaign:FormGroup;
  inventory: Inventory;
  campaigns:Campaign[];
  // startDate: string;

  constructor(private fb: FormBuilder,
    public router:Router,
    private activatedroute:ActivatedRoute,
    private inventoryService:  InventoryService,
    private localStorage: LocalStorageService) { 
    
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((params: Inventory) => {
      console.log("params");
      console.log(params);
      this.inventory = params;
      // this.startDate = [this.inventory.spotDate.slice(0, 4), "-", this.inventory.spotDate.slice(4, 6), "-", this.inventory.spotDate.slice(6, 8)].join('');
      
      this.inventoryService.getCampaigns(this.inventory.userId).subscribe((data:Campaign[]) => {
        this.campaigns = data;
      });
    });

    this.mapCampaign=this.fb.group({
      campaign:'',
      slotCell:'',
      displayOrder:''
    });
  }

  get campaign() { 
    return this.mapCampaign.controls;
  }

  getSlotCell() {
    return StaticDataConst.getSlotCell();
  }    

  onSubmit() {
    const newCampaign = {
      // "title": "",
      // "bookedTimeUserId": this.inventory.userId,
      "mappedUserId": this.inventory.userId,
      // "bookedTimeSpotDate": startDate.replace(/-/g, ""),
      "mappedDate": null,
      // "bookedTimeSpotHour": startTime.replace(/:/g, ""),
      // "bookedTimeSpotHour": this.inventory.spotHour,
      // "bookedTimeUserBroker": this.inventory.userBroker,
      // "bookedTimeAdSpace": this.inventory.adSpace,
      "startSlotCell": this.campaign.slotCell.value,
      "campaignDisplayOrder": this.campaign.displayOrder.value,
      "campaignId": 2,//this.campaign.campaign.value,
      "bookedTimeId": this.inventory.bookedTimeId
      // "contentUserId": 1
    }
    console.log(newCampaign);
    this.inventoryService.mapCampaign(newCampaign).subscribe(data => {
      console.log("new mapping");
      console.log(data);
      this.router.navigate(['/inventory/listcampaign'], { queryParams: this.inventory, skipLocationChange: true});
    });
  }
}
