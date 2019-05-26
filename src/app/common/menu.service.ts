import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Constants } from '../../common/helper/constants';

export interface MenuItem{
    id: number,
    menuText:string,
    sequence: number,
    parentId: number,
    route: string,
    subMenus:Array<MenuItem>
}

export class MenuItemClass implements MenuItem{
    constructor(public id: number,
        public menuText:string,
        public sequence: number,
        public parentId: number,
        public route: string,
        public subMenus:Array<MenuItemClass>){
        }
}

@Injectable()
export class MenuService implements OnInit{
    constructor(private _apiService: ApiService){
        
    }
    
    ngOnInit() {
    }

    items: Array<MenuItem>;
    menuItems: Array<MenuItem>;
    menus: any;
      
    async getMenuItems(): Promise<MenuItemClass[]> {
        return await this._apiService.getAwait(Constants.SECURITY_ADMIN_BASE_URL, Constants.GET_MENU_ITEMS_URL)
                .then(res =>{
                    return res.Result.map(item => {
                        return new MenuItemClass(
                            item.id,
                            item.menuText,
                            item.sequence,
                            item.parentId,
                            item.route ? item.route.toLowerCase(): item.route,
                            item.subMenus
                        );
                    });
                });
    }
}
