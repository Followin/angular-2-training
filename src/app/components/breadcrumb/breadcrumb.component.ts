import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, Route } from '@angular/router';
import { groupBy } from '../../utils/array';

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
      private ref: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.breadcrumbs = this.getBreadcrumbs((<NavigationEnd> event).url);

      this.ref.markForCheck();
    });
  }

  private getBreadcrumbs(url: string) {
    let entries = this.router.config
      .filter(route => this.isRoutePartOfUrl(url, route.path));

    entries = this.filterAmbiguousRoutes(url, entries)
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

  private filterAmbiguousRoutes(url: string, routes: Route[]): Route[] {
    let routesBySegmentNumber = groupBy(routes, (route: Route) => {
      if (route.path.length === 0) {
        return 0;
      }

      return route.path.split('/').length;
    });

    for (let routesGroup of routesBySegmentNumber) {
      if (routesGroup.items.length === 1) {
        continue;
      }

      let segmentsList = routesGroup.items.map(route => route.path.split('/'));

      for (let i = 0; i < segmentsList[0].length; i++) {
        const exactMatches = segmentsList.filter(segments => !segments[i].startsWith(':'));

        if (exactMatches.length === 1) {
          const exactMatchIndex = segmentsList.indexOf(exactMatches[0]);

          routesGroup.items = [ routesGroup.items[exactMatchIndex] ];
        }
      }
    }

    return routesBySegmentNumber.map(routesGroup => routesGroup.items[0]);
  }
}
