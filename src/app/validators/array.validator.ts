import { FormControl } from '@angular/forms';

export default function (minLength: number, maxLength?: number, allowNull: boolean = false)
  : (c: FormControl) => { [key: string]: any } {
  return (c: FormControl) => {
    if (!allowNull && !c.value) {
      return {
        required: {
          value: null,
        },
      };
    }

    if (c.value.length < minLength || maxLength != undefined && c.value.length > maxLength) {
      return {
        length: { currentLength: c.value.length },
      };
    }

    return null;
  };
}