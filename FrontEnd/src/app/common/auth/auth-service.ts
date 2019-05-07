import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { dummyRoute, myRouteData } from '../../app-routing.module';


const authToken = 'authorization';
@Injectable({ providedIn: 'root' })
export class AuthService {
    hasRole(allowedRoles?: string[]) {
        if (!this.user)
            return false;
        if (!allowedRoles)
            return true;
        if (!this.user.roles)
            return false;
        for (const role of allowedRoles) {
            if (this.user.roles.indexOf(role) >= 0)
                return true;
        }
        return false;
    }
    private currentToken: string;
    user: UserInfo;
    constructor(private http: HttpClient) {
        let c = document.cookie;
        let i = c.indexOf(authToken + '=');
        if (i >= 0) {
            c = c.substring(i + authToken.length + 2).trim();
            i = c.indexOf(';');
            if (i >= 0) {
                c = c.substring(0, i - 1);
            }
            this.setToken(c);

        }
    }


    private setToken(token: string) {
        this.currentToken = token;
        this.user = undefined;
        if (this.currentToken) {
            {
                try { this.user = new JwtHelperService().decodeToken(token); }
                catch (err) { console.log(err); }

            }

        }
    }
    signout() {
        this.setToken('');
        document.cookie = authToken + '=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        this.user = undefined;
    }
    async signIn(username: string, password: string) {
        let loginResult = await this.http.post<any>('/home/login', { username, password }).toPromise();
        if (loginResult && loginResult.token) {
            this.setToken(loginResult.token);
            localStorage.setItem(authToken, loginResult.token);
            document.cookie = authToken + "=" + loginResult.token;
            return true;
        }
        return false;
    }

}

@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        let allowedRoles: string[];

        let data = route.routeConfig.data as myRouteData;
        if (data && data.allowedRoles)
            allowedRoles = data.allowedRoles;



        if (this.auth.hasRole(allowedRoles)) {
            return true;
        }
        if (!(route instanceof dummyRoute))
            this.router.navigate(['/']);
        return false;
    }
}



export interface UserInfo {
    name: String;
    roles: string[];
}