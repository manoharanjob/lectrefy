import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Campaign } from '../../../model/campaign';
import { Content } from '../../../model/content';
import { CampaignService } from '../../../service/campaign.service';

@Component({
  selector: 'app-mapcontent',
  templateUrl: './mapcontent.component.html',
  styleUrls: ['./mapcontent.component.css']
})
export class MapContentComponent implements OnInit {

  mapContent: FormGroup;
  campaign: Campaign;
  contents: Content[];
  content: Content;

  constructor(private fb: FormBuilder,public router:Router, private activatedroute:ActivatedRoute, private campaignService: CampaignService) { 
    
  }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe((params: Campaign) => {
      console.log("params");
      console.log(params);
      this.campaign = params;
      // let parameters = "userId="+this.campaign.userId+"&campaignId="+this.campaign.campaignId;
      this.campaignService.getContents(this.campaign.userId).subscribe((data:any) => {
        console.log("contents");
        console.log(data);
        this.contents = data;
      });
    });

    this.mapContent=this.fb.group({
      content:''
    });
  }

  get contentForm() { 
    return this.mapContent.controls;
  }

  setContent(contentId) {
    for (let i = 0; i < this.contents.length; i++) {
      if(this.contents[i].contentId == contentId)
          this.content = this.contents[i];
    }
  }

  onSubmit() {
    console.log(this.content);
    const newContent = {
      "contentId": this.contentForm.content.value,
      // "title": this.content.title,
      // "userId": this.campaign.userId,
      // "deletedUserId": this.campaign.userId,
      "campaignId": this.campaign.campaignId
      // "campaignUserId": this.campaign.userId
    }
    console.log(newContent);
    this.campaignService.mapContent(newContent).subscribe(data => {
      console.log("new content");
      console.log(data);
      this.router.navigate(['/campaign/listcontent'], { queryParams: this.campaign, skipLocationChange: true});
    });
  }
}
