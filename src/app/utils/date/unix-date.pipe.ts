import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixDate',
  standalone: true,
})
export class UnixDatePipe implements PipeTransform {
  transform(unixTime: number): string {
    const date = new Date(unixTime);

    return date.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
