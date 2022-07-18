import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = 'assets/config.json';
  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get(this.configUrl)
    .toPromise()
    .then(config => {
      this.appConfig = config;
    });
  }

  get apiBaseUrl() {
    return this.appConfig.apiBaseURL;
  }
}
