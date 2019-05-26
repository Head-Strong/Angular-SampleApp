import { Injectable } from "@angular/core";
import { AppService } from "../../app.service";
import { HttpRequest } from '@angular/common/http';
import { Helper } from "./helper";
import { Constants } from "./constants";
import { MenuService } from "../services/menu.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthServiceProvider {
    currentUser: any;

    constructor(private _appService: AppService,
        private _helper: Helper,
        private _menuService: MenuService) {
    }

    async getAuthData(request: HttpRequest<any>) {
        console.log('Request object' + request);
        
        await this._appService.getAuthToken().then(data => {
            console.log('Fetch Expired Token');
            if (data.StatusCode == 200) {
                console.log(data.Result.token);
                window.localStorage.setItem(Constants.CurrentUserKey, JSON.stringify({ token: data.Result.token }));
                this.currentUser = this._helper.getCurrentUser();              
                return request;
            }
            else {
                this.accessDenied();
            }
        }).catch(error => {
            console.log(error);
            this.accessDenied();
        });
    }

    async bootStrapApp() : Promise<any>  {
        console.log('bootstrap in');
        await this._appService.getAuthToken().then(data => {
            console.log('bootstrap in->authtoken');
            console.log()
            if (data.StatusCode == 200) {
                window.localStorage.setItem(Constants.CurrentUserKey, JSON.stringify({ token: data.Result.token }));
                this.currentUser = this._helper.getCurrentUser();       
                console.log('auth-token'+this.currentUser);         
                return this.currentUser;
            }
            else {
                this.accessDenied();
            }
        }).catch(error => {
            console.log(error);
            this.accessDenied();
        });
    }

    async getMenuItems() {
        try {
            await this._menuService.getMenuItems().then(data => {
                this._menuService.items = data;
            }).catch(error => {
                console.log(error);
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    accessDenied() {
        this._helper.clearToken();
    }
}
