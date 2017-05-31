import { Component, OnInit } from '@angular/core';
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
      .filter(route => url.indexOf(route.path) > -1)
      .sort((route1, route2) => route1.path.length - route2.path.length);

    const lastEntry = entries.pop();
    const result = entries.map(entry => ({url: entry.path, label: entry.data.label, active: false}));
    result.push({url: null, label: lastEntry.data.label, active: true});

    return result;
  }
}