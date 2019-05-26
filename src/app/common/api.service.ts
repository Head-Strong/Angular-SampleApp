import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';

export class httpError {
    httpStatusCode: number;
    httpError: string;
  
    constructor(httpStatusCode?: number, httpError?: string) {
      this.httpStatusCode = httpStatusCode;
      this.httpError = httpError;
    }
  }
  

@Injectable()
export class ApiService {
    
    constructor( private httpClient: HttpClient) {}

    private formatErrors(error: any) {
        //let errMsg = `${error.status} - ${error.statusText || ''} ${error.message}`;
        return Observable.throw(error);
    }

    async getAwait(baseUrl:string, path: string): Promise<any> {
        let data =  await this.httpClient.get<any>(`${baseUrl}${path}`).toPromise()
           .catch(this.formatErrors);
        return data;
    }

    get(baseUrl:string, path: string): Observable<any> {
        return this.httpClient.get<any>(`${baseUrl}${path}`)
           .catch(this.formatErrors);
    }

    put(baseUrl:string,path: string, body: any): Observable<any> {
        return this.httpClient.put(`${baseUrl}${path}`, body)
            .catch(this.formatErrors);
    }

    post(baseUrl:string,path: string, body: any): Observable<any> {
        return this.httpClient.post(`${baseUrl}${path}`, body)
            .catch(this.formatErrors);        
    }

    delete(baseUrl:string,path): Observable<any> {
        return this.httpClient.delete(`${baseUrl}${path}`)
            .catch(this.formatErrors);
    }

    deleteByObject(baseUrl:string, path : string, body:any): Observable<any> {
        return this.httpClient.request('delete',`${baseUrl}${path}`, { body: body })
            .catch(this.formatErrors);
    }

    downloadFile(baseUrl:string,path: string) {
        return this.httpClient.get( `${baseUrl}${path}`, {responseType: 'blob'})
        .catch(this.formatErrors);
    }
}
