import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Helper } from './helper';
import { Constants } from './constants';
import { AuthServiceProvider } from './AuthServiceProvider';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    currentUser: any;
    authData: any;

    constructor(private _authService: AuthServiceProvider, private _helper: Helper) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor Invoked");

        request = request.clone({
            withCredentials: true,
            headers: request.headers.set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache')
                .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
                .set('If-Modified-Since', '0')
        });

        if (!request.url.endsWith(Constants.GET_TOKEN_URL)) {
            this.currentUser = this._helper.getCurrentUser();
            console.log('current user' + this.currentUser);

            if (this.currentUser == null || (this.currentUser && this._helper.hasTokenExpired())) {
                console.log("Token Service Invoked: " + request.url);

                this._authService.getAuthData(request).then(() => {
                    this.currentUser = this._helper.getCurrentUser();
                    this.NextHandle(request);
                    console.log('Next Handle, Request url:' + request.url);
                    return next.handle(request); //handle next request
                });
            }
            else {
                console.log("Token Local Storage : " + request.url);
                request = this.NextHandle(request);
                return next.handle(request); //handle next request
            }
        }
        else {
            if (this.currentUser == null || (this.currentUser && this._helper.hasTokenExpired())) {
                return next.handle(request); //handle next request
            }
        }
    }

    private NextHandle(request: HttpRequest<any>) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.currentUser.token}`
            }
        });
        return request;
    }
}
