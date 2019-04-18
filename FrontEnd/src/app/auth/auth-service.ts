import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { shared } from '../../environments/shared';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { dummyRoute, myRoute, myRouteData } from '../app-routing.module';


const authToken = 'auth-token';
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

        this.setToken(localStorage.getItem(authToken));
        shared.headerInteceptor.addRequestHeader = (add: (name: string, value: string) => void) => {
            if (this.currentToken)
                add("Authorization", 'Bearer ' + this.currentToken);
        }
    }
    getToken() {
        return this.currentToken;
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
    logout() {
        this.setToken('');
        localStorage.removeItem(authToken);
        this.user = undefined;
    }
    async login(username: string, password: string, rememberMeOnThisMachine?: boolean) {
        let loginResult = await this.http.post<any>('/home/login', { username, password }).toPromise();
        if (loginResult && loginResult.token) {
            this.setToken(loginResult.token);
            if (rememberMeOnThisMachine)
                localStorage.setItem(authToken, loginResult.token);
            return true;
        }
        return false;
    }

}
@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url);
        let token = this.authService.getToken();
        if (token) {
            req = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        }
        return next.handle(req);
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