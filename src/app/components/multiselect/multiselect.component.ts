import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import SelectItem from '../../models/selectItem';

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export default class MultiSelectComponent implements ControlValueAccessor {
  @Input() public items: SelectItem[];

  private propagateChange: any;

  public writeValue(_: any) {
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any) {

  }

  private change() {
    const selectedValues = this.items
      .filter(item => item.selected)
      .map(item => item.value);

    if (this.propagateChange) {
      this.propagateChange(selectedValues);
    }
  }
}