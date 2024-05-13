import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { remult } from 'remult';

const AUTH_TOKEN_KEY = "authToken";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {
        let token = AuthService.fromStorage();
        if (token) {
            this.setAuthToken(token);
        }
    }
    setAuthToken(token: string) {
        remult.user = (new JwtHelperService().decodeToken(token));
        sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    static fromStorage(): string {
        return sessionStorage.getItem(AUTH_TOKEN_KEY)!;
    }

    signOut() {
        remult.user = (undefined!);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
}
