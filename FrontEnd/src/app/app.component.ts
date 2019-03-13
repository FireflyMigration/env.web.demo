import { Component, transition, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    public router: Router) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }
  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
  currentTitle() {
    if (this.activeRoute && this.activeRoute.snapshot && this.activeRoute.firstChild && this.activeRoute.firstChild.routeConfig)
      return this.activeRoute.snapshot.firstChild.routeConfig.path;
    return 'Northwind';
  }
}

