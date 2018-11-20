import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InventoryApi } from '../constant/restapi.constant';
import { StaticDataConst } from '../constant/staticdata.constant';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
 
  constructor(private httpClient: HttpClient) { }

  getInventories(params) {    
    return this.httpClient.get(InventoryApi.getInventories + params, StaticDataConst.getHeader());
  }

  getCampaigns(userId) {
    return this.httpClient.get(InventoryApi.getCampaigns + userId, StaticDataConst.getHeader());
  }

  getMappedCampaigns(bookedTimeId) {
    return this.httpClient.get(InventoryApi.getMappedCampaigns + bookedTimeId, StaticDataConst.getHeader());
  }

  mapCampaign(body){
    return this.httpClient.post(InventoryApi.mapCampaign, body, StaticDataConst.getHeader());
  }

}
