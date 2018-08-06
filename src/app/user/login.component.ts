import { Component } from '@angular/core'
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em {float:right; color: #E05C65; padding-left: 10px; font-weight:bold;}
    `]
})
export class LoginComponent {

    mouseEnter: boolean;

    constructor(private authService: AuthService, private router: Router) {

    }

    login(formValues) {
        this.authService.loginUser(formValues.userName, formValues.password);
        this.router.navigate(['events']);
        console.log(formValues);
    }

    cancel() {
        this.router.navigate(['events']);
    }

    setMouseEnter() {
        this.mouseEnter = true;
    }

    setMouseLeave() {
        this.mouseEnter = false;
    }    
}
