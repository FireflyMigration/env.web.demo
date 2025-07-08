import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value?: string, format: string = 'mediumDate'): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Use Angular's built-in date pipe for formatting
    const options: Intl.DateTimeFormatOptions = {};

    switch (format) {
      case 'short':
        options.year = 'numeric';
        options.month = 'numeric';
        options.day = 'numeric';
        break;
      case 'medium':
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        break;
      case 'long':
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        options.weekday = 'long';
        break;
      default:
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
