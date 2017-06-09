import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface Breadcrumb {
  url?: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BreadcrumbComponent implements OnInit {
  private breadcrumbs: Breadcrumb[];

  constructor(
      private router: Router,
  ) { }

  public ngOnInit(): void {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.breadcrumbs = this.getBreadcrumbs((<NavigationEnd> event).url);
    });
  }

  private getBreadcrumbs(url: string) {
    const entries = this.router.config
      .filter(route => this.isRoutePartOfUrl(url, route.path))
      .sort((route1, route2) => route1.path.length - route2.path.length);

    const lastEntry = entries.pop();
    const result = entries.map(entry => ({url: entry.path, label: entry.data.label, active: false}));
    result.push({url: null, label: lastEntry.data.label, active: true});

    return result;
  }

  private isRoutePartOfUrl(url: string, route: string) {
    if (route === '') {
      return true;
    }

    const entryIndex = url.indexOf(route);
    const urlSegments = url.split('/').slice(1);
    const routeSegments = route.split('/');

    let i;
    for (i = 0; i < routeSegments.length && i < urlSegments.length; i++) {
      if (routeSegments[i].startsWith(':')) {
        continue;
      }

      if (routeSegments[i] === urlSegments[i]) {
        continue;
      } else {
        return false;
      }
    }

    if (i < routeSegments.length) {
      return false;
    } else {
      return true;
    }
  }
}
