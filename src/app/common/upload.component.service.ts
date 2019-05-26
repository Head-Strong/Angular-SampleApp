import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import { Constants } from '../helper/constants';

@Injectable()
export class UploadService{
    constructor(private _apiService: ApiService){}
  
    upload(buffer: any): Observable<any>{
        return this._apiService.post(Constants.PORTAL_BASE_URL, Constants.UPLOAD_URL,buffer);
    }
}
