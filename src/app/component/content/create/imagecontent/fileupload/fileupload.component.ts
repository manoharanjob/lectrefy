import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ContentService } from 'src/app/service/content.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Content } from 'src/app/model/content';
import { FileDetails } from 'src/app/model/filedetail';

@Component({
      selector: 'app-fileupload',
      templateUrl: './fileupload.component.html',
      styleUrls: ['./fileupload.component.css']
})
export class FileUploadComponent {
      
      // Upload button text
      @Input() label:string = "Upload";
      @Input() imageRatio:string = "";
      @Input() contentId:string = "";
      // File extension that accepted, same as 'accept' of <input type="file" />. By the default, it's set to 'image/*'
      @Input() accept = "*/*";
      /*// Name used in form which will be sent in HTTP request.
      @Input() param = 'file';
      // Target URL for file uploading.
      @Input() target = '/ExcelUtility/buildExcel';
      // Allow you to add handler after its completion. Bubble up response text from remote.
      @Output() complete = new EventEmitter<string>();
      files: Array<FileUploadModel> = [];
      */

     @Output() imagePath: EventEmitter<any> = new EventEmitter<any>();
      showProgressbar = false;
      fileUploadField;
      downloadTimer;
      
      constructor(private elem: ElementRef, private contentService: ContentService, public toastr: ToastrManager) { }
      
      ngOnInit() {
      }
      
      /*
        onClick() {
              this.fileUploadField = document.getElementById('fileUpload') as HTMLInputElement;
              this.fileUploadField.click();
        }
      
        cancelFile(file: FileUploadModel) {
              file.sub.unsubscribe();
              this.removeFileFromArray(file);
        }
      
        retryFile(file: FileUploadModel) {
              this.uploadFile(file);
              file.canRetry = false;
        }
      
        private uploadFile(file: FileUploadModel) {
              const fd = new FormData();
              fd.append(this.param, file.data);
      
              const req = new HttpRequest('POST', this.target, fd, {
                    reportProgress: true
              });
      
              file.inProgress = true;
              file.sub = this._http.request(req).pipe(
                    map(event => {
                          switch (event.type) {
                                case HttpEventType.UploadProgress:
                                      file.progress = Math.round(event.loaded * 100 / event.total);
                                      break;
                                case HttpEventType.Response:
                                      return event;
                          }
                    }),
                    tap(message => { }),
                    last(),
                    catchError((error: HttpErrorResponse) => {
                          file.inProgress = false;
                          file.canRetry = true;
                          return of(`${file.data.name} upload failed.`);
                    })
              ).subscribe(
                    (event: any) => {
                          if (typeof (event) === 'object') {
                                this.removeFileFromArray(file);
                                this.complete.emit(event.body);
                                console.log('complete');
                          }
                    }
              );
        }
      
        private uploadFiles() {
              const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
              fileUpload.value = '';
      
              this.files.forEach(file => {
                    this.uploadFile(file);
              });
        }
      
        private removeFileFromArray(file: FileUploadModel) {
              const index = this.files.indexOf(file);
              if (index > -1) {
                    this.files.splice(index, 1);
              }
        }
      */
     clickUpload() {
            sessionStorage.setItem("imageRatio", this.imageRatio);
            this.fileUploadField = document.getElementById('fileUpload') as HTMLInputElement;
            this.fileUploadField.click();
      }
      uploadFile() {
        let files = this.elem.nativeElement.querySelector('#fileUpload').files;
    
        let file = files[0];
      //   let fileName = this.contentId+"_"+sessionStorage.getItem("imageRatio");
      let fileName = this.contentId;
        console.log(file); console.log(file.name);
        let extension:string = file.name;
        extension = extension.substring(extension.lastIndexOf("."));
        let formdata = new FormData();
        formdata.append('file', file, file.name);
      //   formdata.append('name', fileName + extension);
      formdata.append('name', fileName + extension);
        this.contentService.postImageFile(formdata).subscribe((res:FileDetails) => {
          console.log(res);
          if(res) {
            this.toastr.successToastr('Image Uploaded Successfully.', 'Image Status!');
            this.imagePath.emit(res.fileDownloadUri);
            // let content = new Content();
            // content.contentId = this.contentId;
            // content.description = sessionStorage.getItem("imageRatio");
            // content.contentRepositoryLink = res.fileDownloadUri;
            // content.contentType = res.fileType;
            let content = {
                  contentId: this.contentId,
                  description: sessionStorage.getItem("imageRatio"),
                  contentRepositoryLink: res.fileDownloadUri,
                  contentType: res.fileType
            }
            this.contentService.updateContent(content).subscribe((data:any) => {
                  if(data){
                        console.log(res);
                  }
            });
          } else {
            this.toastr.errorToastr(' Not Uploaded .', 'Image Error!');        
          }
        });
      }


}