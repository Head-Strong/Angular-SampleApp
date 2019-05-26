import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { Helper } from '../helper/helper';
import { MenuService } from '../services/menu.service';
import { Constants } from '../helper/constants';


@Injectable()
export class AccessRouteActivator implements CanActivate {
    constructor(private helper: Helper, private router: Router, private _menuService: MenuService) {

    }

    async canActivate(route: ActivatedRouteSnapshot) {
        var tokenExists = this.helper.checkTokenExists();
        var menuItems = this._menuService.items;
        var routeExists = false;

        if (!tokenExists) {
            this.router.navigate(['/accessdenied']);
        }

        if (menuItems == undefined || menuItems == null) {
            menuItems = await this._menuService.getMenuItems();
            this._menuService.items = menuItems;
        }

        if (menuItems) {
            var result = menuItems.find(x => x.route == route.routeConfig.path);
            menuItems.forEach(mi => {
                if (mi.subMenus != null && mi.subMenus.length > 0) {
                    mi.subMenus.forEach(sm => {
                        if (sm.route == route.routeConfig.path) {
                            routeExists = true;
                            return routeExists;
                        }
                    });
                }
            });


            if (result) {
                routeExists = true;
            }
        }

        if (route.routeConfig.path == Constants.AppConfigMenu || route.routeConfig.path == Constants.AppSettingsMenu) {
            // Only PCG System Group User can access appConfig and appSettings page.
            var isPCGSystems = this.helper.isPCGSystems();
            var moduleExist = this.helper.checkModuleExists(route.routeConfig.path);
            if (isPCGSystems && moduleExist) {
                routeExists = true;
            }
        }

        // No check for profile menu
        if (!routeExists && route.routeConfig.path != "" && route.routeConfig.path != Constants.ProfileMenu) {
            this.router.navigate(['/accessdenied']);
        }

        return tokenExists;
    }

}
