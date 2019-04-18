import { Component,  NgZone, Injector } from '@angular/core';
import { Router, ActivatedRoute, Route, CanActivate } from '@angular/router';
import { dummyRoute } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  isCollapsed = true;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 720px)`);
  constructor(zone: NgZone,
    public activeRoute: ActivatedRoute,
    public router: Router,
    private injector: Injector) {
      this.mediaMatcher.addListener(mql => zone.run(() => /*this.mediaMatcher = mql*/"".toString() ));
  }
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
}

