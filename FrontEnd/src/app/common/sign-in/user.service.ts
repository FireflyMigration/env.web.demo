import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Context, UserInfo } from "@remult/core";

@Injectable()
export class UserService {

    constructor(private context: Context) {

    }
    populate() {
        this.setToken(UserService.getToken());
    }
    setToken(token: string) {
        if (token) {
            this.context.setUser(<UserInfo>new JwtHelperService().decodeToken(token));
            localStorage.setItem("jwtToken", token);
        }
        else {
            this.context.setUser(undefined);
            localStorage.removeItem("jwtToken");
            token='';
        }

        document.cookie = "Authorization=" + token;
    }
    purgeAuth() {
        this.setToken(undefined);
    }
    static getToken() {
        return localStorage.getItem("jwtToken");
    }

}