import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ContentService } from '../../../../service/content.service';

@Component({
  selector: 'app-imagecontent',
  templateUrl: './imagecontent.component.html',
  styleUrls: ['./imagecontent.component.css']
})
export class ImagecontentComponent implements OnInit {

  @Input() contentId:string;
  imagePath:string;
  imageUploaded:boolean;
  noneVisible = false;
  _5050Visible = false;
  _6040Visible = false;
  _4060Visible = false;
  _333Visible = false;

  constructor(private fileUploader: ContentService, private elem: ElementRef, public toastr: ToastrManager) { }

  ngOnInit() {
  }

  noneBlock() {
    this.noneVisible = true;
    this._5050Visible = false;
    this._6040Visible = false;
    this._4060Visible = false;
    this._333Visible = false;
  }

  _5050Block() {
    this.noneVisible = false;
    this._5050Visible = true;
    this._6040Visible = false;
    this._4060Visible = false;
    this._333Visible = false;
  }

  _6040Block() {
    this.noneVisible = false;
    this._5050Visible = false;
    this._6040Visible = true;
    this._4060Visible = false;
    this._333Visible = false;
  }

  _4060Block() {
    this.noneVisible = false;
    this._5050Visible = false;
    this._6040Visible = false;
    this._4060Visible = true;
    this._333Visible = false;
  }

  _333333Block() {
    this.noneVisible = false;
    this._5050Visible = false;
    this._6040Visible = false;
    this._4060Visible = false;
    this._333Visible = true;
  }

  setImagePath(imagePath:any) {
    console.log("path:"+imagePath);
    this.imageUploaded = true;
    this.imagePath = imagePath;
  }

  onSelected() {
    let files = this.elem.nativeElement.querySelector('#selectFile').files;
    let nameFormat = this.elem.nativeElement.querySelector('#nameFormat').value;

    let formdata = new FormData();
    let file = files[0];
    let nameOf = this.contentId + nameFormat;
    console.log("cdfid", nameOf)
    formdata.append('file', file, file.name);
    // formdata.append('name', nameOf);
    formdata.append('name', this.contentId);
    this.fileUploader.postImageFile(formdata).subscribe((res:any) => {
      console.log(res);
      if(res) {
        this.toastr.successToastr('Image Uploaded Successfully.', 'Image Status!');
      } else {
        this.toastr.errorToastr(' Not Uploaded .', 'Image Error!');        
      }
    });
  }

}
