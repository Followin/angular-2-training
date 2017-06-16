import {Component, Input} from '@angular/core';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
})
export default class DateInputComponent {
  @Input() private id: String;
  @Input() private className: String;
}