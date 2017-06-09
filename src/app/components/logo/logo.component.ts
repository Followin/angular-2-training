import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LogoComponent { }
