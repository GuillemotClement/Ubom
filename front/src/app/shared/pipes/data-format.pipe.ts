import { Pipe, PipeTransform } from '@angular/core';
import {
  getFormatedPeriode,
  getFullDateFr,
  getShortDateFr,
} from '../../_older/services/helpers/date.helper';

@Pipe({
  name: 'fullDateFr',
  standalone: true,
})
export class FullDateFrPipe implements PipeTransform {
  transform(date: string): string {
    return getFullDateFr(date);
  }
}

@Pipe({
  name: 'shortDateFr',
  standalone: true,
})
export class ShortDateFrPipe implements PipeTransform {
  transform(date: string): string {
    return getShortDateFr(date);
  }
}

@Pipe({
  name: 'periodeFr',
  standalone: true,
})
export class PeriodeFrPipe implements PipeTransform {
  transform(startPeriode: string, endPeriode: string): string {
    return getFormatedPeriode(startPeriode, endPeriode);
  }
}
