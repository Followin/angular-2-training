import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export default class DurationPipe implements PipeTransform {
  public transform(minutes: number): string {
    if (minutes) {
      return `${this.getHoursString(minutes)} ${this.getMinutesString(minutes)}`;
    }

    return 'no duration specified';
  }

  private getHoursString(minutes: number): string {
    const hours = minutes / 60 >> 0;

    if (hours == 0) {
      return '';
    } else {
      return `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    }
  }

  private getMinutesString(minutes: number): string {
    const minutesLeft = minutes % 60;

    if (minutesLeft == 0) {
      return '';
    } else {
      return `${minutesLeft} ${minutesLeft > 1 ? 'minutes' : 'minute'}`;
    }
  }
}