import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export default class DateInputComponent implements ControlValueAccessor {
  @Input() public id: string;
  @Input() public className: string;
  @Input() public format: string = 'DD/MM/YYYY';

  private dateValue = new Date();
  private strValue: string;
  private validator: any;
  private propagateChange: any;

  public ngOnInit() {
    this.validator = createDateValidator(this.format);
    this.strValue = moment(this.dateValue).format(this.format);
  }

  public writeValue(date: Date): void {
    if (date) {
      this.dateValue = date;
      this.strValue = moment(date).format(this.format);
    }
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
    this.propagateChange(this.dateValue);
  }

  public registerOnTouched(fn: any): void {
  }

  public change(event: any) {
    this.dateValue = parseDate(event.target.value, this.format).toDate();

    if (this.propagateChange) {
      this.propagateChange(this.dateValue);
    }
  }

  public validate(c: FormControl) {
    if (!isNaN(c.value.getTime()) && this.dateValue === c.value) {
      return null;
    }

    return this.validator(c);
  }
}

function createDateValidator(format: string) {
  return (c: FormControl) => {
    if (!parseDate(c.value, format).isValid()) {
      return {
        date: {
          given: c.value,
        },
      };
    }

    return null;
  };
}

function parseDate(str: string, format: string) {
  return moment.parseZone(str, format, true);
}