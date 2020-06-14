import { Component, NgZone, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Route, CanActivate } from '@angular/router';
import { dummyRoute } from './app-routing.module';

import { MatDialog, MatSidenav } from '@angular/material';

import { SignInComponent } from './common/sign-in/sign-in.component';
import { DialogService } from './common/dialog';
import { RouteHelperService, JwtSessionManager, Context } from '@remult/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 720px)`);
  constructor(zone: NgZone,
    public sessionManager: JwtSessionManager,
    public activeRoute: ActivatedRoute,
    public router: Router,
    private injector: Injector,
    private context: Context,

    private dialog: MatDialog,
    private dialogService: DialogService,
    private routeHelper: RouteHelperService) {
    this.mediaMatcher.addListener(mql => zone.run(() => /*this.mediaMatcher = mql*/"".toString()));
    sessionManager.loadSessionFromCookie();
  }
  signInText() {
    if (this.context.user)
      return this.context.user.name;
    return 'Sign in';
  }
  signIn() {
    if (!this.context.user) {
      this.dialog.open(SignInComponent);
    } else {
      this.dialogService.YesNoQuestion("Would you like to sign out?", () => { this.sessionManager.signout(); });
    }
  }
  //@ts-ignore
  @ViewChild("sideNav") sideNav: MatSidenav;

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
  shouldDisplayRoute(route: Route) {
    if (!(route.path && route.path.indexOf(':') < 0 && route.path.indexOf('**') < 0))
      return false;
    return this.routeHelper.canNavigateToRoute(route);
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

