import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })

@Injectable()

export class SearchService {

  constructor(private httpClient: HttpClient) { }

  parkCode: any;

  private API_KEY: string = environment.NPS_API_KEY;
  private API_URL: string = environment.NPS_BASE_URL;

  // getYosemiteCampgroundResults() {
  //   return this.httpClient.get<any>(this.API_URL + 'campgrounds?' + 'q=yosemite' + '&api_key=' + this.API_KEY);
  // }

  getLatestNewsReleases() {
    return this.httpClient.get<any>(this.API_URL + 'newsreleases?' + '&api_key=' + this.API_KEY + '&fields=images' + '&limit=5');
  }

  getNextLatestNewsReleases(nextSetNewsRelease) {
    return this.httpClient.get<any>(this.API_URL + 'newsreleases?' + '&limit=5' + '&start=' + nextSetNewsRelease + '&api_key=' + this.API_KEY + '&fields=images');
  }



  getCampgroundResults() {
    return this.httpClient.get<any>(this.API_URL + 'campgrounds?' + '&api_key=' + this.API_KEY + '&limit=5');
  }

  getCampgroundPark(parkCode) {
    return this.httpClient.get<any>(this.API_URL + 'parks?' + 'parkCode=' + parkCode + '&fields=images' + '&api_key=' + this.API_KEY + '&limit=5');
  }

  getParkResults() {
    return this.httpClient.get<any>(this.API_URL + 'parks?' + 'api_key=' + this.API_KEY + '&fields=images' + '&limit=5');
  }

  getParkName(parkCode) {
    return this.httpClient.get<any>(this.API_URL + 'parks?' + 'parkCode=' + parkCode + '&api_key=' + this.API_KEY);
  }

  getParkStepperResults(stateQuery) {
    return this.httpClient.get<any>(this.API_URL + 'parks?' + 'api_key=' + this.API_KEY + '&fields=images' + '&stateCode=' + stateQuery + '&limit=5');
  }

  searchParks(searchQuery) {
    return this.httpClient.get<any>(this.API_URL + 'parks?' + 'q=' + searchQuery + '&fields=images' + '&api_key=' + this.API_KEY);
  }
}
