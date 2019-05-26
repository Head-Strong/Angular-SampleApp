import { JwtHelperService } from '@auth0/angular-jwt';
import * as FileSaver from 'file-saver';
import { Constants } from './constants';
import { Injectable } from '@angular/core';

const helper = new JwtHelperService();
@Injectable()
export class Helper {
    decodedToken: any;
    authToken: any;
    currentUserKey: string = Constants.CurrentUserKey;

    constructor() {
        console.log('constructor')
    }

    public clearToken() {
        window.localStorage.removeItem(this.currentUserKey);
    }

    public checkTokenExists(): boolean {
        this._initialize();
        var result = false;
        if (this.authToken) {
            result = true;
        }
        return result;
    }

    public getCurrentUser(): string {
        try {
            return JSON.parse(window.localStorage.getItem(this.currentUserKey.toString()));
        }
        catch (error) {
            console.log('ERROR:: getCurrentUser');            
        }
    }

    public hasTokenExpired(): boolean {
        this._initialize();
        let isExpired: boolean = true;
        try {
            isExpired = helper.isTokenExpired(this.authToken);
        } catch (error) {
            isExpired = true;
            console.log('ERROR!! hasTokenExpired')
        }
        return isExpired;
    }

    public getUserName(): string {
        try {
            this._initialize();
            if (this.decodedToken) return this.decodedToken.UserName;
            else return this.decodedToken = helper.decodeToken(this.authToken);
        }
        catch (error) {
            console.log('ERROR!! getUserName')
        }
    }

    public isAdminUser(): boolean {
        return this.checkGroup(Constants.AdminUser);
    }

    public isCreateUser(): boolean {
        return this.checkGroup(Constants.CreateUser);
    }

    public isSystemUser(): boolean {
        return this.checkGroup(Constants.Systems);
    }

    public isPCGSystems(): boolean {
        return this.checkGroup(Constants.PCGSystems);
    }

    public checkModuleExists(moduleName: string): boolean {
        var userModules: string[] = this.getUserModules();
        var moduleExists = userModules.find(x => x.toLowerCase().indexOf(moduleName) > -1);
        return moduleExists ? true : false;
    }

    public static saveToFileSystem(buffer: any, fileName) {
        const filename = fileName;
        const blob = new Blob([buffer]);
        FileSaver.saveAs(blob, filename);
    }

    public getApplicationTitle(pageName : string) : string{
        return pageName + ' - ' + Constants.ApplicationName;
    }

    private _initialize() {
        this.authToken = window.localStorage.getItem(this.currentUserKey);
        if (this.authToken) {
            this.decodedToken = helper.decodeToken(this.authToken)
        }
    }

    private checkGroup(groupName: string): boolean {
        var userGroups = this.getUserGroups();
        var result = false;
        try {
            userGroups.some(element => {                
                result = element.includes(groupName);
                if (result) {
                    return true;
                }
            });
        }
        catch (error) {
            console.log('ERROR!! checkGroup' + groupName);
        }

        return result;
    }

    private getUserGroups(): string[] {
        this._initialize();
        var userGroups: string[];
        userGroups = this.decodedToken.UserGroups;
        return userGroups;
    }

    private getUserModules(): string[] {
        this._initialize();        
        var modulesByApplication: string[] = [];
        try {
            var userModulesByApplication = this.decodedToken.UserModules;
            if (userModulesByApplication != null && userModulesByApplication.length > 0) {
                for (var i = 0; i < userModulesByApplication.length; i++) {
                    var modules = userModulesByApplication[i].split(",");
                    if (modules != null && modules.length > 0) {
                        for (var mod = 0; mod < modules.length; mod++) {
                            var formattedModuleName = "";
                            if (mod == 0) {
                                var colonPosition = modules[mod].toString().indexOf(':');
                                var length = modules[mod].length;
                                formattedModuleName = modules[mod].substring(colonPosition + 1, length).trim();
                            }
                            else {
                                formattedModuleName = modules[mod].toString().trim();
                            }

                            modulesByApplication.push(formattedModuleName);
                        }
                    }
                }
            }
        }
        catch (error) {
            console.log('ERROR!! getUserModules')            
        }
        return modulesByApplication;
    }
}
