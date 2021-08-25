import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Remult, UserInfo } from "remult";

@Injectable()
export class UserService {

    constructor(private remult: Remult) {

    }
    populate() {
        this.setToken(UserService.getToken());
    }
    setToken(token: string) {
        if (token) {
            this.remult.setUser(<UserInfo>new JwtHelperService().decodeToken(token));
            localStorage.setItem("jwtToken", token);
        }
        else {
            this.remult.setUser(undefined);
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