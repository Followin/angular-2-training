import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent { }