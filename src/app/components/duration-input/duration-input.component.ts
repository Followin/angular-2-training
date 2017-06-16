import {Component, Input} from '@angular/core';

@Component({
  selector: 'duration-input',
  templateUrl: './duration-input.component.html',
})
export default class DurationInputComponent {
  @Input() private className: string;
  @Input() private id: string;
}