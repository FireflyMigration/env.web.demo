import { Component, NgZone, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Route, CanActivate } from '@angular/router';
import { dummyRoute } from './app-routing.module';

import { MatDialog, MatSidenav } from '@angular/material';
import { AuthService } from './common/auth/auth-service';
import { SignInComponent } from './common/sign-in/sign-in.component';
import { DialogService } from './common/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 720px)`);
  constructor(zone: NgZone,
    public activeRoute: ActivatedRoute,
    public router: Router,
    private injector: Injector,
    private authService: AuthService,
    private dialog: MatDialog,
    private dialogService:DialogService) {
    this.mediaMatcher.addListener(mql => zone.run(() => /*this.mediaMatcher = mql*/"".toString()));
  }
  signInText() {
    if (this.authService.user)
      return this.authService.user.name;
    return 'Sign in';
  }
  signIn() {
    if (!this.authService.user) {
        this.dialog.open(SignInComponent);
    }else{
      this.dialogService.YesNoQuestion("Would you like to sign out?",()=>{this.authService.signout()});
    }
  }
  @ViewChild("sideNav") sideNav:MatSidenav;

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
  shouldDisplayRoute(route: Route) {
    if (!(route.path && route.path.indexOf(':') < 0 && route.path.indexOf('**') < 0))
      return false;
    if (!route.canActivate)
      return true;
    for (let guard of route.canActivate) {
      let g = this.injector.get(guard) as CanActivate;
      if (g && g.canActivate) {
        var r = new dummyRoute();
        r.routeConfig = route;
        let canActivate = g.canActivate(r, undefined);
        if (!canActivate)
          return false;
      }
    }
    return true;
  }
  currentTitle() {
    if (this.activeRoute && this.activeRoute.snapshot && this.activeRoute.firstChild && this.activeRoute.firstChild.routeConfig)
      return this.activeRoute.snapshot.firstChild.routeConfig.path;
    return 'Northwind';
  }
  //@ts-ignore ignoring this to match angular 7 and 8
  @ViewChild('sidenav') sidenav: MatSidenav;
  routeClicked() {
    if (this.isScreenSmall())
      this.sidenav.close();
  }
}

