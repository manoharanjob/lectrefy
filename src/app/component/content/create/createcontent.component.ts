import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ContentService } from '../../../service/content.service';
import { StaticDataConst } from 'src/app/constant/staticdata.constant';
import { Content } from 'src/app/model/content';

@Component({
  selector: 'app-createcontent',
  templateUrl: './createcontent.component.html',
  styleUrls: ['./createcontent.component.css']
})
export class CreateContentComponent implements OnInit {
  
  contentForm:FormGroup;
  categories:any;
  subCategories:any;
  submitted = false;
  imageViewCategory = false;
  contentId = '';

  constructor(private fb: FormBuilder, public router:Router, public toastr: ToastrManager, private contentService: ContentService) {
    this.imageViewCategory = true;
  }

  ngOnInit() {
    this.contentService.getCategories().subscribe((data:any) => {
      console.log("cat");
      console.log(data);
      this.categories = data;
    });
    this.contentForm=this.fb.group({
      title:['',[Validators.required]],
      uploaderBrand:'',
      digitalAgency:'',
      contentLength: ['',  [Validators.required, Validators.max(3600)]]
    });
  }

  getSubCategories(category) {
    this.contentService.getSubCategories(category).subscribe((data:any) => {
      console.log("subcat");
      console.log(data);
      this.subCategories = data;
    });
  }

  onSubmit() {
    if (this.contentForm.invalid) {
      this.toastr.errorToastr('Your Values are invalid.', 'Enter Valid data!');
      return false;
    }

    this.contentService.addContent(this.buildNewConent()).subscribe((data:any) => {
      if(data){
        this.submitted = true;
        this.contentId = data.contentId;
        this.imageViewCategory = true;
      }
    });
  }

  buildNewConent() {
    let content = new Content();
    content.description = null,
    content.dateCreated = new Date(),
    content.dateDeleted = null,
    content.userId = StaticDataConst.getUserId(),
    content.contentType = null,
    content.contentRating = null,
    content.contentAddedBy = StaticDataConst.getUserId(),
    content.contentLength = this.contentForm.controls.contentLength.value,
    content.categoryList = null,
    content.title = this.contentForm.controls.title.value,
    content.digitalAgency = this.contentForm.controls.digitalAgency.value,
    content.contentRepositoryLink = null,
    content.contentStatus = 1,
    content.deletedUserId = StaticDataConst.getUserId(),
    content.deletedDate = null
      return content;
  }
}
