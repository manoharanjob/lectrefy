import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaticDataConst } from '../constant/staticdata.constant';
import { CampaignApi } from '../constant/restapi.constant';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
 
  constructor(private httpClient: HttpClient) { }

  getCampaigns(userId) {    
    return this.httpClient.get(CampaignApi.getCampaigns+userId, StaticDataConst.getHeader());
  }

  createCampaign(body){
    return this.httpClient.post(CampaignApi.addCampaign, body, StaticDataConst.getHeader());
  }

  updateCampaign(campaignId, body) {
    return this.httpClient.put(CampaignApi.updateCampaign + campaignId, body, StaticDataConst.getHeader());
  }
   
  deleteCampaign(id, body) {
    return this.httpClient.put(CampaignApi.deleteCampaign+id, body, StaticDataConst.getHeader());
  }

  getContents(userId) {
    return this.httpClient.get(CampaignApi.getContents + userId, StaticDataConst.getHeader());
  }

  getMappedContents(campaignId) {
    return this.httpClient.get(CampaignApi.getMappedContents + campaignId, StaticDataConst.getHeader());
  }

  mapContent(body){
    return this.httpClient.post(CampaignApi.mapContent, body, StaticDataConst.getHeader());
  }

  deleteContent(body){
    return this.httpClient.post(CampaignApi.deleteContent, body, StaticDataConst.getHeader());
  }

  getMediaTypes(){
    return this.httpClient.get(CampaignApi.getMediaTypes, StaticDataConst.getHeader());
  }

  getBrands(){
    return this.httpClient.get(CampaignApi.getBrands, StaticDataConst.getHeader());
  }

  getSubBrands(brand){
    return this.httpClient.get(CampaignApi.getSubBrands+brand, StaticDataConst.getHeader());
  }

  getCategories(){
    return this.httpClient.get(CampaignApi.getCategories, StaticDataConst.getHeader());
  }
}
