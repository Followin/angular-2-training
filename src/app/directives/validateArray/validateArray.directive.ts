import { Directive, forwardRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import ValidateArrayOptions from './validateArrayOptions';
import arrayValidator from '../../validators/array.validator';

@Directive({
  selector: '[validateArray]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateArrayDirective),
      multi: true,
    },
  ],
})
export default class ValidateArrayDirective implements Validator, OnInit, OnChanges {
  @Input('validateArray') public options: ValidateArrayOptions;

  private validatorFn: any;

  public ngOnInit() {
    this.validatorFn = arrayValidator(this.options.minLength, this.options.maxLength);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.validatorFn = arrayValidator(this.options.minLength, this.options.maxLength);
    }
  }

  public validate(c: AbstractControl): { [key: string]: any } {
    return this.validatorFn(c);
  }
}