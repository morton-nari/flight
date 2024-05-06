import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!isNaN(value) && value >= 0) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hours.toString().padStart(2, '0')}H:${minutes.toString().padStart(2, '0')}M`;
    }
    return 'Invalid Input';
  }
}
