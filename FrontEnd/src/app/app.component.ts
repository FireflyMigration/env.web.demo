import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';


import { Remult } from 'remult';


import { SignInComponent } from './common/sign-in/sign-in.component';

import { DialogService } from './common/dialog';
import { RouteHelperService } from '@remult/angular';
import { AuthService } from './common/sign-in/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    public auth: AuthService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private routeHelper: RouteHelperService,
    public dialogService: DialogService,
    public remult: Remult) {


  }
  ngOnInit(): void {
    
  }
  signInText() {
    if (this.remult.authenticated())
      return this.remult.user.name;
    return 'Sign in';
  }
  async signIn() {
    if (!this.remult.authenticated()) {
      this.dialog.open(SignInComponent);
    } else {
      if (await this.dialogService.yesNoQuestion("Would you like to sign out?"))
        this.auth.signOut();
    }
  }

  routeName(route: Route) {
    let name = route.path;
    if (route.data && route.data['name'])
      name = route.data['name'];
    return name;
  }

  currentTitle() {
    if (this.activeRoute!.snapshot && this.activeRoute!.firstChild)
      if (this.activeRoute.snapshot.firstChild!.data!['name']) {
        return this.activeRoute.snapshot.firstChild!.data['name'];
      }
      else {
        if (this.activeRoute.firstChild.routeConfig)
          return this.activeRoute.firstChild.routeConfig.path;
      }
    return 'Northwind App';
  }


  signOut() {

    this.routeClicked();
    this.auth.signOut();
  }
  shouldDisplayRoute(route: Route) {
    if (!(route.path && route.path.indexOf(':') < 0 && route.path.indexOf('**') < 0))
      return false;
    return this.routeHelper.canNavigateToRoute(route);
  }
  //@ts-ignore ignoring this to match angular 7 and 8
  @ViewChild('sidenav') sidenav: MatSidenav;
  routeClicked() {
    if (this.dialogService.isScreenSmall())
      this.sidenav.close();

  }
  test() {

  }

}
