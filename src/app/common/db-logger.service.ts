import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Constants } from '../helper/constants';
import { LogViewModel } from '../models/logViewModel';
export let isLogEnabled = environment.isLogEnabled;


interface ILogger {
    info(message);
    warn(message);
    error(message, stackTrace);
  }


@Injectable()
export class DBLoggerService implements ILogger {

constructor(private _apiService: ApiService){}
  
error(message, stackTrace) {
    if (isLogEnabled) {
        var model = new LogViewModel();
        model.appName= Constants.APP_NAME;
        model.message = message;
        model.stackTrace = stackTrace;

        this._apiService.post(Constants.PORTAL_BASE_URL, Constants.LOG_API_URL, model).toPromise().then(data => {
            //console.log(data);
        }).catch( error => {
            console.log('Log API' + error);
        });
    }
  }

  info(message){
    if (isLogEnabled) {
        var model = new LogViewModel();
        model.appName= Constants.APP_NAME;
        model.message = message;
        model.IsError = false;

        this._apiService.post(Constants.PORTAL_BASE_URL, Constants.LOG_API_URL, model).toPromise().then(data => {
            //console.log(data);
        }).catch( error => {
            console.log('Log API' + error);
        });
    }
  }
  
  warn(message){

  }
}
