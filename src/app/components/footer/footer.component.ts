import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FooterComponent {
}
