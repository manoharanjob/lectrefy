import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StaticDataConst } from '../constant/staticdata.constant';
import { ContentApi } from '../constant/restapi.constant';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpClient: HttpClient) { }
  
  getContents(userId) {    
    return this.httpClient.get(ContentApi.getContents + userId, StaticDataConst.getHeader());
  }

  getContent() {
    return this.httpClient.get(ContentApi.getContent, StaticDataConst.getHeader());
  }

  addContent(body) {
    return this.httpClient.post(ContentApi.addContent, body, StaticDataConst.getHeader());
  }

  updateContent(body) {
    return this.httpClient.put(ContentApi.updateContent, body, StaticDataConst.getHeader());
  }
  
  deleteContent(body) {
    return this.httpClient.put(ContentApi.deleteContent, body, StaticDataConst.getHeader());
  }

  postImageFile(formdata: any) {
    return this.httpClient.post(ContentApi.imageUpload, formdata);
  }

  getCategories(){
    return this.httpClient.get(ContentApi.getCategories, StaticDataConst.getHeader());
  }

  getSubCategories(category){
    return this.httpClient.get(ContentApi.getSubCategories+category, StaticDataConst.getHeader());
  }

}
