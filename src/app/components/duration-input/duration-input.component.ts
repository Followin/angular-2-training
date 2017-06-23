import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ControlValueAccessor, AbstractControl } from '@angular/forms';

@Component({
  selector: 'duration-input',
  templateUrl: './duration-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
  ],
})
export default class DurationInputComponent implements ControlValueAccessor, Validator {
  @Input() private className: string;
  @Input() private id: string;

  private value: number = 0;
  private propagateChange: any;

  public writeValue(duration: number) {
    if (duration) {
      this.value = duration;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any) {

  }

  public validate(c: AbstractControl): { [key: string]: any } {
    if (!Number.isNumber(c.value) || c.value < 1) {
      return {
        format: {
          value: c.value,
          minValue: 1,
        },
      };
    }

    return null;
  }

  private change(event: any) {
    this.propagateChange(event.target.value);
  }
}