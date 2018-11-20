import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Campaign } from '../../../model/campaign';
import { CampaignService } from '../../../service/campaign.service';
import { StaticDataConst } from 'src/app/constant/staticdata.constant';
import { LocalStorageService } from '../../../service/localstorage.service';

@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  
  campaignForm: FormGroup;
  campaign: Campaign;
  mediaTypes:any[];
  brands:any[];
  subBrands:any[];
  categories:any;

  constructor(public router: Router,
    private formbuilder: FormBuilder,
    private activatedroute:ActivatedRoute,
    private campignService: CampaignService,
    private localStorage: LocalStorageService) {  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((params:any) => {
      console.log("params",params);
      this.campaign = params;
      this.campignService.getMediaTypes().subscribe((data:any) => {
        console.log("media");
        console.log(data);
        this.mediaTypes = data;
      });
      this.campignService.getBrands().subscribe((data:any) => {
        console.log("brand");
        console.log(data);
        this.brands = data;
        this.setFormValues();
        if(this.brands && this.campaign["mode"] == "edit" && this.campaign.uploaderBrand) {
          this.campignService.getSubBrands(this.campaign.uploaderBrand).subscribe((data:any) => {
            console.log("subbrand");
            console.log(data);
            this.subBrands = data;
            this.setFormValues();
          });
        }
      });
      this.campignService.getCategories().subscribe((data:any) => {
        console.log("cat");
        console.log(data);
        this.categories = data;
      });
    });
    this.campaignForm = this.formbuilder.group({
      title: "",
      description: "",
      uploaderBrand: "",
      digitalAgency: "",
      categoryList: "",
      campaignLength: ""
    });
  }

  setFormValues() {
    let cam = {
      title: this.campaign.title ? this.campaign.title : "",
      description: this.campaign.description ? this.campaign.description : "",
      uploaderBrand: this.campaign.uploaderBrand ? this.campaign.uploaderBrand : "",
      digitalAgency: this.campaign.digitalAgency ? this.campaign.digitalAgency : "",
      categoryList: this.campaign.categoryList ? this.campaign.categoryList : "",
      campaignLength: this.campaign.campaignLength ? this.campaign.campaignLength : ""
    }
    console.log("cam", cam);
    this.campaignForm.setValue(cam);
  }

  getSubBrands(brand) {
    this.campignService.getSubBrands(brand).subscribe((data:any) => {
      console.log("subbrand");
      console.log(data);
      this.subBrands = data;
    });
  }

  saveCampaign() {
    if(this.campaign["mode"] == "edit") {
      let campaign = this.buildNewCampaign();
      // campaign.dateCreated = this.campaign.dateCreated,
      this.campignService.updateCampaign(this.campaign.campaignId, campaign).subscribe(data => {
        console.log(data);
        this.campignService.getCampaigns(1);
        this.router.navigateByUrl('/campaign/manage');
      });
    } else {
      this.campignService.createCampaign(this.buildNewCampaign()).subscribe(data => {
        console.log(data);
        this.campignService.getCampaigns(1);
        this.router.navigateByUrl('/campaign/manage');
      });
    }
  }

  buildNewCampaign() {
    let campaign = new Campaign();
    campaign.description = this.campaignForm.controls.description.value,
    campaign.dateCreated = new Date(),
    campaign.dateDeleted = null,
    campaign.campaignRating = null,
    campaign.campaignAddedBy = null,
    campaign.campaignLength = this.campaignForm.controls.campaignLength.value,
    campaign.userId = this.localStorage.getUserId(),
    campaign.title = this.campaignForm.controls.title.value,
    campaign.status = 1,
    campaign.uploaderBrand = null,//this.campaignForm.controls.uploaderBrand.value,
    campaign.digitalAgency = this.campaignForm.controls.digitalAgency.value,
    campaign.campaignRepositoryLink = null,
    campaign.campaignStatus = 1,
    campaign.deletedDate = null,
    campaign.categoryList = null,//this.campaignForm.controls.categoryList.value,
    campaign.contentStatus = null,
    campaign.deletedUserId = this.localStorage.getUserId()
    return campaign;
  }
}
